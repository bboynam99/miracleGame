import { Button } from "@headlessui/react";
import burger from "@/assets/icons/burger.svg";
import chip from "@/assets/icons/chip.svg";
import soft from "@/assets/icons/soft.svg";
import hard from "@/assets/icons/hard.svg";
import plus from "@/assets/icons/plus.svg";
import { userStore } from "@/store/store";
import { abbreviateNumber } from "@/pages/utils";

export const Header = () => {
  const coin = userStore((state) => state.coin);
  const mCoin = userStore((state) => state.mCoin);

  return (
    <div className="flex w-full py-3 px-6 gap-1 justify-between items-center bg-grayBGM">
      <img src={burger} className="w-7 h-7" />

      <div className="flex items-center">
        <img src={chip} className="w-5 h-5" />

        <div className="flex flex-col px-1 text-darkGrayM -ml-px bg-grayBGM">
          <span className="text-4xs">Industry:</span>
          <span className="text-3xs">Electronics</span>
        </div>
      </div>

      <div className="flex flex-grow items-center text-whiteM bg-darkM py-2.5 px-1">
        <img className="h-4 w-4" src={soft} />
        <span className="text-xs font-bold flex-grow text-center">
          {abbreviateNumber(coin)}
        </span>
      </div>

      <div className="flex flex-grow items-center bg-darkM py-2.5 px-1 gap-1">
        <img className="w-5 h-4" src={hard} />
        <span className="flex-grow text-primaryM text-xs font-bold text-center">
          {abbreviateNumber(mCoin)}
        </span>

        <Button className="w-4 h-4">
          <img src={plus} />
        </Button>
      </div>
    </div>
  );
};
