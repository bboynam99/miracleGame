import { StateCreator, StoreMutatorIdentifier } from "zustand/vanilla";
import { Store } from "./store";

export type ResourceType = {
  id: string;
  name: string;
  image: string;
  craftResource: {
    id: ResourceType["id"];
    image: string;
    count: number;
  }[];
};

export interface ConfigItem {
  resource: ResourceType;
  sellPrice: number;
  sellIsMiriclaCoint: boolean;
  unlockPrice: number;
  store: {
    updateCapacityPrice: number[];
    updateCapacityCount: number[];
    priceIsMiracleCoin: boolean;
  };
  passive: {
    toolPriceIsMiracleCoin: boolean;
    workerPriceIsMiracleCoin: boolean;
    speedProductivity: number[];
    speedUpgradePrice: number[];
    workerPrice: number;
    workerProductivity: number;
    maxWorkers: number;
    produceTime: number;
  };
}

export interface ConfigSlice {
  availableMines: ConfigItem[];
  setConig: (conf: ConfigItem[]) => void;
}

export type MineType = {
  id: string;
  store: {
    count: number;
  };
  maxStore: number;
  levelStore: number;
  usagePerMinute: number;
  passive: {
    currentSpeedProductiviy: number;
    workerCount: number;
    fabricGrade: number;
    currentProduceTime: number;
    progress: number;
    craftPerMinute: number;
  };
};

export type Mines = Partial<Record<string, MineType>>;

export interface UserGameSlice {
  coin: number;
  mCoin: number;
  mines: Mines;
  buyMine: (mineId: MineType["id"]) => void;
  toMine: (mineId: MineType["id"]) => void;
  sellStore: (mineId: MineType["id"]) => void;
  updateStore: (mineId: MineType["id"]) => void;
  updateSpeedProductivity: (mineId: MineType["id"]) => void;
  hireWorker: (mineId: MineType["id"]) => void;
  tick: () => void;
  init: (coin: number, mCoin: number, mines: Mines) => void;
}

export type ImmerStateCreator<
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
> = StateCreator<T, [...Mps, ["zustand/immer", never]], Mcs>;

export type MyAppStateCreator = ImmerStateCreator<Store>;

export type SliceCreator<TSlice extends keyof Store> = (
  ...params: Parameters<MyAppStateCreator>
) => Pick<ReturnType<MyAppStateCreator>, TSlice>;
