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
import { ConfigItem } from "@/store/types";

export const InitUser = ({ children }: PropsWithChildren) => {
  const initData = useInitData();
  const viewport = useViewport();
  const hasExecutedRef = useRef(false);
  const init = useCommonStore((state) => state.init);
  const buyMine = useCommonStore((state) => state.buyMine);

  const setConfig = useCommonStore((state) => state.setConig);
  const { i18n } = useTranslation();

  const [initUserCallback, loading] = useHttpsCallable<
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
      const result = await initUserCallback();

      if (!result || !result.data || !result.data.config) {
        return;
      }
      const config = result.data.config as unknown as ConfigItem[];

      setConfig(config);

      if (result.data.status === "created") {
        init(0, 0, {});
        buyMine(config[0].resource.id);
        return;
      }

      try {
        const gameStats = JSON.parse(result.data.gameStats);

        const { mines, coin, mCoin } = gameStats;

        if (!mines || !coin) throw new Error("Invalid gameStats");

        init(coin, mCoin, mines);
      } catch (e) {
        console.error("error", e);
      }
    }
    execute();
  }, [initData, viewport, initUserCallback]);

  useEffect(() => {
    if (initData && initData.user?.languageCode) {
      i18n.changeLanguage(initData.user.languageCode);
    }
  }, [initData, i18n]);

  return loading ? null : children;
};
