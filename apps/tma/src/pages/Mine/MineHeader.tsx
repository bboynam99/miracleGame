import miningIcon from "@/assets/icons/mining.svg";
import { useTranslation } from "react-i18next";

export const MineHeader = ({
  resourceName: resoucrceName,
}: {
  resourceName: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="py-4 flex items-center gap-2.5">
      <img className="w-5 h-5 text-grayM" src={miningIcon} />
      <span className="text-xl text-grayM">
        {resoucrceName} {t("factory")}
      </span>
    </div>
  );
};
