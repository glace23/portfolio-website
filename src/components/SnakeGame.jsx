import React, { Component, useState, useEffect, useRef } from "react";
import styles from "../css/SnakeGame.module.css";
import StartMenu from "./SnakeGame/startMenu.jsx";
import { Food, getRandomFood } from "./SnakeGame/food.jsx";
import Snake from "./SnakeGame/snake.jsx";
import Pause from "./SnakeGame/pauseMenu.jsx";
import GameOverMenu from "./SnakeGame/gameOverMenu.jsx";
import ScoreBoard from "./SnakeGame/scoreboard.jsx";
import WelcomeMenu from "./SnakeGame/welcomeMenu.jsx";
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
  const [showPopup, setShowPopup] = useState(true);
  const nextDirection = useRef(initialState.direction);
  const tickRate = useRef(initialState.speed);
  const lastUpdate = useRef(0);
  const rafId = useRef(null);
  const routeRef = useRef(route);
  const allTimeHighScore = useRef(
    localStorage.getItem(ALL_TIME_HIGH_SCORE_KEY) || 0
  );
  const prevAllTimeHighScore = useRef(allTimeHighScore);

  useEffect(() => {
    const onKeyDown = (e) => {
      e.preventDefault();
      e = e || window.event;

      const curRoute = routeRef.current;

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
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [direction]);

  useEffect(() => {
    const gameLoop = (timestamp) => {
      if (!lastUpdate.current) lastUpdate.current = timestamp;
      let elapsed = timestamp - lastUpdate.current;

      if (elapsed > tickRate.current && route === GAME_IN_PROCESS) {
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
    console.log(route);
  }, [route]);

  const moveSnake = () => {
    setSnakeDots((prevDots) => {
      const newDots = [...prevDots];
      const head = [...newDots[newDots.length - 1]];
      const dir = nextDirection.current;

      setDirection(dir);

      switch (dir) {
        case "LEFT":
          head[0] -= 2;
          break;
        case "RIGHT":
          head[0] += 2;
          break;
        case "UP":
          head[1] -= 2;
          break;
        case "DOWN":
          head[1] += 2;
          break;
      }

      // Push new head to snake body
      newDots.push(head);
      newDots.shift();

      // Collisions
      if (route === GAME_IN_PROCESS && onSnakeOutOfBounds(head)) {
        setGameEndReason(SNAKE_OUT_OF_BOUNDS);
        gameOver();
        return prevDots; // return unchanged snake -> stays at border
      }
      if (route === GAME_IN_PROCESS && onSnakeCollapsed(head, newDots)) {
        setGameEndReason(SNAKE_COLLISION);
        gameOver();
        return prevDots; // return unchanged snake -> stays at border
      }

      // Eating food
      if (head[0] == food[0] && head[1] == food[1]) {
        setFood(getRandomFood());
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
    if (tickRate.current > 10) {
      console.log(tickRate.current, Math.log10(length).toFixed(2));
      tickRate.current = tickRate.current - Math.log10(length).toFixed(2);
    }
  };

  const onRouteChange = () => {
    setRoute(GAME_IN_PROCESS);
  };

  const handleStart = () => {
    setShowPopup(false); // hide popup
    // initialize or start your game here
  };

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
    tickRate.current = initialState.speed;
    nextDirection.current = "RIGHT";
  };

  const restartGame = () => {
    resetGame(GAME_IN_PROCESS);
  };

  // onDown = () => {
  //   let dots = [...this.state.snakeDots];
  //   let head = dots[dots.length - 1];

  //   head = [head[0], head[1] + 2];
  //   dots.push(head);
  //   dots.shift();
  //   this.setState({
  //     direction: "DOWN",
  //     snakeDots: dots,
  //   });
  // };

  // onUp = () => {
  //   let dots = [...this.state.snakeDots];
  //   let head = dots[dots.length - 1];

  //   head = [head[0], head[1] - 2];
  //   dots.push(head);
  //   dots.shift();
  //   this.setState({
  //     direction: "UP",
  //     snakeDots: dots,
  //   });
  // };

  // onRight = () => {
  //   let dots = [...this.state.snakeDots];
  //   let head = dots[dots.length - 1];

  //   head = [head[0] + 2, head[1]];
  //   dots.push(head);
  //   dots.shift();
  //   this.setState({
  //     direction: "RIGHT",
  //     snakeDots: dots,
  //   });
  // };

  // onLeft = () => {
  //   let dots = [...this.state.snakeDots];
  //   let head = dots[dots.length - 1];

  //   head = [head[0] - 2, head[1]];
  //   dots.push(head);
  //   dots.shift();
  //   this.setState({
  //     direction: "LEFT",
  //     snakeDots: dots,
  //   });
  // };

  // render() {
  //   const { route, snakeDots, food, color } = this.state;

  return (
    <div>
      <ScoreBoard
        score={score}
        highScore={highScore}
        allTimeHighScore={allTimeHighScore.current}
      />
      <div className={styles.gameArea}>
        {showPopup === true && <WelcomeMenu onStart={handleStart} />}
        {route === GAME_PAUSED && (
          <div>
            <Pause
              onRouteChange={onRouteChange}
              route={route}
              restartGame={restartGame}
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
            />
          </div>
        )}
        {route === GAME_MENU && (
          <div>
            <StartMenu onRouteChange={onRouteChange} />
          </div>
        )}
        {(route === GAME_IN_PROCESS ||
          route === GAME_OVER ||
          route === GAME_PAUSED) && (
          <div>
            <Snake snakeDots={snakeDots} color={color} route={route} />
            <Food dot={food} cellSize={CELL_SIZE} foodSize={FOOD_SIZE} />
          </div>
        )}
      </div>
    </div>
  );
}
