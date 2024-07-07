import { useParams } from "react-router-dom";
import { useCommonStore } from "@/store/store";
import { ConfigItem } from "@/store/types";
import { Button } from "@headlessui/react";
import { MineHeader } from "./MineHeader";
import { MineUpgrade } from "./MineUpgrade";
import { MineInfo } from "./MineInfo";
import softIcon from "@/assets/icons/soft.svg";
import { abbreviateNumber } from "../utils";
import lines from "@/assets/lines.svg";
import { isImpossibleSell } from "@/store/gameSlice";
import { MineStore } from "./MineStore";

const ProductionItem = () => {
  const { mine } = useParams();
  const mines = useCommonStore((state) => state.mines);
  const availableMines = useCommonStore((state) => state.availableMines);
  // const mineId = isMineType(mine);

  if (!mine) {
    return <p className="text-white">Not Found</p>;
  }
  // const mineInst = mines[mineId];
  const mineInstance = availableMines.find((m) => m.resource.id === mine);
  const isBought = mines[mine] !== undefined;

  if (mineInstance === undefined) {
    return <p className="text-white">Not Found</p>;
  }

  return <BaseProduction resource={mineInstance} isBought={isBought} />;
};

const BaseProduction = ({
  resource,
  isBought,
}: {
  resource: ConfigItem;
  isBought: boolean;
}) => {
  return (
    <div className="flex flex-col h-full w-full text-gray-200 items-center">
      <MineHeader resourceName={resource.resource.name} />

      <MineUpgrade resource={resource} disabled={!isBought} />

      <MineStore resourceId={resource.resource.id} />

      <MineInfo resource={resource} />

      {isBought ? <SellAll resource={resource} /> : <BuyMine mine={resource} />}
    </div>
  );
};

const BuyMine = ({ mine }: { mine: ConfigItem }) => {
  const mines = useCommonStore((state) => state.mines);
  const coin = useCommonStore((state) => state.coin);
  const buyMine = useCommonStore((state) => state.buyMine);
  const buyThisMyne = () => {
    buyMine(mine.resource.id);
  };

  const disabled = !!mines[mine.resource.id] || coin < mine.unlockPrice;

  return (
    <ActionButton
      disabled={disabled}
      onClick={buyThisMyne}
      label="Buy"
      price={abbreviateNumber(mine.unlockPrice)}
    />
  );
};

const SellAll = ({ resource }: { resource: ConfigItem }) => {
  const sellStore = useCommonStore((state) => state.sellStore);
  const mine = useCommonStore((state) => state.mines[resource.resource.id]);

  if (mine === undefined) return null;

  const sellAll = () => {
    sellStore(resource.resource.id);
  };

  return (
    <ActionButton
      disabled={isImpossibleSell(mine)}
      onClick={sellAll}
      label="Sell"
      price={`+${abbreviateNumber(mine.store.count * resource.sellPrice)}`}
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
    className="relative w-72 bg-grayM text-darkM disabled:bg-gray-600 disabled:text-gray-200 clip-down flex mt-4 active:bg-gray-800 active:text-gray-200"
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
