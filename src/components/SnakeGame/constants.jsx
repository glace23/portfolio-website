import { getRandomFood } from "./food.jsx";

// Size of the game grid (in % or logical units)
export const GRID_SIZE = 100; // 100x100 grid, matches 0–100% coordinates

// Size of each snake cell (percentage of the grid)
export const CELL_SIZE = 2; // each cell is 2% of the grid

// Size of the food (percentage of the grid)
export const FOOD_SIZE = CELL_SIZE - 0.25; // slightly smaller than a cell to fit nicely

// Initial speed (in milliseconds per tick)
export const INITIAL_SPEED = 100;

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

// Menus
export const SETTINGS_MENU_TIMEOUT = 5000;

export const initialState = {
  food: [
    Math.floor(Math.random() * (GRID_SIZE / CELL_SIZE)) * CELL_SIZE,
    Math.floor(Math.random() * (GRID_SIZE / CELL_SIZE)) * CELL_SIZE,
  ],
  direction: "RIGHT",
  speed: INITIAL_SPEED,
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
