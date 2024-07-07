import { useCommonStore } from "@/store/store";

const Tenders = () => {
  const mines = useCommonStore((state) => state.mines);
  const config = useCommonStore((state) => state.availableMines);

  return (
    <div>
      <span className="text-white text-2xs">{JSON.stringify(mines)}</span>
      <span className="text-white text-2xs">{JSON.stringify(config)}</span>
      <h1>Tenders</h1>
    </div>
  );
};

export default Tenders;
