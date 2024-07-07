import { app } from "@/store/firebase";
import { useInitData, useViewport } from "@tma.js/sdk-react";
import { getFunctions } from "firebase/functions";
import {
  type InitUserRequest,
  type InitUserResponse,
} from "functions/src/index";
import { PropsWithChildren, useEffect, useRef } from "react";
import useHttpsCallable from "@/store/useHttpsCallable";
import { useTranslation } from "react-i18next";
import { useCommonStore } from "@/store/store";
import config from "@/config.json";

export const InitUser = ({ children }: PropsWithChildren) => {
  const initData = useInitData();
  const viewport = useViewport();
  const hasExecutedRef = useRef(false);
  const init = useCommonStore((state) => state.init);

  const setConfig = useCommonStore((state) => state.setConig);
  const { i18n } = useTranslation();

  const [executeCallable, loading] = useHttpsCallable<
    InitUserRequest,
    InitUserResponse
  >(getFunctions(app), "initUser");

  useEffect(() => {
    if (viewport) {
      !viewport.isExpanded && viewport.expand();
    }
    if (initData === undefined || hasExecutedRef.current) {
      return;
    }

    async function execute() {
      hasExecutedRef.current = true;
      const result = await executeCallable();
      if (!result) {
        return;
      }
      setConfig(config);
      if (result.data.status === "created") {
        // init(0, 0, );
        // TODO Add first mine

        return;
      }

      try {
        const gameStats = JSON.parse(result.data.gameStats);

        const { mines, coin, mCoin } = gameStats;
        console.log(mines, coin, mCoin);

        if (!mines || !coin) throw new Error("Invalid gameStats");
        console.log(gameStats);

        init(coin, mCoin, mines);
      } catch (e) {
        console.log("error", e);
      }
    }
    execute();
  }, [initData, viewport, executeCallable]);

  useEffect(() => {
    if (initData && initData.user?.languageCode) {
      i18n.changeLanguage(initData.user.languageCode);
    }
  }, [initData, i18n]);

  return loading ? null : children;
};
