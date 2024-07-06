import { MineType, isPosibleCraft, userStore } from "@/store/store";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";
import { ProgressBar } from "../Production/ProgressBar";
import { abbreviateNumber } from "../utils";

const ResourceItem = ({
  order,
  resource,
}: {
  order?: string;
  resource: MineType["resource"]["craftResource"][0];
}) => {
  if (resource === undefined) {
    return <div className={`w-14 h-14 bg-gray-900 ${order}`} />;
  }

  const link = `/mine/${resource.id}`;

  return (
    <div className={order}>
      <Link className="flex flex-col items-center" to={link}>
        <img src={resource.image} className="w-14 h-14 border-gray-600" />
        <span>{resource.count}</span>
      </Link>
    </div>
  );
};

// const Line = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       preserveAspectRatio="none"
//       className={`w-full h-full text-grayM ${className}`}
//       width="100"
//       height="100"
//       viewBox="0 0 100 100"
//     >
//       <line
//         x1={50}
//         x2={50}
//         y1={0}
//         y2={100}
//         stroke="currentColor"
//         strokeWidth={1}
//       />
//     </svg>
//   );
// };

// const SecondLine = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       preserveAspectRatio="none"
//       className={`w-full h-full text-grayM ${className}`}
//       width="100"
//       height="100"
//       viewBox="0 0 100 100"
//     >
//       <line
//         x1={50}
//         x2={50}
//         y1={20}
//         y2={100}
//         stroke="currentColor"
//         strokeWidth={1}
//       />
//       <line
//         x1={50}
//         x2={100}
//         y1={20}
//         y2={20}
//         stroke="currentColor"
//         strokeWidth={1}
//       />
//     </svg>
//   );
// };

export const MineInfo = ({ mine }: { mine: MineType }) => {
  const { mines } = userStore((state) => state);
  const toMine = userStore((state) => state.toMine);
  const toMineResource = () => {
    toMine(mine.id);
  };

  return (
    <div className="grid grid-cols-item-info gap-1.5 px-8">
      <div className="flex flex-col px-4 py-2 items-center bg-grayT">
        <span className="text-2xs text-grayM">Cycle:</span>
        <span className="text-xs text-white">
          {mine.passive.currentProduceTime} sec
        </span>
      </div>

      <Button
        onClick={toMineResource}
        disabled={!isPosibleCraft(mine, mines)}
        className="col-span-1 row-span-2 relative min-w-32 active:opacity-80 disabled:opacity-50"
      >
        <img
          src={mine.resource.image}
          alt={`${mine.resource.name} resource`}
          className="w-full auto top-0 object-cover absolute z-10 overflow-visible"
        ></img>
        <ProgressBar
          className="w-full min-h-32 absolute top-0 z-20"
          progress={(mine.passive.progress / mine.passive.produceTime) * 100}
          isMax={false}
        />
      </Button>

      <div className="flex flex-col text-secondaryM px-4 py-2 items-center bg-thirdlyT text-center min-w-24">
        <span className="text-2xs">Income:</span>
        <span className="text-xs">
          {abbreviateNumber(mine.passive.craftPerMinute)} /min
        </span>
      </div>

      <div className="flex flex-col px-4 py-2 items-center bg-grayT">
        <span className="text-2xs text-grayM">Result:</span>
        <span className="text-xs text-white">
          x{abbreviateNumber(mine.passive.workerCount)}
        </span>
      </div>

      <div className="flex flex-col text-thirdlyM px-4 py-2 items-center bg-primaryT">
        <span className="text-2xs">Expense:</span>
        <span className="text-xs">
          x{abbreviateNumber(mine.usagePerMinute)}
        </span>
      </div>

      <div className="grid grid-cols-5 col-span-3">
        <div className="col-span-5 h-10" />
        {/* <SecondLine />
        <Line />
        <Line />
        <Line />
        <SecondLine className="-scale-x-100" /> */}
        {[...Array(5)].map((_, index) => {
          const resource = mine.resource.craftResource[index];

          return <ResourceItem key={index} resource={resource} />;
        })}
      </div>
    </div>
  );
};
