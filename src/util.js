/* global chrome */
export const DEFAULT_GRIDSIZE = 16;
export const DEFAULT_SPEED = 100; // update speed in ms
export const DEFAULT_BACKGROUND_COLOR = "#357edd";
export const DEFAULT_SNAKE_COLOR = "#fff";
export const DEFAULT_SETTINGS = {
  gridSize: DEFAULT_GRIDSIZE,
  speed: DEFAULT_SPEED,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  checkWalls: true,
  snakeColor: DEFAULT_SNAKE_COLOR,
};
export const SPEED_OPTIONS = [
  ["Easy", 150],
  ["Beginner", 120],
  ["Medium", 100],
  ["Hard", 80],
  ["Expert", 60],
];
export const GRIDSIZE_OPTIONS = [
  ["Tiny", 8],
  ["Small", 12],
  ["Medium", 16],
  ["Large", 24],
  ["Massive", 32],
];
export const SNAKE_OPTIONS = [
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
export const BACKGROUND_OPTIONS = [
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
export async function saveData(key, value) {
  localStorage.setItem(key, value);
}
export async function getData(key) {
  return localStorage.getItem(key);
}
