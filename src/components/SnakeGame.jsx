import React, { Component, useState, useEffect, useRef } from "react";
// import styles from "../css/SnakeGame.module.css";
import "../css/SnakeGame.css";
import StartMenu from "./SnakeGame/startMenu.jsx";
import { Food, getRandomFood } from "./SnakeGame/food.jsx";
import Snake from "./SnakeGame/snake.jsx";
import Pause from "./SnakeGame/pauseMenu.jsx";
import GameOverMenu from "./SnakeGame/gameOverMenu.jsx";
import ScoreBoard from "./SnakeGame/scoreboard.jsx";
import WelcomeMenu from "./SnakeGame/welcomeMenu.jsx";
import SettingsMenu from "./SnakeGame/settingsMenu.jsx";
import {
  GRID_SIZE,
  CELL_SIZE,
  FOOD_SIZE,
  ALL_TIME_HIGH_SCORE_KEY,
  GAME_OVER,
  GAME_MENU,
  GAME_IN_PROCESS,
  GAME_PAUSED,
  SNAKE_OUT_OF_BOUNDS,
  SNAKE_COLLISION,
  initialState,
  colorList,
  SETTINGS_MENU_TIMEOUT,
  NORMAL_MODE_MULTIPLIER,
  HARD_MODE_MULTIPLIER,
  MIN_SPEED,
} from "./SnakeGame/constants.jsx";

//let styles = require("../css/SnakeGame.module.css");

