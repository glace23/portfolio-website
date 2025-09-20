// Size of the game grid (in % or logical units)
export const GRID_SIZE = 100; // 100x100 grid, matches 0–100% coordinates

// Size of each snake cell (percentage of the grid)
export const CELL_SIZE = 2; // each cell is 2% of the grid

// Size of the food (percentage of the grid)
export const ITEM_SIZE = CELL_SIZE - 0.25; // slightly smaller than a cell to fit nicely

// Initial speed (in milliseconds per tick)
export const INITIAL_SPEED = 100;
export const HARD_INITIAL_SPEED = 50;

// Initial Length
export const INITIAL_LENGTH = 2;

// Local storage key for high scores
export const ALL_TIME_HIGH_SCORE_KEY = "allTimeHighScore";

// Utility for Game Routes
export const GAME_OVER = "end";
export const GAME_MENU = "menu";
export const GAME_IN_PROCESS = "game";
export const GAME_PAUSED = "pause";

// Game Ending Reasons
export const GAME_NOT_ENDED = 0;
export const SNAKE_OUT_OF_BOUNDS = 1;
export const SNAKE_COLLISION = 2;

// Game Difficulty
export const NORMAL_MODE_SPEED_MULTIPLIER = 1;
export const HARD_MODE_SPEED_MULTIPLIER = 2;

export const NORMAL_MODE_POWER_UP_MULTIPLIER = 200;
export const HARD_MODE_POWER_UP_MULTIPLIER = 0.2;

// Power up expire time
export const NORMAL_MODE_POWER_UP_EXPIRE_TIME = 200;
export const HARD_MODE_POWER_UP_EXPIRE_TIME = 100;

// Min Speed
export const MIN_SPEED = 10;

// Menus
export const SETTINGS_MENU_TIMEOUT = 5000;

// PowerUp Types
export const INCREASE_SPEED_POWER_UP = 0;
export const DECREASE_SPEED_POWER_UP = 1;
export const INCREASE_LENGTH_POWER_UP = 2;
export const DECREASE_LENGTH_POWER_UP = 3;
export const GAIN_SCORE_POWER_UP = 4;
export const POWER_UP_LIST = [
  INCREASE_SPEED_POWER_UP,
  DECREASE_SPEED_POWER_UP,
  GAIN_SCORE_POWER_UP,
];

// PowerUp Effect Values
export const GAIN_SCORE_POWER_UP_AMOUNT = 3;
export const INCREASE_SPEED_POWER_UP_AMOUNT = 5;
export const DECREASE_SPEED_POWER_UP_AMOUNT = 5;

export const initialState = {
  food: [
    Math.floor(Math.random() * (GRID_SIZE / CELL_SIZE)) * CELL_SIZE,
    Math.floor(Math.random() * (GRID_SIZE / CELL_SIZE)) * CELL_SIZE,
  ],
  direction: "RIGHT",
  speed: INITIAL_SPEED,
  hardSpeed: HARD_INITIAL_SPEED,
  hardMode: false,
  route: "menu",
  snakeDots: Array.from({ length: INITIAL_LENGTH }, (_, i) => [
    GRID_SIZE / 2 + i * 2,
    GRID_SIZE / 2,
  ]),
  score: 0,
  highScore: 0,
  color: "R",
  gameEndReason: GAME_NOT_ENDED,
  showPopup: true,
  lightMode: false,
  showSettings: null,
  powerUp: [],
  powerUpMode: true,
  gridLinesMode: true,
};

export const colorList = [
  "red",
  "green",
  "blue",
  "yellow",
  "cyan",
  "violet",
  "orange",
];
