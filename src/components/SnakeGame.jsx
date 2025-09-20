import { useState, useEffect, useRef } from "react";
import "../css/SnakeGame.css";
import { Food } from "./SnakeGame/food.jsx";
import Snake from "./SnakeGame/snake.jsx";
import ScoreBoard from "./SnakeGame/scoreboard.jsx";
import WelcomeMenu from "./SnakeGame/welcomeMenu.jsx";
import GameMenu from "./SnakeGame/gameMenu.jsx";
import {
  CELL_SIZE,
  ITEM_SIZE,
  GAME_OVER,
  GAME_IN_PROCESS,
  GAME_PAUSED,
  initialState,
} from "./SnakeGame/constants.jsx";

import { useSnakeGameLogic } from "./SnakeGame/hooks/useSnakeGameLogic.jsx";
import { useKeyboardControls } from "./SnakeGame/hooks/useKeyboardControls.jsx";
import { useSettingsTimeout } from "./SnakeGame/hooks/useSettingsTimeout.jsx";
import { PowerUp } from "./SnakeGame/powerUps.jsx";

export default function SnakeGame() {
  // Start Menu Logic
  const [showPopup, setShowPopup] = useState(initialState.showPopup);
  const showPopupRef = useRef(showPopup);

  useEffect(() => {
    showPopupRef.current = showPopup;
  }, [showPopup]);

  const handleStart = () => {
    setShowPopup(false); // hide popup
  };

  // From useSettingsTimeout
  const settingsTimeout = useSettingsTimeout();

  const showSettings = settingsTimeout.showSettings;
  // const setShowSettings = settingsTimeout.setShowSettings;
  const toggleSettings = settingsTimeout.toggleSettings;
  const bindSettingsEvents = settingsTimeout.bindSettingsEvents;

  // From useSnakeGameLogic
  const snakeGameLogic = useSnakeGameLogic();

  const snakeDots = snakeGameLogic.snakeDots;
  const food = snakeGameLogic.food;
  const powerUp = snakeGameLogic.powerUp;
  const score = snakeGameLogic.score;
  const highScore = snakeGameLogic.highScore;
  const route = snakeGameLogic.route;
  const color = snakeGameLogic.color;
  const gameEndReason = snakeGameLogic.gameEndReason;
  const lightMode = snakeGameLogic.lightMode;
  const hardMode = snakeGameLogic.hardMode;
  const powerUpMode = snakeGameLogic.powerUpMode;
  const gridLinesMode = snakeGameLogic.gridLinesMode;
  const setRoute = snakeGameLogic.setRoute;
  const resetGame = snakeGameLogic.resetGame;
  const restartGame = snakeGameLogic.restartGame;
  const toggleLightMode = snakeGameLogic.toggleLightMode;
  const toggleHardMode = snakeGameLogic.toggleHardMode;
  const togglePowerUpMode = snakeGameLogic.togglePowerUpMode;
  const toggleGridLinesMode = snakeGameLogic.toggleGridLinesMode;
  const direction = snakeGameLogic.direction;
  const nextDirection = snakeGameLogic.nextDirection;
  const allTimeHighScore = snakeGameLogic.allTimeHighScore;
  const prevAllTimeHighScore = snakeGameLogic.prevAllTimeHighScore;
  const onRouteChange = snakeGameLogic.onRouteChange;
  const routeRef = snakeGameLogic.routeRef;

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

      <div
        className={[
          "gameArea",
          hardMode === true || gridLinesMode === false ? "noGridLines" : "",
        ].join(" ")}
      >
        <GameMenu
          route={route}
          onRouteChange={onRouteChange}
          restartGame={restartGame}
          resetGame={resetGame}
          showSettings={showSettings}
          toggleSettings={toggleSettings}
          gameEndReason={gameEndReason}
          score={score}
          highScore={highScore}
          prevAllTimeHighScore={prevAllTimeHighScore}
          toggleLightMode={toggleLightMode}
          lightMode={lightMode}
          toggleHardMode={toggleHardMode}
          powerUpMode={powerUpMode}
          togglePowerUpMode={togglePowerUpMode}
          gridLinesMode={gridLinesMode}
          toggleGridLinesMode={toggleGridLinesMode}
          hardMode={hardMode}
          onMouseMove={bindSettingsEvents.onMouseMove} // Reset timer if user moves mouse
          onKeyDown={bindSettingsEvents.onKeyDown}
          showPopupRef={showPopupRef}
        ></GameMenu>

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
              foodSize={ITEM_SIZE}
              lightMode={lightMode}
            />
            {powerUp.map((pu, i) => (
              <PowerUp
                key={pu.id}
                dot={pu.position}
                powerUpType={pu.powerUpType}
                cellSize={CELL_SIZE}
                powerUpSize={ITEM_SIZE}
                lightMode={lightMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
