import miningIcon from "@/assets/icons/mining.svg";

export const MineHeader = ({
  resourceName: resoucrceName,
}: {
  resourceName: string;
}) => (
  <div className="py-4 flex items-center gap-2.5">
    <img className="w-5 h-5 text-grayM" src={miningIcon} />
    <span className="text-xl text-grayM">{resoucrceName} factory</span>
  </div>
);
