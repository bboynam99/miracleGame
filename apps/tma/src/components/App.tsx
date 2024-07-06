import { lazy, FC, Suspense } from "react";
import { InitUser } from "./InitUser";
import { LoadIndicator } from "./LoadIndicator";
import { SaveGame } from "./Save";
import "./internationalization";

const Inner = lazy(() => import("./Inner"));

export const App: FC = () => {
  return (
    <InitUser>
      <SaveGame />
      <Suspense fallback={<LoadIndicator />}>
        <Inner />
      </Suspense>
    </InitUser>
  );
};
