import React, { Component, useState, useEffect, useRef } from "react";
import style from "../css/SnakeGame.module.css";
import Menu from "./SnakeGame/menu.jsx";
import { Food, getRandomFood } from "./SnakeGame/food.jsx";
import Snake from "./SnakeGame/snake.jsx";
import Pause from "./SnakeGame/pause.jsx";
import GameOverMenu from "./SnakeGame/gameOverMenu.jsx";
import {
  GRID_SIZE,
  CELL_SIZE,
  FOOD_SIZE,
  ALL_TIME_HIGH_SCORE_KEY,
  initialState,
  colorList,
  GAME_OVER,
  GAME_MENU,
  GAME_IN_PROCESS,
  GAME_PAUSED,
} from "./SnakeGame/constants.jsx";

//let style = require("../css/SnakeGame.module.css");

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
  const nextDirection = useRef(initialState.direction);
  const tickRate = useRef(initialState.speed);
  const lastUpdate = useRef(0);
  const rafId = useRef(null);
  const routeRef = useRef(route);

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
            resetGame();
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
      if (
        route === GAME_IN_PROCESS &&
        (onSnakeOutOfBounds(head) || onSnakeCollapsed(head, newDots))
      ) {
        gameOver();
        return prevDots; // return unchanged snake -> stays at border
      }

      // Eating food
      if (head[0] == food[0] && head[1] == food[1]) {
        setFood(getRandomFood());
        setScore(score + 1);
        increaseSnake(newDots);
        increaseSpeed(newDots.length);
        changeColor();
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
    body.forEach((dot) => {
      return dot[0] == head[0] && dot[1] == head[1];
    });
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
    //if (route === GAME_MENU || route === GAME_PAUSED)
    setRoute(GAME_IN_PROCESS);
  };

  const updateHighScore = () => {
    var newHighScore = Math.max(score, highScore);
    var newAllTime = localStorage.getItem(ALL_TIME_HIGH_SCORE_KEY) || 0;
    localStorage.setItem(
      ALL_TIME_HIGH_SCORE_KEY,
      Math.max(newHighScore, newAllTime)
    );
    setHighScore(newHighScore);
    return { newHighScore: newHighScore, newAllTime: newAllTime };
  };

  const gameOver = () => {
    const { newHighScore, newAllTime } = updateHighScore();

    // Change Route
    setRoute(GAME_OVER);
  };

  const resetGame = () => {
    // Reset state
    setSnakeDots(initialState.snakeDots);
    setDirection(initialState.direction);
    setRoute(initialState.route);
    setFood(initialState.food);
    setColor(initialState.color);
    setScore(initialState.score);
    tickRate.current = initialState.speed;
    nextDirection.current = "RIGHT";
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
      <p className={style.scoreboard}>
        Score: {score}, HighScore: {highScore}, All Time:{" "}
        {localStorage.getItem(ALL_TIME_HIGH_SCORE_KEY) || 0}
      </p>
      <div className={style.gameArea}>
        {route === GAME_PAUSED && (
          <div>
            <Pause
              onRouteChange={onRouteChange}
              route={route}
              resetGame={resetGame}
            />
          </div>
        )}
        {route === GAME_OVER && (
          <div>
            <GameOverMenu resetGame={resetGame} route={route} />
          </div>
        )}
        {route === GAME_MENU && (
          <div>
            <Menu onRouteChange={onRouteChange} />
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
