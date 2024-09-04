import { useState, useEffect } from "react";
import Game from "src/components/Game";
import Help from "src/components/Help";
import Settings from "src/components/Settings";
import { Button, IconButton } from "@adamjanicki/ui";
import { DEFAULT_SETTINGS, GameSettings, getData, saveData } from "src/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const Launcher = () => {
  const [help, setHelp] = useState(false);
  const [settings, setSettings] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [gameSettings, setGameSettings] = useState<GameSettings>();

  useEffect(() => {
    const fetchSettings = async () => {
      let settingsData = getData("settings");
      const parsedSettings = settingsData
        ? JSON.parse(settingsData)
        : DEFAULT_SETTINGS;
      const score = parseInt(getData("highScore") ?? "0");
      setGameSettings(parsedSettings);
      setHighScore(score);
    };

    fetchSettings();
  }, []);

  const closeHelp = () => setHelp(false);
  const closeSettings = () => setSettings(false);

  const saveSettings = (settings = DEFAULT_SETTINGS) => {
    saveData("settings", JSON.stringify(settings));
    setSettings(false);
    setGameSettings(settings);
  };

  return gameSettings ? (
    <div className="flex flex-column items-center justify-center">
      <div className="flex flex-row justify-center items-center w-100">
        <h1 className="tc f2 fw2 mv0">SnakeJS</h1>
        <div className="flex flex-row items-center justify-center">
          <IconButton
            aria-label="help"
            onClick={() => setHelp(true)}
            icon={<FontAwesomeIcon icon={faQuestionCircle} />}
          />
          <Help open={help} onClose={closeHelp} />
          <IconButton
            aria-label="settings"
            onClick={() => setSettings(true)}
            icon={<FontAwesomeIcon icon={faGear} />}
          />
          <Settings
            open={settings}
            onClose={closeSettings}
            saveSettings={saveSettings}
            settings={gameSettings}
          />
        </div>
      </div>
      <Game settings={gameSettings} highScore={highScore} />
      <Button
        className="mb1 mt2"
        variant="secondary"
        onClick={() => window.location.reload()}
      >
        Restart
      </Button>
      <div className="bt b--moon-gray w-100 tc">
        Est. 2022 Built from scratch by Adam
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Launcher;
