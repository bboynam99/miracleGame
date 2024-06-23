import { userStore } from "@/store/store";
import { Link } from "react-router-dom";
import background from "@/assets/icons/background.svg";

const Production = () => {
  const mines = userStore((state) => state.mines);

  return (
    <div className="flex flex-col gap-0.5 pb-10">
      {mines && Object.keys(mines).length > 0
        ? Object.values(mines)
            .reverse()
            .map(
              (mine) =>
                mine && (
                  <Link to={`/mine/${mine.id}`} key={mine.id}>
                    <div className="w-full flex relative">
                      <img
                        className="absolute w-full h-full z-0"
                        src={background}
                      />
                      <img className="w-20 h-20" src={mine.resource.image} />
                      <div className="flex flex-grow justify-between relative py-3 pl-4 pr-3">
                        <div className="flex flex-col text-2xs justify-between">
                          <span className="text-xs text-grayM">Factory</span>
                          <span className="text-white">
                            {mine.resource.name}
                          </span>
                          <div className="flex text-xs gap-2">
                            <span className="text-secondaryM">
                              +{mine.passive.craftPerMinute}
                            </span>
                            <span className="text-thirdlyM">
                              -{mine.usagePerMinute}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <span className="text-2xs text-grayM">Stock</span>
                          <span className="text-white">{mine.store.count}</span>
                          <span className="text-white text-xs">
                            max./x{mine.maxStore}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ),
            )
        : "No mines"}
    </div>
  );
};

export default Production;
