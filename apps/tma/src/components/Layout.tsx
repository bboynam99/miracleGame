import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useMiniApp } from "@tma.js/sdk-react";
import { LoadIndicator } from "./LoadIndicator";
import { Header } from "./Header";
import { Toolbar } from "./Toolbar";
import background from "@/assets/background.svg";

export const Layout = () => {
  const miniApp = useMiniApp();

  useEffect(() => {
    miniApp.setHeaderColor("#121212");
  }, [miniApp]);

  return (
    <div className="h-screen w-screen flex flex-col bg-darkM overflow-hidden relative">
      <Header />
      <div
        className="flex-grow overflow-y-auto bg-gradient-to-b "
        style={
          {
            "--tw-gradient-stops":
              "rgba(255, 255, 255, 0.09), rgba(0, 0, 0, 0.09)" as string,
          } as React.CSSProperties
        }
      >
        <Suspense fallback={<LoadIndicator />}>
          <Outlet />
        </Suspense>
      </div>
      <Toolbar />
      <img
        src={background}
        className="absolute w-full h-full pointer-events-none"
      />
    </div>
  );
};
