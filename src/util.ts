export const DEFAULT_GRIDSIZE = 16;
export const DEFAULT_SPEED = 100; // update speed in ms
export const DEFAULT_BACKGROUND_COLOR = "#357edd";
export const DEFAULT_SNAKE_COLOR = "#fff";

export type GameSettings = {
  gridSize: number;
  speed: number;
  backgroundColor: string;
  checkWalls: boolean;
  snakeColor: string;
};

export const DEFAULT_SETTINGS: GameSettings = {
  gridSize: DEFAULT_GRIDSIZE,
  speed: DEFAULT_SPEED,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  checkWalls: true,
  snakeColor: DEFAULT_SNAKE_COLOR,
};

export type SpeedOption = [string, number];
export const SPEED_OPTIONS: SpeedOption[] = [
  ["Easy", 150],
  ["Beginner", 120],
  ["Medium", 100],
  ["Hard", 80],
  ["Expert", 60],
];

export type GridSizeOption = [string, number];
export const GRIDSIZE_OPTIONS: GridSizeOption[] = [
  ["Tiny", 8],
  ["Small", 12],
  ["Medium", 16],
  ["Large", 24],
  ["Massive", 32],
];

export type SnakeOption = [string, string];
export const SNAKE_OPTIONS: SnakeOption[] = [
  ["White", "#fff"],
  ["Black", "#111"],
  ["Yellow", "#ffd700"],
  ["Gold", "#ffb700"],
  ["Orange", "#ff6300"],
  ["Red", "#ff725c"],
  ["Pink", "#D5008f"],
  ["Purple", "#5e2ca5"],
  ["Blue", "#00449e"],
  ["Green", "#19a974"],
];

export type BackgroundOption = [string, string];
export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  ["White", "#fff"],
  ["Black", "#111"],
  ["Blue", "#357edd"],
  ["Navy", "#001b44"],
  ["Purple", "#a463f2"],
  ["Light Blue", "#cdecff"],
  ["Light Green", "#9eebcf"],
  ["Yellow", "#fbf1a9"],
  ["Pink", "#ffdfdf"],
  ["Gray", "#eee"],
];

export function saveData(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function getData(key: string): string | null {
  return localStorage.getItem(key);
}
