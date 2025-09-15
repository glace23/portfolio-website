import React, { Component } from "react";
import style from "../css/SnakeGame.module.css";
import Menu from "./menu.jsx";
import Food from "./food.jsx";
import Snake from "./snake.jsx";

//let style = require("../css/SnakeGame.module.css");

export const All_TIME_HIGH_SCORE_KEY = "all-time-high-score";
//const GRID_SIZE = 20;

const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

if (localStorage.getItem(All_TIME_HIGH_SCORE_KEY) === null) {
  localStorage.setItem(All_TIME_HIGH_SCORE_KEY, "0");
  console.log("get alltime highscore 1");
}

const initialState = {
  food: getRandomFood(),
  direction: "RIGHT",
  speed: 100,
  route: "menu",
  defaultLength: 3,
  snakeDots: [
    [0, 0], // Tail
    [0, 2], // Head
  ],
  score: 0,
  highScore: 0,
};

// type MyProps = {};
// type MyState = any;
class SnakeGame extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.speed !== this.state.speed) {
      //console.log("speed: ", this.state.speed);
      clearInterval(this.interval);
      this.interval = setInterval(this.moveSnake, this.state.speed);
    }
    this.onSnakeOutOfBounds();
    this.onSnakeCollapsed();
    this.onSnakeEats();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onKeyDown = (e) => {
    e.preventDefault();
    e = e || window.event;

    switch (e.key) {
      case "ArrowLeft":
      case "A":
        if (this.state.direction !== "RIGHT")
          this.setState({ direction: "LEFT" });
        break;
      case "ArrowDown":
      case "S":
        if (this.state.direction !== "UP") this.setState({ direction: "DOWN" });
        break;
      case "ArrowUp":
      case "W":
        if (this.state.direction !== "DOWN") this.setState({ direction: "UP" });
        break;
      case "ArrowRight":
      case "D":
        if (this.state.direction !== "LEFT")
          this.setState({ direction: "RIGHT" });
        break;
    }
  };

  moveSnake = () => {
    let body = [...this.state.snakeDots];
    let head = body[body.length - 1];
    if (this.state.route === "game") {
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
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        this.gameOver();
      }
    }
  }

  onSnakeCollapsed() {
    let body = [...this.state.snakeDots];
    let head = body[body.length - 1];

    // for (let i = 0; i < body.legth - 1; i++) {
    //   if (body[i][0] == head[0] && body[i][1] == head[1]) {
    //     this.gameOver();
    //   }
    // }
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
      });
      this.increaseSnake();
      this.increaseSpeed();
    }
  }

  increaseSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      console.log(
        this.state.speed,
        Math.log10(this.state.snakeDots.length).toFixed(2)
      );
      this.setState({
        speed:
          this.state.speed - Math.log10(this.state.snakeDots.length).toFixed(2),
      });
    }
  }

  onRouteChange = () => {
    this.setState({
      route: "game",
    });
  };

  gameOver() {
    var score = this.state.snakeDots.length - 2;
    var newHighScore = Math.max(score, this.state.highScore);

    localStorage.setItem(
      All_TIME_HIGH_SCORE_KEY,
      Math.max(newHighScore, localStorage.getItem(All_TIME_HIGH_SCORE_KEY))
    );

    alert(
      `GAME OVER, your score is ${score}, high score is ${newHighScore}, all time high score is ${localStorage.getItem(
        All_TIME_HIGH_SCORE_KEY
      )}`
    );

    this.setState({ ...initialState, highScore: newHighScore });
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
    const { route, snakeDots, food } = this.state;
    return (
      <div>
        {route === "menu" ? (
          <div>
            <Menu onRouteChange={this.onRouteChange} />
          </div>
        ) : (
          <div>
            <div className={style.gameArea}>
              <Snake snakeDots={snakeDots} />
              <Food dot={food} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SnakeGame;
