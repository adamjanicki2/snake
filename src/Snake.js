import { DEFAULT_GRIDSIZE } from "./util";

export default class Snake {
  #snake;
  #gridSize;
  /**
   * Create a new Snake
   *
   * @param {number} startX starting x-pos for the head
   * @param {number} startY starting y-pos for the head
   */
  constructor(startX, startY, gridSize = DEFAULT_GRIDSIZE) {
    this.#snake = [{ x: startX, y: startY }];
    this.#gridSize = gridSize;
  }

  /**
   * Alternate factory method to make a new snake
   *
   * @param {number} startX starting x-pos for the head
   * @param {number} startY starting y-pos for the head
   *
   * @returns {Snake} a new snake object
   */
  static create(startX, startY, gridSize = DEFAULT_GRIDSIZE) {
    return new Snake(startX, startY, gridSize);
  }

  /**
   * Push a new element onto the snake
   */
  #push() {
    const { x, y } = this.#snake[this.#snake.length - 1];
    this.#snake.push({ x, y });
  }

  /**
   * Eat an apple if overlapping with the head of the snake
   *
   * @param {{x: number, y: number}} apple
   * @returns
   */
  eatApple(apple) {
    const head = this.#snake[0];
    if (apple.x === head.x && apple.y === head.y) {
      this.#push();
      return true;
    }
    return false;
  }

  /**
   * Move the snake one time step
   *
   * @param {{x: number, y: number}} direction the direction of movement
   * @param {boolean} checkWalls check if there is a collision
   * @returns {boolean} true iff there is a collision with one of the walls
   */
  move(direction, checkWalls = true) {
    let newHead = {
      x: this.#snake[0].x + direction.x,
      y: this.#snake[0].y + direction.y,
    };
    this.#snake.pop();
    if (checkWalls) {
      const { x, y } = newHead;
      if (x < 0 || x >= this.#gridSize || y < 0 || y >= this.#gridSize)
        return true;
    } else {
      newHead = this.getNewHead(newHead);
    }
    this.#snake = [newHead].concat(this.#snake);
    return false;
  }

  /**
   * Get new head for the snake
   *
   * @param {{x: number, y: number}} head of the snake
   * @returns the new head position for the snake
   */
  getNewHead(head) {
    const { x, y } = head;
    if (x < 0) return { x: this.#gridSize - 1, y };
    if (x >= this.#gridSize) return { x: 0, y };
    if (y < 0) return { x, y: this.#gridSize - 1 };
    if (y >= this.#gridSize) return { x, y: 0 };
    return head;
  }

  /**
   * Check for collisions
   *
   * @returns {boolean} true if a collision is detected else false
   */
  hasCollision() {
    const snakeLength = this.#snake.length;
    for (let i = 0; i < snakeLength; ++i) {
      const block1 = this.#snake[i];
      for (let j = 0; j < i; ++j) {
        const block2 = this.#snake[j];
        if (block1.x === block2.x && block1.y === block2.y) return true;
      }
    }
    return false;
  }

  /**
   * Get the grid to show
   *
   * @returns {Array<{x: number, y: number}>}
   */
  getGrid() {
    const out = Array(this.#gridSize ** 2).fill("0");
    for (const { x, y } of this.#snake) {
      out[y * this.#gridSize + x] = "s";
    }
    return out;
  }

  /**
   * Get the head of the snake
   *
   * @returns {{x: number, y: number}} Head of the snake
   */
  getHead() {
    return this.#snake[0];
  }

  /**
   * Prints a snake!
   *
   * @returns {string} the toString for this Snake Object
   */
  toString() {
    const arr = [];
    for (let y = 0; y < this.#gridSize; ++y) {
      const cur = [];
      for (let x = 0; x < this.#gridSize; ++x) {
        cur.push("+");
      }
      arr.push(cur);
    }
    for (const { x, y } of this.#snake) {
      arr[y][x] = "o";
    }
    arr[this.#snake[0].y][this.#snake[0].x] = "O";
    return arr.reduce((prev, current) => prev + current.join(" ") + "\n", "");
  }
}
