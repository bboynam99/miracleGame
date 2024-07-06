import { MineType } from "@/store/store";
import { abbreviateNumber } from "../utils";

export const MineStore = ({ mine }: { mine: MineType }) => (
  <div className="py-8 font-black bg-gradient-to-r from-white to-darkGrayM text-transparent bg-clip-text tracking-wide">
    <span className="">x</span>
    <span className="text-2xl ">{abbreviateNumber(mine.store.count)}</span>
    <span>/</span>
    <span className="text-16px">{abbreviateNumber(mine.maxStore)}</span>
  </div>
);
