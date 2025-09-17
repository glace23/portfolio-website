import React, { Component, useState, useEffect, useRef } from "react";
import style from "../css/SnakeGame.module.css";
import Menu from "./SnakeGame/menu.jsx";
import { Food, getRandomFood } from "./SnakeGame/food.jsx";
import Snake from "./SnakeGame/snake.jsx";
import Pause from "./SnakeGame/pause.jsx";
import {
  GRID_SIZE,
  CELL_SIZE,
  FOOD_SIZE,
  ALL_TIME_HIGH_SCORE_KEY,
  initialState,
  colorList,
} from "./SnakeGame/constants.jsx";

//let style = require("../css/SnakeGame.module.css");

// type MyProps = {};
// type MyState = any;
export default function SnakeGame() {
  // constructor() {
  //   super();
  //   this.state = initialState;
  //   this.nextDirection = this.state.direction;

  //   // Request Animation Frame Tick Rate Update
  //   this.lastUpdate = 0;
  //   this.tickRate = this.state.speed;
  // }

  // componentDidMount() {
  //   document.onkeydown = this.onKeyDown;
  //   this.rafId = requestAnimationFrame(this.gameLoop);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   this.onSnakeOutOfBounds();
  //   this.onSnakeCollapsed();
  //   this.onSnakeEats();
  // }

  // componentWillUnmount() {
  //   cancelAnimationFrame(this.rafId);
  // }
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

  useEffect(() => {
    const onKeyDown = (e) => {
      e.preventDefault();
      e = e || window.event;

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
          setRoute((prev) => (prev === "game" ? "pause" : "game"));
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

      if (elapsed > tickRate.current && route === "game") {
        moveSnake();
        elapsed -= tickRate.current;
        lastUpdate.current = timestamp;
      }

      rafId.current = requestAnimationFrame(gameLoop);
    };

    rafId.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafId.current);
  }, [route, snakeDots]); // rerun if route or snakeDots change

  // gameLoop = (timestamp) => {
  //   if (!this.lastUpdate) {
  //     this.lastUpdate = timestamp;
  //   }
  //   let elapsed = timestamp - this.lastUpdate;

  //   if (elapsed > this.tickRate) {
  //     if (this.state.route === "game") {
  //       this.moveSnake();
  //       elapsed -= this.tickRate;
  //       this.lastUpdate = timestamp;
  //     }
  //   }

  //   this.rafId = requestAnimationFrame(this.gameLoop);
  // };

  // moveSnake = () => {
  //   let body = [...this.state.snakeDots];
  //   let head = body[body.length - 1];
  //   if (this.state.route === "game") {
  //     this.setState({ direction: this.nextDirection });
  //     switch (this.state.direction) {
  //       case "LEFT":
  //         head = [head[0] - 2, head[1]];
  //         break;
  //       case "RIGHT":
  //         head = [head[0] + 2, head[1]];
  //         break;
  //       case "UP":
  //         head = [head[0], head[1] - 2];
  //         break;
  //       case "DOWN":
  //         head = [head[0], head[1] + 2];
  //         break;
  //     }
  //     body.push(head);
  //     body.shift();
  //     this.setState({ snakeDots: body })
  //   }
  // };
  const moveSnake = () => {
    setSnakeDots((prevDots) => {
      const newDots = [...prevDots];
      console.log(newDots);
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

      newDots.push(head);
      newDots.shift();

      // Collisions
      if (
        route === "game" &&
        (onSnakeOutOfBounds(head) || onSnakeCollapsed(head, newDots))
      ) {
        gameOver();
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
      // console.log(
      //   tickRate.current,
      //   Math.log10(this.state.snakeDots.length).toFixed(2)
      // );
      tickRate.current = tickRate.current - Math.log10(length).toFixed(2);
    }
  };

  const onRouteChange = () => {
    if (route === "menu" || route === "pause") setRoute("game");
  };

  const gameOver = () => {
    var newHighScore = Math.max(score, highScore);

    localStorage.setItem(
      ALL_TIME_HIGH_SCORE_KEY,
      Math.max(newHighScore, localStorage.getItem(ALL_TIME_HIGH_SCORE_KEY) || 0)
    );

    alert(
      `GAME OVER, your score is ${score}, high score is ${newHighScore}, all time high score is ${localStorage.getItem(
        ALL_TIME_HIGH_SCORE_KEY
      )}`
    );

    // Reset state
    setSnakeDots(initialState.snakeDots);
    setDirection(initialState.direction);
    setRoute("menu");
    setFood(initialState.food);
    setColor(initialState.color);
    setHighScore(newHighScore);
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
        {/* // <div className={style.gridLines}> */}
        {route === "pause" ? (
          <div>
            <Pause onRouteChange={onRouteChange} />
          </div>
        ) : (
          ""
        )}
        {route === "menu" ? (
          <div>
            <Menu onRouteChange={onRouteChange} />
          </div>
        ) : (
          <div>
            <Snake snakeDots={snakeDots} color={color} />
            <Food dot={food} cellSize={CELL_SIZE} foodSize={FOOD_SIZE} />
          </div>
        )}
      </div>
    </div>
  );
}
