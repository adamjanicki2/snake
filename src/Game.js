import React from "react";
import Snake from "./Snake";
import "./index.css";
import Grid from "./Grid";
import { saveData } from "./util";

const NEUTRAL = 32;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_P = 80;
const KEY_R = 82;
const DIR_MAP = new Map([
  [KEY_LEFT, { x: -1, y: 0 }],
  [KEY_UP, { x: 0, y: -1 }],
  [KEY_RIGHT, { x: 1, y: 0 }],
  [KEY_DOWN, { x: 0, y: 1 }],
  [NEUTRAL, { x: 0, y: 0 }],
]);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      paused: false,
      snake: null,
      direction: NEUTRAL,
      apple: null,
      interval: null,
      score: 0,
    };
  }

  async componentDidMount() {
    const { gridSize, speed } = this.props.settings;
    const apple = this.randomApple(gridSize);
    const snake = Snake.create(gridSize / 2, gridSize / 2, gridSize);
    const grid = snake.getGrid();
    grid[apple.y * gridSize + apple.x] = "a";
    document.onkeydown = this.keyHandler;
    this.setState({
      apple,
      snake,
      grid,
      interval: setInterval(this.gameloop, speed),
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.settings !== prevProps.settings)
      return window.location.reload(false);
  }

  endGame = () => {
    this.setState({ gameOver: true });
    clearInterval(this.state.interval);
    if (this.state.score > this.props.highScore)
      saveData("highScore", this.state.score);
  };

  pausePlay = () => {
    const paused = this.state.paused;
    clearInterval(this.state.interval);
    if (paused)
      return this.setState({
        paused: !paused,
        interval: setInterval(this.gameloop, this.props.settings.speed),
      });
    return this.setState({
      paused: !paused,
    });
  };

  gameloop = () => {
    const curDir = DIR_MAP.get(this.state.direction);
    const wallCollision = this.state.snake.move(
      curDir,
      this.props.settings.checkWalls
    );
    if (
      this.state.snake.hasCollision() ||
      (this.props.settings.checkWalls && wallCollision)
    )
      return this.endGame();
    const didEatApple = this.state.snake.eatApple(this.state.apple);
    const apple = didEatApple
      ? this.randomApple(this.props.settings.gridSize)
      : this.state.apple;
    const score = didEatApple ? this.state.score + 1 : this.state.score;
    const grid = this.state.snake.getGrid();
    grid[apple.y * this.props.settings.gridSize + apple.x] = "a";
    this.setState({ apple, grid, score });
  };

  keyHandler = ({ keyCode }) => {
    let direction = this.state.direction;
    switch (keyCode) {
      case KEY_R:
        window.location.reload(false);
        break;
      case KEY_LEFT:
        direction = direction === KEY_RIGHT ? KEY_RIGHT : KEY_LEFT;
        break;
      case KEY_RIGHT:
        direction = direction === KEY_LEFT ? KEY_LEFT : KEY_RIGHT;
        break;
      case KEY_UP:
        direction = direction === KEY_DOWN ? KEY_DOWN : KEY_UP;
        break;
      case KEY_DOWN:
        direction = direction === KEY_UP ? KEY_UP : KEY_DOWN;
        break;
      case NEUTRAL:
        return this.pausePlay();
      case KEY_P:
        return this.pausePlay();
      default:
        break;
    }
    return !this.state.gameOver && this.setState({ direction });
  };

  randomApple = (gridSize) => {
    const rx = Math.floor(Math.random() * gridSize);
    const ry = Math.floor(Math.random() * gridSize);
    return { x: rx, y: ry };
  };

  render() {
    return this.state.snake ? (
      <div className="flex flex-column justify-center">
        <hr style={{ width: "98%", color: "#CCC", border: "1px solid #CCC" }} />
        <div className="flex flex-row items-center justify-between ph2">
          <div className="f4 fw3">{this.state.score}</div>
          <div className="f4 fw3">HI: {this.props.highScore}</div>
        </div>
        <Grid
          grid={this.state.grid}
          gridSize={this.props.settings.gridSize}
          thickBorder={this.props.settings.checkWalls}
          backgroundColor={this.props.settings.backgroundColor}
          snakeColor={this.props.settings.snakeColor}
        />
      </div>
    ) : (
      <></>
    );
  }
}

export default Game;
