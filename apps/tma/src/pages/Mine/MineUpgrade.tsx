import { Button } from "@headlessui/react";
import upIcon from "@/assets/icons/up.svg";
import soft from "@/assets/icons/soft.svg";
import stokeIcon from "@/assets/icons/store.svg";
import toolsIcon from "@/assets/icons/tools.svg";
import workersIcon from "@/assets/icons/workers.svg";
import {
  MineType,
  userStore,
  isImpossibleUpdateStore,
  isImposibleUpdateProductivity,
  isImposibleHire,
  getHireWorkerCount,
} from "@/store/store";
import { abbreviateNumber } from "../utils";
import button from "@/assets/button.svg";
import info from "@/assets/info.svg";

const UpgradeButton = ({
  price,
  onClick,
  disabled,
}: {
  price: number | "N/A";
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <div className="relative">
      <img src={button} className="w-full h-8" />

      <Button
        disabled={disabled}
        className="clip-down absolute top-0 flex items-center w-full h-full disabled:bg-black/50"
        onClick={onClick}
      >
        <div className="flex h-full w-2/6 items-center justify-center pl-1">
          <img className="w-5 h-5" src={upIcon} />
        </div>

        <div className="flex flex-grow items-center">
          <span className="text-xs text-black flex-grow text-center">
            {price === "N/A" ? price : abbreviateNumber(price)}
          </span>
          <div className="py-2 pr-2">
            <img className="w-3 h-3" src={soft} />
          </div>
        </div>
      </Button>
    </div>
  );
};

const TitleLevel = ({
  level,
  title,
  icon,
  iconAlt,
  isCount,
}: {
  level: number;
  title: string;
  icon: string;
  iconAlt: string;
  isCount: boolean;
}) => {
  return (
    <div className="relative">
      <img src={info} className="w-full h-11" />

      <div className="flex absolute top-0 w-full items-center bg-transparent p-2">
        <img alt={iconAlt} className="w-4 h-4" src={icon} />
        <div className="flex flex-col flex-grow items-center">
          <span className="text-grayM text-2xs">{title}</span>
          <span className="text-xs text-white uppercase">
            {isCount ? "" : "lvl"} {level}
          </span>
        </div>
      </div>
    </div>
  );
};

type NA = "N/A";

export const MineUpgrade = ({
  mine,
  disabled,
}: {
  mine: MineType;
  disabled?: boolean;
}) => {
  const { store, fabric, worker } = userStore((state) => ({
    fabric: state.updateSpeedProductivity,
    store: state.updateStore,
    worker: state.hireWorker,
  }));

  const items = [
    {
      title: "Stoke",
      level: mine.levelStore,
      isCount: false,
      price: mine.store.updateCapacityPrice[mine.levelStore] || ("N/A" as NA),
      icon: stokeIcon,
      iconAlt: "Stoke icon",
      onClick: () => {
        store(mine.id);
      },
      disabled: disabled || isImpossibleUpdateStore(mine.id),
    },
    {
      title: "Tools",
      level: mine.passive.fabricGrade,
      isCount: false,
      price:
        mine.passive.speedUpgradePrice[mine.passive.fabricGrade] ||
        ("N/A" as NA),
      icon: toolsIcon,
      iconAlt: "Tools icon",
      onClick: () => {
        fabric(mine.id);
      },
      disabled: disabled || isImposibleUpdateProductivity(mine.id),
    },
    {
      title: "Workers",
      level: mine.passive.workerCount,
      isCount: true,
      price:
        mine.passive.workerPrice *
        getHireWorkerCount(mine.passive.workerCount, mine.passive.maxWorkers),
      icon: workersIcon,
      iconAlt: "Workers icon",
      onClick: () => {
        worker(mine.id);
      },
      disabled: disabled || isImposibleHire(mine.id),
    },
  ];
  return (
    <div className="flex gap-1.5 px-2 w-full">
      {items.map(
        ({
          title,
          level,
          price,
          icon,
          iconAlt,
          isCount,
          onClick,
          disabled,
        }) => (
          <div key={title} className="flex flex-col gap-2 flex-grow">
            <TitleLevel
              title={title}
              level={level}
              icon={icon}
              iconAlt={iconAlt}
              isCount={isCount}
            />
            <UpgradeButton
              price={price}
              onClick={onClick}
              disabled={disabled}
            />
          </div>
        )
      )}
    </div>
  );
};
