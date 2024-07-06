import { app } from "@/store/firebase";
import { useInitData, useViewport } from "@tma.js/sdk-react";
import { getFunctions } from "firebase/functions";
import {
  type InitUserRequest,
  type InitUserResponse,
} from "functions/src/index";
import { PropsWithChildren, useEffect, useRef } from "react";
import useHttpsCallable from "@/store/useHttpsCallable";
import { userStore } from "@/store/store";
import { useTranslation } from "react-i18next";

export const InitUser = ({ children }: PropsWithChildren) => {
  const initData = useInitData();
  const viewport = useViewport();
  const hasExecutedRef = useRef(false);
  const setInitStore = userStore((state) => state.setInitialMines);
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
      if (result.data.status === "created") {
        return;
      }
      try {
        const gameStats = JSON.parse(result.data.gameStats);

        const { mines, coin } = gameStats;

        if (!mines || !coin) throw new Error("Invalid gameStats");

        setInitStore(mines, coin);
      } catch (e) {
        console.log("error", e);
      }
    }
    execute();
  }, [initData, viewport, executeCallable, setInitStore]);

  useEffect(() => {
    if (initData && initData.user?.languageCode) {
      i18n.changeLanguage(initData.user.languageCode);
    }
  }, [initData, i18n]);

  return loading ? null : children;
};
