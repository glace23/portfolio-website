import { useState, useEffect, useRef, useCallback } from "react";
import {
  GRID_SIZE,
  CELL_SIZE,
  ALL_TIME_HIGH_SCORE_KEY,
  GAME_OVER,
  GAME_IN_PROCESS,
  SNAKE_OUT_OF_BOUNDS,
  SNAKE_COLLISION,
  initialState,
  NORMAL_MODE_MULTIPLIER,
  HARD_MODE_MULTIPLIER,
  MIN_SPEED,
} from "../constants.jsx";

import { getRandomFood } from "../food.jsx";

export function useSnakeGameLogic() {
  const [snakeDots, setSnakeDots] = useState(initialState.snakeDots);
  const [direction, setDirection] = useState(initialState.direction);
  const [food, setFood] = useState(initialState.food);
  const [color, setColor] = useState(initialState.color);
  const [route, setRoute] = useState(initialState.route);
  const [score, setScore] = useState(initialState.score);
  const [highScore, setHighScore] = useState(initialState.highScore);
  const [gameEndReason, setGameEndReason] = useState(
    initialState.gameEndReason
  );
  const [lightMode, setLightMode] = useState(initialState.lightMode ?? false);
  const [hardMode, setHardMode] = useState(initialState.hardMode ?? false);

  const tickRate = useRef(initialState.speed);
  const nextDirection = useRef(initialState.direction);
  const routeRef = useRef(route);
  const rafId = useRef(null);
  const lastUpdate = useRef(0);
  const allTimeHighScore = useRef(
    localStorage.getItem(ALL_TIME_HIGH_SCORE_KEY) || 0
  );
  const prevAllTimeHighScore = useRef(allTimeHighScore);
  const foodRef = useRef(food);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  const onSnakeOutOfBounds = (head) =>
    head[0] >= GRID_SIZE || head[1] >= GRID_SIZE || head[0] < 0 || head[1] < 0;

  const onSnakeCollapsed = (head, newDots) => {
    const body = [...newDots];
    body.pop();
    return body.some((dot) => dot[0] === head[0] && dot[1] === head[1]);
  };

  const increaseSnake = (newDots) => newDots.unshift([]);

  const increaseSpeed = useCallback(
    (length) => {
      const multiplier = hardMode
        ? HARD_MODE_MULTIPLIER
        : NORMAL_MODE_MULTIPLIER;
      if (tickRate.current > MIN_SPEED) {
        tickRate.current = Math.max(
          tickRate.current - Math.log10(length) * multiplier,
          MIN_SPEED
        );
      }
    },
    [hardMode]
  );

  const updateHighScore = useCallback(() => {
    prevAllTimeHighScore.current = allTimeHighScore.current;
    const newHighScore = Math.max(score, highScore);
    allTimeHighScore.current = Math.max(
      newHighScore,
      Number(allTimeHighScore.current || 0)
    );
    localStorage.setItem(ALL_TIME_HIGH_SCORE_KEY, allTimeHighScore.current);
    setHighScore(newHighScore);
  }, [score, highScore]);

  const endGame = useCallback(
    (prevDots) => {
      updateHighScore();
      setRoute(GAME_OVER);
      return prevDots;
    },
    [updateHighScore]
  );

  const onRouteChange = () => {
    setRoute(GAME_IN_PROCESS);
  };

  const resetGame = (newRoute = initialState.route) => {
    // Reset state
    setSnakeDots([...initialState.snakeDots]);
    setDirection(initialState.direction);
    setRoute(newRoute);
    setFood([...initialState.food]);
    setColor(initialState.color);
    setScore(initialState.score);
    setGameEndReason(initialState.gameEndReason);
    //setShowSettings(initialState.showSettings);
    tickRate.current =
      hardMode === false ? initialState.speed : initialState.hardSpeed;
    nextDirection.current = "RIGHT";
  };

  const restartGame = () => {
    resetGame(GAME_IN_PROCESS);
  };

  const toggleLightMode = (value) => {
    setLightMode(value);
    document.body.classList.toggle("light", value);
  };

  const toggleHardMode = (value) => {
    setHardMode(value);
    tickRate.current = value ? initialState.hardSpeed : initialState.speed;
  };

  // update route ref for game loop
  useEffect(() => {
    routeRef.current = route;
  }, [route]);

  const moveSnake = useCallback(() => {
    setSnakeDots((prevDots) => {
      const newDots = [...prevDots];
      const head = [...newDots[newDots.length - 1]];
      const dir = nextDirection.current;
      setDirection(dir);

      switch (dir) {
        case "LEFT":
          head[0] -= CELL_SIZE;
          break;
        case "RIGHT":
          head[0] += CELL_SIZE;
          break;
        case "UP":
          head[1] -= CELL_SIZE;
          break;
        case "DOWN":
          head[1] += CELL_SIZE;
          break;
        default:
          break;
      }

      newDots.push(head);
      newDots.shift();

      // collisions
      if (onSnakeOutOfBounds(head)) {
        setGameEndReason(SNAKE_OUT_OF_BOUNDS);
        return endGame(prevDots);
      }
      if (onSnakeCollapsed(head, newDots)) {
        setGameEndReason(SNAKE_COLLISION);
        return endGame(prevDots);
      }

      // eat food
      if (head[0] === food[0] && head[1] === food[1]) {
        const newFood = getRandomFood(newDots);
        setFood(newFood);
        foodRef.current = newFood;
        setScore((s) => s + 1);
        increaseSnake(newDots);
        increaseSpeed(newDots.length);
      }

      return newDots;
    });
  }, [food, endGame, increaseSpeed]);

  // main game loop
  useEffect(() => {
    const gameLoop = (timestamp) => {
      if (!lastUpdate.current) lastUpdate.current = timestamp;
      let elapsed = timestamp - lastUpdate.current;

      if (elapsed > tickRate.current && routeRef.current === GAME_IN_PROCESS) {
        moveSnake();
        elapsed -= tickRate.current;
        lastUpdate.current = timestamp;
      }

      rafId.current = requestAnimationFrame(gameLoop);
    };

    rafId.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafId.current);
  }, [route, snakeDots, moveSnake]);

  return {
    snakeDots,
    food,
    score,
    highScore,
    route,
    color,
    gameEndReason,
    lightMode,
    hardMode,
    setRoute,
    resetGame,
    restartGame,
    toggleLightMode,
    toggleHardMode,
    direction,
    nextDirection,
    allTimeHighScore,
    prevAllTimeHighScore,
    onRouteChange,
    routeRef,
  };
}
