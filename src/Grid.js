import React from "react";
import "./index.css";
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_SNAKE_COLOR } from "./util";

const DEFAULT_BLOCKSIZE = 26;
const BLOCKSIZE_MAP = new Map([
  [8, 48],
  [12, 32],
  [16, 26],
  [24, 16],
  [32, 14],
]);
const BG_MAP = new Map([
  ["0", "bg-blue"],
  ["a", "bg-red"],
  ["s", "bg-white"],
]);

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const blockSize =
      BLOCKSIZE_MAP.get(this.props.gridSize) ?? DEFAULT_BLOCKSIZE;
    const backgroundColor =
      this.props.backgroundColor ?? DEFAULT_BACKGROUND_COLOR;
    const snakeColor = this.props.snakeColor ?? DEFAULT_SNAKE_COLOR;
    return (
      <div
        className="ba br3 bw3 mh2"
        style={{
          borderColor: this.props.thickBorder ? "black" : backgroundColor,
          marginBottom: "4px",
        }}
      >
        <div
          className="flex flex-row flex-wrap"
          style={{ width: blockSize * this.props.gridSize }}
        >
          {this.props.grid.map((element, i) => (
            <div
              style={{
                width: blockSize,
                height: blockSize,
                border: `1px solid ${backgroundColor}`,
                backgroundColor:
                  element === "a"
                    ? "red"
                    : element === "s"
                    ? snakeColor
                    : backgroundColor,
              }}
              key={`tile${i}`}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default Grid;
