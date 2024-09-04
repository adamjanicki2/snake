type Position = {
  x: number;
  y: number;
};

export default class Snake {
  private snake: Position[];
  private gridSize: number;

  /**
   * Create a new Snake
   *
   * @param startX starting x-pos for the head
   * @param startY starting y-pos for the head
   * @param gridSize size of the grid (optional)
   */
  constructor(startX: number, startY: number, gridSize: number) {
    this.snake = [{ x: startX, y: startY }];
    this.gridSize = gridSize;
  }

  /**
   * Alternate factory method to make a new snake
   *
   * @param startX starting x-pos for the head
   * @param startY starting y-pos for the head
   * @param gridSize size of the grid (optional)
   * @returns a new snake object
   */
  static create(startX: number, startY: number, gridSize: number): Snake {
    return new Snake(startX, startY, gridSize);
  }

  /**
   * Push a new element onto the snake
   */
  private push() {
    const { x, y } = this.snake[this.snake.length - 1];
    this.snake.push({ x, y });
  }

  /**
   * Eat an apple if overlapping with the head of the snake
   *
   * @param apple the position of the apple
   * @returns true if the apple was eaten, false otherwise
   */
  eatApple(apple: Position): boolean {
    const head = this.snake[0];
    if (apple.x === head.x && apple.y === head.y) {
      this.push();
      return true;
    }
    return false;
  }

  /**
   * Move the snake one time step
   *
   * @param direction the direction of movement
   * @param checkWalls whether to check for wall collisions (default: true)
   * @returns true if there is a collision with one of the walls, false otherwise
   */
  move(direction: Position, checkWalls: boolean = true): boolean {
    let newHead = {
      x: this.snake[0].x + direction.x,
      y: this.snake[0].y + direction.y,
    };
    this.snake.pop();
    if (checkWalls) {
      const { x, y } = newHead;
      if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize)
        return true;
    } else {
      newHead = this.getNewHead(newHead);
    }
    this.snake = [newHead].concat(this.snake);
    return false;
  }

  /**
   * Get new head for the snake
   *
   * @param head current head position
   * @returns the new head position for the snake
   */
  getNewHead(head: Position): Position {
    const { x, y } = head;
    if (x < 0) return { x: this.gridSize - 1, y };
    if (x >= this.gridSize) return { x: 0, y };
    if (y < 0) return { x, y: this.gridSize - 1 };
    if (y >= this.gridSize) return { x, y: 0 };
    return head;
  }

  /**
   * Check for collisions
   *
   * @returns true if a collision is detected, else false
   */
  hasCollision(): boolean {
    const snakeLength = this.snake.length;
    for (let i = 0; i < snakeLength; ++i) {
      const block1 = this.snake[i];
      for (let j = 0; j < i; ++j) {
        const block2 = this.snake[j];
        if (block1.x === block2.x && block1.y === block2.y) return true;
      }
    }
    return false;
  }

  /**
   * Get the grid to show
   *
   * @returns the current state of the grid
   */
  getGrid(): string[] {
    const out = Array(this.gridSize ** 2).fill("0");
    for (const { x, y } of this.snake) {
      out[y * this.gridSize + x] = "s";
    }
    return out;
  }

  /**
   * Get the head of the snake
   *
   * @returns the head of the snake
   */
  getHead(): Position {
    return this.snake[0];
  }

  /**
   * Prints a snake!
   *
   * @returns the string representation of the snake
   */
  toString(): string {
    const arr: string[][] = [];
    for (let y = 0; y < this.gridSize; ++y) {
      const cur: string[] = [];
      for (let x = 0; x < this.gridSize; ++x) {
        cur.push("+");
      }
      arr.push(cur);
    }
    for (const { x, y } of this.snake) {
      arr[y][x] = "o";
    }
    arr[this.snake[0].y][this.snake[0].x] = "O";
    return arr.reduce((prev, current) => prev + current.join(" ") + "\n", "");
  }
}
