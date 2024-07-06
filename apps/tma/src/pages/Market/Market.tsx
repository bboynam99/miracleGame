import { userStore, availableMines } from "@/store/store";
import softIcon from "@/assets/icons/soft.svg";
import { Link } from "react-router-dom";
import { abbreviateNumber } from "../utils";

const Market = () => {
  const mines = userStore((state) => state.mines);

  return (
    <div className="flex flex-col pb-8 gap-2">
      {availableMines
        .filter(({ resource: { id } }) => !mines[id])
        .map((mine) => {
          return (
            <Link
              key={mine.id}
              to={`/mine/${mine.id}`}
              className="grid grid-cols-market-items"
            >
              <img className="h-full w-full" src={mine.resource.image} />
              <div className="flex flex-col justify-center gap-3 px-2.5">
                <span className="text-2xs text-darkGrayM">Factory</span>
                <span className="text-white text-xs">{mine.resource.name}</span>
              </div>
              <div className="flex flex-col justify-center items-end gap-3 px-2.5">
                <span className="text-darkGrayM text-2xs px-4">Price:</span>
                <div className="flex gap-2">
                  <span className="text-white text-xs">
                    {abbreviateNumber(mine.unlockPrice)}
                  </span>
                  <img src={softIcon} />
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Market;
