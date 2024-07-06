import { useParams } from "react-router-dom";
import {
  MineType,
  availableMines,
  isImpossibleSell,
  userStore,
} from "@/store/store";
import { Button } from "@headlessui/react";
import { MineHeader } from "./MineHeader";
import { MineUpgrade } from "./MineUpgrade";
import { MineInfo } from "./MineInfo";
import softIcon from "@/assets/icons/soft.svg";
import { abbreviateNumber, isMineType } from "../utils";
import { MineStore } from "./MineStore";
import lines from "@/assets/lines.svg";

const ProductionItem = () => {
  const { mine } = useParams();
  const mines = userStore((state) => state.mines);
  const mineId = isMineType(mine);

  if (mineId === null) {
    return <p className="text-white">Not Found</p>;
  }
  const mineInst = mines[mineId];
  const mineInstance = availableMines.find((m) => m.id === mineId);
  const isBought = mines[mineId] !== undefined;

  if (mineInstance === undefined) {
    return <p className="text-white">Not Found</p>;
  }

  return <BaseProduction mine={mineInst || mineInstance} isBought={isBought} />;
};

const BaseProduction = ({
  mine,
  isBought,
}: {
  mine: MineType;
  isBought: boolean;
}) => {
  return (
    <div className="flex flex-col h-full w-full text-gray-200 items-center">
      <MineHeader resourceName={mine.resource.name} />

      <MineUpgrade mine={mine} disabled={!isBought} />

      <MineStore mine={mine} />

      <MineInfo mine={mine} />

      {isBought ? <SellAll mine={mine} /> : <BuyMine mine={mine} />}
    </div>
  );
};

const BuyMine = ({ mine }: { mine: MineType }) => {
  const mines = userStore((state) => state.mines);
  const coin = userStore((state) => state.coin);
  const buyMine = userStore((state) => state.buyMine);
  const buyThisMyne = () => {
    buyMine(mine.id);
  };

  const disabled = !!mines[mine.id] || coin < mine.unlockPrice;

  return (
    <ActionButton
      disabled={disabled}
      onClick={buyThisMyne}
      label="Buy"
      price={abbreviateNumber(mine.unlockPrice)}
    />
  );
};

const SellAll = ({ mine }: { mine: MineType }) => {
  const sellStore = userStore((state) => state.sellStore);

  const sellAll = () => {
    sellStore(mine.id);
  };

  return (
    <ActionButton
      disabled={isImpossibleSell(mine.id)}
      onClick={sellAll}
      label="Sell"
      price={`+${abbreviateNumber(mine.store.count * mine.sellPrice)}`}
    />
  );
};

const ActionButton = ({
  disabled,
  onClick,
  label,
  price,
}: {
  disabled: boolean;
  onClick: () => void;
  label: string;
  price: string;
}) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    className="relative w-72 bg-grayM text-darkM disabled:bg-gray-600 disabled:text-gray-200 clip-down flex mt-4"
  >
    <img src={lines} className="absolute w-full h-full z-10" />

    <span className="text-3xl bg-white font-black clip-down text-darkM px-5 py-4">
      <span className="drop-shadow-m z-20">{label}</span>
    </span>
    <div className="flex items-center font-black text-white h-full w-full align-center justify-center gap-1 z-20">
      <span className="text-2xl">{price}</span>
      <img src={softIcon} className="w-6 h-6" />
    </div>
  </Button>
);

export default ProductionItem;
