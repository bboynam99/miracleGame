import tutor1 from "@/assets/tutor/tutor1.png";
import tutor2 from "@/assets/tutor/tutor2.png";
import tutor3 from "@/assets/tutor/tutor3.png";
import tutor4 from "@/assets/tutor/tutor4.png";
import { useCloudStorage } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";

export const Tutor = () => {
  const images = [tutor1, tutor2, tutor3, tutor4];
  const cloudStorage = useCloudStorage();

  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    cloudStorage.get("tutor").then((value: string) => {
      console.log("value", value);
      if (value !== "done") {
        console.log("here");
        setCurrentIndex(0);
      }
    });
  }, [cloudStorage]);

  const handleClick = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(-1);
      cloudStorage.set("tutor", "done");
    }
  };

  return currentIndex > -1 ? (
    <img
      src={images[currentIndex]}
      alt={`Image ${currentIndex + 1}`}
      onClick={handleClick}
      className="absolute cursor-pointer"
    />
  ) : null;
};
