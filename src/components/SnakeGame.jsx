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
export default class SnakeGame extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.nextDirection = this.state.direction;

    // Request Animation Frame Tick Rate Update
    this.lastUpdate = 0;
    this.tickRate = this.state.speed;
  }

  componentDidMount() {
    document.onkeydown = this.onKeyDown;
    this.rafId = requestAnimationFrame(this.gameLoop);
  }

  componentDidUpdate(prevProps, prevState) {
    this.onSnakeOutOfBounds();
    this.onSnakeCollapsed();
    this.onSnakeEats();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
  }

  onKeyDown = (e) => {
    e.preventDefault();
    e = e || window.event;

    switch (e.key) {
      case "ArrowLeft":
      case "A":
      case "a":
        if (this.state.direction !== "RIGHT") this.nextDirection = "LEFT";
        break;
      case "ArrowDown":
      case "S":
      case "s":
        if (this.state.direction !== "UP") this.nextDirection = "DOWN";
        break;
      case "ArrowUp":
      case "W":
      case "w":
        if (this.state.direction !== "DOWN") this.nextDirection = "UP";
        break;
      case "ArrowRight":
      case "D":
      case "d":
        if (this.state.direction !== "LEFT") this.nextDirection = "RIGHT";
        break;
      case "P":
      case "p":
        this.setState({
          route: this.state.route === "game" ? "pause" : "game",
        });
        break;
    }
  };

  gameLoop = (timestamp) => {
    if (!this.lastUpdate) {
      this.lastUpdate = timestamp;
    }
    let elapsed = timestamp - this.lastUpdate;

    if (elapsed > this.tickRate) {
      if (this.state.route === "game") {
        this.moveSnake();
        elapsed -= this.tickRate;
        this.lastUpdate = timestamp;
      }
    }

    this.rafId = requestAnimationFrame(this.gameLoop);
  };

  moveSnake = () => {
    let body = [...this.state.snakeDots];
    let head = body[body.length - 1];
    if (this.state.route === "game") {
      this.setState({ direction: this.nextDirection });
      switch (this.state.direction) {
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
      }
      body.push(head);
      body.shift();
      this.setState({ snakeDots: body });
    }
  };

  onSnakeOutOfBounds() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (this.state.route === "game") {
      if (
        head[0] >= GRID_SIZE ||
        head[1] >= GRID_SIZE ||
        head[0] < 0 ||
        head[1] < 0
      ) {
        this.gameOver();
      }
    }
  }

  onSnakeCollapsed() {
    let body = [...this.state.snakeDots];
    let head = body[body.length - 1];

    body.pop();
    body.forEach((dot) => {
      if (dot[0] == head[0] && dot[1] == head[1]) {
        this.gameOver();
      }
    });
  }

  onSnakeEats() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomFood(),
        score: this.state.score + 1,
      });
      this.increaseSnake();
      this.increaseSpeed();
      this.changeColor();
    }
  }

  changeColor() {
    this.setState({
      color:
        colorList[(this.state.food[0] + this.state.food[1]) % colorList.length],
    });
  }

  increaseSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.tickRate > 10) {
      // console.log(
      //   this.tickRate,
      //   Math.log10(this.state.snakeDots.length).toFixed(2)
      // );
      this.tickRate =
        this.tickRate - Math.log10(this.state.snakeDots.length).toFixed(2);
    }
  }

  onRouteChange = () => {
    if (this.state.route === "menu") {
      this.setState({
        route: "game",
      });
    }
    if (this.state.route === "pause") {
      this.setState({
        route: "game",
      });
    }
  };

  gameOver() {
    var newHighScore = Math.max(this.state.score, this.state.highScore);

    localStorage.setItem(
      ALL_TIME_HIGH_SCORE_KEY,
      Math.max(newHighScore, localStorage.getItem(ALL_TIME_HIGH_SCORE_KEY) || 0)
    );

    alert(
      `GAME OVER, your score is ${
        this.state.score
      }, high score is ${newHighScore}, all time high score is ${localStorage.getItem(
        ALL_TIME_HIGH_SCORE_KEY
      )}`
    );

    this.setState({ ...initialState, highScore: newHighScore });

    // reset next direction
    this.nextDirection = "RIGHT";
    // reset tick rate
    this.tickRate = initialState.speed;
  }

  onDown = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] + 2];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "DOWN",
      snakeDots: dots,
    });
  };

  onUp = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] - 2];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "UP",
      snakeDots: dots,
    });
  };

  onRight = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] + 2, head[1]];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "RIGHT",
      snakeDots: dots,
    });
  };

  onLeft = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    head = [head[0] - 2, head[1]];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "LEFT",
      snakeDots: dots,
    });
  };

  render() {
    const { route, snakeDots, food, color } = this.state;

    return (
      <div>
        <p className={style.scoreboard}>
          Score: {this.state.score}, HighScore: {this.state.highScore}, All
          Time: {localStorage.getItem(ALL_TIME_HIGH_SCORE_KEY) || 0}
        </p>
        <div className={style.gameArea}>
          {/* // <div className={style.gridLines}> */}
          {route === "pause" ? (
            <div>
              <Pause onRouteChange={this.onRouteChange} />
            </div>
          ) : (
            ""
          )}
          {route === "menu" ? (
            <div>
              <Menu onRouteChange={this.onRouteChange} />
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
}

// export default SnakeGame;
