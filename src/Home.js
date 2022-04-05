/* global chrome */
import React from "react";
import Game from "./Game";
import Help from "./Help";
import Settings from "./Settings";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import { Settings as SettingsIcon } from "@mui/icons-material";
import "./index.css";
import { DEFAULT_SETTINGS, getData, saveData } from "./util";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      help: false,
      settings: false,
      highScore: 0,
      gameSettings: undefined,
    };
  }

  async componentDidMount() {
    // fetch settings from chrome storage
    let gameSettings = await getData("settings");
    gameSettings = gameSettings ? JSON.parse(gameSettings) : DEFAULT_SETTINGS;
    const highScore = (await getData("highScore")) ?? 0;
    this.setState({ gameSettings, highScore });
  }

  closeHelp = () => {
    return this.setState({ help: false });
  };

  closeSettings = () => {
    return this.setState({ settings: false });
  };

  saveSettings = async (settings = DEFAULT_SETTINGS) => {
    await saveData("settings", JSON.stringify(settings));
    return this.setState({ settings: false, gameSettings: settings });
  };

  render() {
    return this.state.gameSettings ? (
      <div className="flex flex-column items-center justify-center">
        <div className="flex flex-row justify-end items-center w-100">
          <h1 className="tc f2 fw2 mv0 mr5">SnakeJS</h1>
          <div className="flex flex-row items-center justify-center">
            <IconButton
              children={<HelpIcon />}
              onClick={() => {
                this.setState({ help: true });
              }}
            ></IconButton>
            <Help open={this.state.help} close={this.closeHelp} />
            <IconButton
              children={<SettingsIcon />}
              onClick={() => {
                this.setState({ settings: true });
              }}
            ></IconButton>
            <Settings
              open={this.state.settings}
              close={this.closeSettings}
              save={this.saveSettings}
              settings={this.state.gameSettings}
            />
          </div>
        </div>
        <Game
          settings={this.state.gameSettings}
          highScore={this.state.highScore}
        />
        <Button
          size="small"
          variant="outlined"
          style={{
            textTransform: "none",
            fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"'],
            marginTop: "8px",
            backgroundColor: "#F4F4F4",
            marginBottom: "4px",
          }}
          onClick={() => {
            window.location.reload(false);
          }}
        >
          Restart
        </Button>
        <div className="bt b--moon-gray w-100 tc">
          © 2022 Built from scratch by Adam
        </div>
      </div>
    ) : (
      <></>
    );
  }
}

export default Home;
