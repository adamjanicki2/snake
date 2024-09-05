import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import {
  DEFAULT_SETTINGS,
  SPEED_OPTIONS,
  GRIDSIZE_OPTIONS,
  SNAKE_OPTIONS,
  BACKGROUND_OPTIONS,
} from "./util";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: DEFAULT_SETTINGS,
    };
  }

  componentDidMount() {
    return this.setState({ settings: this.props.settings });
  }

  render() {
    return (
      <Dialog open={this.props.open} fullWidth>
        <DialogTitle>
          Settings
          <IconButton
            onClick={this.props.close}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            style={{
              fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"'],
            }}
          >
            Use Walls:
            <Switch
              checked={this.state.settings.checkWalls}
              onChange={(event) => {
                const settings = {
                  ...this.state.settings,
                  checkWalls: event.target.checked,
                };
                this.setState({ settings });
              }}
            />
            <div className="flex flex-row flex-nowrap items-center mv2">
              Speed:
              <Select
                style={{ marginLeft: "8px" }}
                size="small"
                value={this.state.settings.speed}
                onChange={(event) => {
                  const settings = {
                    ...this.state.settings,
                    speed: event.target.value,
                  };
                  this.setState({ settings });
                }}
              >
                {SPEED_OPTIONS.map(([label, value], index) => (
                  <MenuItem value={value} key={`speedlabel${index}`}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-row flex-nowrap items-center mv2">
              Grid Size:
              <Select
                style={{ marginLeft: "8px" }}
                size="small"
                value={this.state.settings.gridSize}
                onChange={(event) => {
                  const settings = {
                    ...this.state.settings,
                    gridSize: event.target.value,
                  };
                  this.setState({ settings });
                }}
              >
                {GRIDSIZE_OPTIONS.map(([label, value], index) => (
                  <MenuItem value={value} key={`gridsizeoption${index}`}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-row flex-nowrap items-center mv2">
              Background Color:
              <Select
                style={{ marginLeft: "8px" }}
                size="small"
                value={this.state.settings.backgroundColor}
                onChange={(event) => {
                  const settings = {
                    ...this.state.settings,
                    backgroundColor: event.target.value,
                  };
                  this.setState({ settings });
                }}
              >
                {BACKGROUND_OPTIONS.map(([label, value], index) => (
                  <MenuItem value={value} key={`bgcoloroption${index}`}>
                    <div className="flex flex-row flex-nowrap items-center">
                      {label}
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: value,
                          marginLeft: "4px",
                        }}
                      ></div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex flex-row flex-nowrap items-center mv2">
              Snake Color:
              <Select
                size="small"
                style={{ marginLeft: "8px" }}
                value={this.state.settings.snakeColor}
                onChange={(event) => {
                  const settings = {
                    ...this.state.settings,
                    snakeColor: event.target.value,
                  };
                  this.setState({ settings });
                }}
              >
                {SNAKE_OPTIONS.map(([label, value], index) => (
                  <MenuItem value={value} key={`snakecoloroption${index}`}>
                    <div className="flex flex-row flex-nowrap items-center">
                      {label}
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          marginLeft: "4px",
                          backgroundColor: value,
                        }}
                      ></div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.save(this.state.settings);
            }}
            variant="outlined"
            style={{
              textTransform: "none",
              fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"'],
              marginTop: "8px",
              backgroundColor: "#F4F4F4",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Settings;
