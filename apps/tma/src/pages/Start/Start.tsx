import { Select } from "@headlessui/react";
import { useTranslation } from "react-i18next";

const Start = () => {
  const { i18n } = useTranslation();

  const changeLanguageHandler = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="w-full h-full px-7 flex items-center justify-center">
      <Select
        name="lang"
        aria-label="Language"
        value={i18n.language}
        className="mt-3 block w-full appearance-none rounded-lg border-none bg-darkGrayM py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 *:text-black"
        onChange={(option) => changeLanguageHandler(option.target.value)}
      >
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </Select>
    </div>
  );
};

export default Start;
