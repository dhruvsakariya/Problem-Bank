import { useState, useEffect, FC } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { Popover } from "react-tiny-popover";
import { ISettings } from "../Playground";
import SettingsModal from "../../../../components/Modal/SettingsModal";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import styles from "./PreferenceNav.module.css";
import { Language } from "../../../../features/contest/contest";
import { setProblemLanguage } from "../../../../features/contest/contestSlice";

type PreferenceNavProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  setSettings,
  settings,
}) => {
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const problemIdx = useAppSelector((state) => state.contest.problemIdx);
  const problem = useAppSelector(
    (state) => state.contest.questions[problemIdx]
  );

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full ">
      <Popover
        isOpen={showLanguageSelect}
        positions={"bottom"} // preferred positions by priority
        align="start"
        content={
          <LanguagesOption setShowLanguageSelect={setShowLanguageSelect} />
        }
        padding={8}
        onClickOutside={() => setShowLanguageSelect(false)}
        clickOutsideCapture
      >
        <div
          className="text-white flex items-center cursor-pointer  rounded focus:outline-none bg-dark-fill-3  hover:bg-dark-fill-2  px-2 py-1.5 font-medium text-xs text-dark-label-2"
          onClick={() => setShowLanguageSelect((prev) => !prev)}
        >
          {problem.language} <IoIosArrowDown className="ml-1" />
        </div>
      </Popover>

      <div className="flex items-center m-2">
        <button
          type="button"
          className="preferenceBtn group"
          onClick={() =>
            setSettings({ ...settings, settingsModalIsOpen: true })
          }
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            {!isFullScreen ? (
              <AiOutlineFullscreen />
            ) : (
              <AiOutlineFullscreenExit />
            )}
          </div>
          <div className="preferenceBtn-tooltip">Full Screen</div>
        </button>
      </div>
      {settings.settingsModalIsOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};
export default PreferenceNav;

interface LanguagesOptionProps {
  setShowLanguageSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

const LanguagesOption: FC<LanguagesOptionProps> = ({
  setShowLanguageSelect,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (lang: Language) => {
    dispatch(setProblemLanguage({ lang }));
    setShowLanguageSelect(false);
  };

  return (
    <ul className="text-white bg-dark-fill-4 p-1 rounded">
      <li className={styles.language} onClick={() => handleClick("javascript")}>
        javascript
      </li>
      <li className={styles.language} onClick={() => handleClick("cpp")}>
        cpp
      </li>
      <li className={styles.language} onClick={() => handleClick("java")}>
        java
      </li>
    </ul>
  );
};