// type MyProps = {};
// type MyState = any;
export default function SnakeGame() {
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
  const [showPopup, setShowPopup] = useState(initialState.showPopup);
  const [lightMode, setLightMode] = useState(initialState.lightmode ?? false);
  const [hardMode, setHardMode] = useState(initialState.hardMode ?? false);
  const [showSettings, setShowSettings] = useState(initialState.showSettings);

  const nextDirection = useRef(initialState.direction);
  const tickRate = useRef(initialState.speed);
  const lastUpdate = useRef(0);
  const rafId = useRef(null);
  const routeRef = useRef(route);
  const allTimeHighScore = useRef(
    localStorage.getItem(ALL_TIME_HIGH_SCORE_KEY) || 0
  );
  const prevAllTimeHighScore = useRef(allTimeHighScore);
  const timeoutRef = useRef(null);
  const showPopupRef = useRef(showPopup);

  useEffect(() => {
    const onKeyDown = (e) => {
      e.preventDefault();
      e = e || window.event;

      const curRoute = routeRef.current;
      const curShowPopup = showPopupRef.current;

      switch (e.key) {
        case "ArrowLeft":
        case "A":
        case "a":
          if (direction !== "RIGHT") nextDirection.current = "LEFT";
          break;
        case "ArrowDown":
        case "S":
        case "s":
          if (direction !== "UP") nextDirection.current = "DOWN";
          break;
        case "ArrowUp":
        case "W":
        case "w":
          if (direction !== "DOWN") nextDirection.current = "UP";
          break;
        case "ArrowRight":
        case "D":
        case "d":
          if (direction !== "LEFT") nextDirection.current = "RIGHT";
          break;
        case "P":
        case "p":
          // setRoute((prev) =>
          //   prev === GAME_IN_PROCESS ? GAME_PAUSED : GAME_IN_PROCESS
          // );
          if (curRoute === GAME_IN_PROCESS) {
            setRoute(GAME_PAUSED);
          } else if (curRoute === GAME_PAUSED) {
            setRoute(GAME_IN_PROCESS);
          }
          break;
        case "R":
        case "r":
          if (curRoute === GAME_OVER || curRoute === GAME_PAUSED) {
            setRoute(GAME_MENU);
            restartGame();
          }
          break;
        case "1":
          if (curShowPopup === false) {
            setShowSettings((prev) => !prev);
          }
          break;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [direction]);

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
  }, [route, snakeDots]); // rerun if route or snakeDots change

  useEffect(() => {
    routeRef.current = route;
  }, [route]);

  useEffect(() => {
    showPopupRef.current = showPopup;
  }, [showPopup]);

  useEffect(() => {
    console.log(lightMode);
  }, [lightMode]);

  const moveSnake = () => {
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
      }

      // Push new head to snake body
      newDots.push(head);
      newDots.shift();

      // Collisions
      if (routeRef.current === GAME_IN_PROCESS && onSnakeOutOfBounds(head)) {
        setGameEndReason(SNAKE_OUT_OF_BOUNDS);
        gameOver();
        return prevDots; // return unchanged snake -> stays at border
      }
      if (
        routeRef.current === GAME_IN_PROCESS &&
        onSnakeCollapsed(head, newDots)
      ) {
        setGameEndReason(SNAKE_COLLISION);
        gameOver();
        return prevDots; // return unchanged snake -> stays at border
      }

      // Eating food
      if (head[0] === food[0] && head[1] === food[1]) {
        console.log("eat food");
        setFood(getRandomFood(newDots));
        setScore(score + 1);
        increaseSnake(newDots);
        increaseSpeed(newDots.length);
        //changeColor();
      }

      return newDots;
    });
  };

  const onSnakeOutOfBounds = (head) => {
    return (
      head[0] >= GRID_SIZE || head[1] >= GRID_SIZE || head[0] < 0 || head[1] < 0
    );
  };

  const onSnakeCollapsed = (head, newDots) => {
    var body = [...newDots];
    body.pop();
    return body.some((dot) => dot[0] === head[0] && dot[1] === head[1]);
  };

  const changeColor = () => {
    setColor(colorList[(food[0] + food[1]) % colorList.length]);
  };

  const increaseSnake = (newDots) => {
    newDots.unshift([]);
  };

  const increaseSpeed = (length) => {
    const multiplier =
      hardMode === false ? NORMAL_MODE_MULTIPLIER : HARD_MODE_MULTIPLIER;
    if (tickRate.current > MIN_SPEED) {
      console.log(tickRate.current, Math.log10(length).toFixed(2), multiplier);
      tickRate.current = Math.max(
        tickRate.current - Math.log10(length).toFixed(2) * multiplier,
        MIN_SPEED
      );
    }
  };

  const onRouteChange = () => {
    setRoute(GAME_IN_PROCESS);
  };

  const handleStart = () => {
    setShowPopup(false); // hide popup
    // initialize or start your game here
  };

  const handleLightModeToggle = (value) => {
    setLightMode(value); // update parent state
    document.body.classList.toggle("light", value);
  };

  const handleHardModeToggle = (value) => {
    console.log("Hard Toggle is now:", value);
    setHardMode(value); // update parent state
    if (value === true) {
      tickRate.current = initialState.hardSpeed;
    } else {
      tickRate.current = initialState.speed;
    }
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  // Reset hide timer whenever user interacts with settings
  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setShowSettings(false),
      SETTINGS_MENU_TIMEOUT
    ); // 5 seconds
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Only show settings when active
  useEffect(() => {
    if (showSettings) resetTimer();
  }, [showSettings]);

  const updateHighScore = () => {
    var newHighScore = Math.max(score, highScore);
    prevAllTimeHighScore.current = allTimeHighScore.current;
    allTimeHighScore.current = Math.max(newHighScore, allTimeHighScore.current);
    localStorage.setItem(ALL_TIME_HIGH_SCORE_KEY, allTimeHighScore.current);
    setHighScore(newHighScore);

    return { newHighScore: newHighScore, newAllTime: allTimeHighScore.current };
  };

  const gameOver = () => {
    const { newHighScore, newAllTime } = updateHighScore();

    // Change Route
    setRoute(GAME_OVER);
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
    setShowSettings(initialState.showSettings);
    tickRate.current =
      hardMode === false ? initialState.speed : initialState.hardSpeed;
    nextDirection.current = "RIGHT";
  };

  const restartGame = () => {
    resetGame(GAME_IN_PROCESS);
  };

  console.log(
    showSettings,
    showPopupRef,
    showPopupRef.current === false &&
      (showSettings === true || showSettings === false)
  );
  return (
    <div>
      {showPopup === true && <WelcomeMenu onStart={handleStart} />}
      <ScoreBoard
        score={score}
        highScore={highScore}
        allTimeHighScore={allTimeHighScore.current}
      />
      {showPopupRef.current === false &&
        (showSettings === true || showSettings === false) && (
          <SettingsMenu
            handleLightModeToggle={handleLightModeToggle}
            lightMode={lightMode}
            handleHardModeToggle={handleHardModeToggle}
            hardMode={hardMode}
            route={route}
            onMouseMove={resetTimer} // Reset timer if user moves mouse
            onKeyDown={resetTimer}
            showSettings={showSettings}
          />
        )}
      <div
        className="gameArea"
        // className={[
        //   styles.gameArea,
        //   // lightMode === true ? styles.light : "",
        // ].join(" ")}
      >
        {route === GAME_PAUSED && (
          <div>
            <Pause
              onRouteChange={onRouteChange}
              route={route}
              restartGame={restartGame}
              resetGame={resetGame}
              showSettings={showSettings}
              toggleSettings={toggleSettings}
            />
          </div>
        )}
        {route === GAME_OVER && (
          <div>
            <GameOverMenu
              resetGame={resetGame}
              restartGame={restartGame}
              route={route}
              gameEndReason={gameEndReason}
              score={score}
              highScore={highScore}
              allTimeHighScore={prevAllTimeHighScore.current}
              showSettings={showSettings}
              toggleSettings={toggleSettings}
            />
          </div>
        )}
        {route === GAME_MENU && (
          <div>
            <StartMenu
              onRouteChange={onRouteChange}
              showSettings={showSettings}
              toggleSettings={toggleSettings}
            />
          </div>
        )}
        {(route === GAME_IN_PROCESS ||
          route === GAME_OVER ||
          route === GAME_PAUSED) && (
          <div>
            <Snake
              snakeDots={snakeDots}
              color={color}
              route={route}
              lightMode={lightMode}
            />
            <Food
              dot={food}
              cellSize={CELL_SIZE}
              foodSize={FOOD_SIZE}
              lightMode={lightMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}
