import { create } from "zustand";
import { ConfigSlice, MineType, UserGameSlice } from "./types";
import { createGameSlice, getHireWorkerCount } from "./gameSlice";
import { createConfigSlice } from "./configSlice";
import { immer } from "zustand/middleware/immer";

export interface Store extends ConfigSlice, UserGameSlice {}

export const useCommonStore = create<Store>()(
  immer((set, get, store) => ({
    ...createConfigSlice(set, get, store),
    ...createGameSlice(set, get, store),
  }))
);

setInterval(() => {
  useCommonStore.getState().tick();
}, 100);

export const isImpossibleUpdateStore = (mineId: MineType["id"]) => {
  const { coin, mines } = useCommonStore.getState();
  const mine = mines[mineId];
  const resource = useCommonStore
    .getState()
    .availableMines.find((r) => r.resource.id === mineId);

  if (mine === undefined || resource === undefined) {
    return true;
  }

  return (
    !resource.store.updateCapacityPrice[mine.levelStore] ||
    coin < resource.store.updateCapacityPrice[mine.levelStore]
  );
};

export const isImposibleUpdateProductivity = (mineId: MineType["id"]) => {
  const { coin, mines } = useCommonStore.getState();
  const mine = mines[mineId];
  const resource = useCommonStore
    .getState()
    .availableMines.find((r) => r.resource.id === mineId);

  if (mine === undefined || resource === undefined) {
    return true;
  }

  if (resource.resource.craftResource.some(({ id }) => !mines[id])) {
    return true;
  }

  return (
    mine.passive.fabricGrade >= resource.passive.speedUpgradePrice.length ||
    coin < resource.passive.speedUpgradePrice[mine.passive.fabricGrade]
  );
};

export const isImposibleHire = (mineId: MineType["id"]) => {
  const { coin, mines } = useCommonStore.getState();
  const mine = mines[mineId];
  const resource = useCommonStore
    .getState()
    .availableMines.find((r) => r.resource.id === mineId);

  if (mine === undefined || resource === undefined) {
    return true;
  }

  if (resource.resource.craftResource.some(({ id }) => !mines[id])) {
    return true;
  }

  return (
    coin <
      getHireWorkerCount(
        mine.passive.workerCount,
        resource.passive.maxWorkers
      ) *
        resource.passive.workerPrice ||
    mine.passive.workerCount >= resource.passive.maxWorkers
  );
};
