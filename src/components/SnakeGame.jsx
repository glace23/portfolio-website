import React, { Component } from "react";
import style from "../css/SnakeGame.module.css";
import Menu from "./menu.jsx";
import Food from "./food.jsx";
import Snake from "./snake.jsx";
import Pause from "./pause.jsx";

//let style = require("../css/SnakeGame.module.css");

export const All_TIME_HIGH_SCORE_KEY = "all-time-high-score";

const GRID_SIZE = 100;
const CELL_SIZE = 2;
const FOOD_SIZE = CELL_SIZE - 0.25;
const getRandomFood = () => {
  let x = Math.floor((Math.random() * (GRID_SIZE - 1)) / 2) * 2;
  let y = Math.floor((Math.random() * (GRID_SIZE - 1)) / 2) * 2;
  console.log(x, y);
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
  snakeDots: [
    [GRID_SIZE / 2, GRID_SIZE / 2], // Tail
    [GRID_SIZE / 2 + 2, GRID_SIZE / 2], // Head
  ],
  score: 0,
  highScore: 0,
  color: "R",
};

// type MyProps = {};
// type MyState = any;
class SnakeGame extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.nextDirection = this.state.direction;

    // Request Animation Frame Tick Rate Update
    this.lastUpdate = 0;
    this.tickRate = this.state.speed;
  }

  componentDidMount() {
    //setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
    this.rafId = requestAnimationFrame(this.gameLoop);
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.speed !== this.state.speed) {
    //   //console.log("speed: ", this.state.speed);
    //   clearInterval(this.interval);
    //   this.interval = setInterval(this.moveSnake, this.state.speed);
    // }
    this.onSnakeOutOfBounds();
    this.onSnakeCollapsed();
    this.onSnakeEats();
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
    cancelAnimationFrame(this.rafId);
  }

  onKeyDown = (e) => {
    // if (this.keyLock) return;
    // this.keyLock = true;

    e.preventDefault();
    e = e || window.event;

    switch (e.key) {
      case "ArrowLeft":
      case "A":
      case "a":
        if (this.state.direction !== "RIGHT")
          //this.setState({ direction: "LEFT" });
          this.nextDirection = "LEFT";
        break;
      case "ArrowDown":
      case "S":
      case "s":
        if (this.state.direction !== "UP")
          //this.setState({ direction: "DOWN" });
          this.nextDirection = "DOWN";
        break;
      case "ArrowUp":
      case "W":
      case "w":
        if (this.state.direction !== "DOWN")
          //this.setState({ direction: "UP" });
          this.nextDirection = "UP";
        break;
      case "ArrowRight":
      case "D":
      case "d":
        if (this.state.direction !== "LEFT")
          //this.setState({ direction: "RIGHT" });
          this.nextDirection = "RIGHT";
        break;
      case "P":
      case "p":
        if (this.state.route === "game") {
          this.setState({ route: "pause" });
        } else if (this.state.route === "pause") {
          this.setState({ route: "game" });
        }
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
      const direction = this.nextDirection;
      this.setState({ direction });
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
      // this.setState({ snakeDots: body }, () => {
      //   this.keyLock = false;
      // });
      this.setState({ snakeDots: body });
      // this.setState({ snakeDots: body }, () => {
      //   if (this.onSnakeOutOfBounds() || this.onSnakeCollapsed()) {
      //     this.gameOver();
      //   }
      //   this.onSnakeEats();
      // });
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

    // for (let i = 0; i < body.legth - 1; i++) {
    //   if (body[i][0] == head[0] && body[i][1] == head[1]) {
    //     this.gameOver();
    //   }
    // }
    body.pop();
    body.forEach((dot) => {
      if (dot[0] == head[0] && dot[1] == head[1]) {
        console.log(
          body[body.length - 1][0],
          body[body.length - 1][1],
          head[0],
          head[1]
        );
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
      this.changeColor();
    }
  }

  changeColor() {
    let colorList = [
      "red",
      "green",
      "blue",
      "yellow",
      "cyan",
      "violet",
      "orange",
    ];
    let color =
      colorList[(this.state.food[0] + this.state.food[1]) % colorList.length];

    this.setState({ color: color });
  }

  increaseSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    // if (this.state.speed > 10) {
    //   console.log(
    //     this.state.speed,
    //     Math.log10(this.state.snakeDots.length).toFixed(2)
    //   );
    //   this.setState(
    //     {
    //       speed:
    //         this.state.speed -
    //         Math.log10(this.state.snakeDots.length).toFixed(2),
    //     },
    //     () => {
    //       this.tickRate = this.state.speed;
    //     }
    //   );
    // }
    if (this.tickRate > 10) {
      console.log(
        this.tickRate,
        Math.log10(this.state.snakeDots.length).toFixed(2)
      );
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
          Score: {this.state.snakeDots.length - 2}, HighScore:{" "}
          {this.state.highScore}, All Time:{" "}
          {localStorage.getItem(All_TIME_HIGH_SCORE_KEY)}
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

export default SnakeGame;
