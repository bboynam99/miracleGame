import { useEffect, useRef } from "react";
import { getFunctions } from "firebase/functions";
import useHttpsCallable from "@/store/useHttpsCallable";
import { app } from "@/store/firebase";
import { useCommonStore } from "@/store/store";

export const SaveGame = () => {
  const { mines, coin, mCoin } = useCommonStore((state) => ({
    mines: state.mines,
    coin: state.coin,
    mCoin: state.mCoin,
  }));

  const [executeCallable] = useHttpsCallable(getFunctions(app), "save");

  const latestGameStatsRef = useRef({ coin, mCoin, mines });

  useEffect(() => {
    latestGameStatsRef.current = { coin, mines, mCoin };
  }, [coin, mCoin, mines]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Saving game...", latestGameStatsRef.current);
      executeCallable({
        gameStats: JSON.stringify(latestGameStatsRef.current),
      });
    }, 30_000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
