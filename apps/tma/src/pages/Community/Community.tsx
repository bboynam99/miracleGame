import { useEffect, useRef, useState } from "react";
import { getFunctions } from "firebase/functions";
import { app } from "@/store/firebase";
import { Button } from "@headlessui/react";
import useHttpsCallable from "@/store/useHttpsCallable";
import { useMiniApp, useCloudStorage } from "@tma.js/sdk-react";
import {} from "@tma.js/sdk-react";

const Community = () => {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [countClick, setCountClick] = useState(0);
  const [executeCallable] = useHttpsCallable(getFunctions(app), "save");
  const miniApp = useMiniApp();
  const cloudStorage = useCloudStorage();

  const onClick = () => {
    if (countClick >= 5) {
      setCountClick(0);
      executeCallable({
        gameStats: JSON.stringify({ coin: 0, mines: {} }),
      }).then(() => {
        miniApp.close();
      });
    } else {
      setCountClick((state) => state + 1);
    }

    if (countClick === 1) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        setCountClick(0);
      }, 5000);
    }
  };

  const onRestoreClick = () => {
    console.log("here");
    cloudStorage.delete("tutor");
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <Button onClick={onClick}>
        <h1 className="text-3xl text-white p-3 bg-primaryM">Community</h1>
      </Button>
      <Button onClick={onRestoreClick}>
        <h1 className="text-3xl text-white p-3 bg-primaryM">Restore tutor</h1>
      </Button>
    </div>
  );
};

export default Community;
