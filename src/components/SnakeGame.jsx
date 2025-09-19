import { useState, useEffect, useRef } from "react";
import "../css/SnakeGame.css";
import StartMenu from "./SnakeGame/startMenu.jsx";
import { Food } from "./SnakeGame/food.jsx";
import Snake from "./SnakeGame/snake.jsx";
import Pause from "./SnakeGame/pauseMenu.jsx";
import GameOverMenu from "./SnakeGame/gameOverMenu.jsx";
import ScoreBoard from "./SnakeGame/scoreboard.jsx";
import WelcomeMenu from "./SnakeGame/welcomeMenu.jsx";
import SettingsMenu from "./SnakeGame/settingsMenu.jsx";
import {
  CELL_SIZE,
  FOOD_SIZE,
  GAME_OVER,
  GAME_MENU,
  GAME_IN_PROCESS,
  GAME_PAUSED,
  initialState,
} from "./SnakeGame/constants.jsx";

import { useSnakeGameLogic } from "./SnakeGame/hooks/useSnakeGameLogic.jsx";
import { useKeyboardControls } from "./SnakeGame/hooks/useKeyboardControls.jsx";
import { useSettingsTimeout } from "./SnakeGame/hooks/useSettingsTimeout.jsx";

export default function SnakeGame() {
  const [showPopup, setShowPopup] = useState(initialState.showPopup);
  const showPopupRef = useRef(showPopup);

  useEffect(() => {
    showPopupRef.current = showPopup;
  }, [showPopup]);

  const handleStart = () => {
    setShowPopup(false); // hide popup
    // initialize or start your game here
  };

  // From useSnakeGameLogic
  const snakeGameLogic = useSnakeGameLogic();

  const snakeDots = snakeGameLogic.snakeDots;
  const food = snakeGameLogic.food;
  const score = snakeGameLogic.score;
  const highScore = snakeGameLogic.highScore;
  const route = snakeGameLogic.route;
  const color = snakeGameLogic.color;
  const gameEndReason = snakeGameLogic.gameEndReason;
  const lightMode = snakeGameLogic.lightMode;
  const hardMode = snakeGameLogic.hardMode;
  const setRoute = snakeGameLogic.setRoute;
  const resetGame = snakeGameLogic.resetGame;
  const restartGame = snakeGameLogic.restartGame;
  const toggleLightMode = snakeGameLogic.toggleLightMode;
  const toggleHardMode = snakeGameLogic.toggleHardMode;
  const direction = snakeGameLogic.direction;
  const nextDirection = snakeGameLogic.nextDirection;
  const allTimeHighScore = snakeGameLogic.allTimeHighScore;
  const prevAllTimeHighScore = snakeGameLogic.prevAllTimeHighScore;
  const onRouteChange = snakeGameLogic.onRouteChange;
  const routeRef = snakeGameLogic.routeRef;

  // From useSettingsTimeout
  const settingsTimeout = useSettingsTimeout();

  const showSettings = settingsTimeout.showSettings;
  const toggleSettings = settingsTimeout.toggleSettings;
  const bindSettingsEvents = settingsTimeout.bindSettingsEvents;

  // Call useKeyboardControls
  useKeyboardControls({
    route: route,
    routeRef: routeRef,
    setRoute: setRoute,
    direction: direction,
    nextDirection: nextDirection,
    restartGame: restartGame,
    toggleSettings: toggleSettings,
    showPopupRef: showPopupRef,
  });

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
            handleLightModeToggle={toggleLightMode}
            lightMode={lightMode}
            handleHardModeToggle={toggleHardMode}
            hardMode={hardMode}
            route={route}
            onMouseMove={bindSettingsEvents.onMouseMove} // Reset timer if user moves mouse
            onKeyDown={bindSettingsEvents.onMouseMove}
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
