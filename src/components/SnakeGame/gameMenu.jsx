import { GAME_PAUSED, GAME_OVER, GAME_MENU } from "./constants";
import GameOverMenu from "./gameOverMenu.jsx";
import SettingsMenu from "./settingsMenu.jsx";
import PauseMenu from "./pauseMenu.jsx";
import StartMenu from "./startMenu.jsx";

const GameMenu = ({
  route,
  onRouteChange,
  restartGame,
  resetGame,
  showSettings,
  toggleSettings,
  gameEndReason,
  score,
  highScore,
  prevAllTimeHighScore,
  showPopupRef,
  onMouseMove,
  onKeyDown,
  lightMode,
  hardMode,
  toggleLightMode,
  toggleHardMode,
}) => {
  return (
    <>
      {showPopupRef.current === false &&
        (showSettings === true || showSettings === false) && (
          <SettingsMenu
            handleLightModeToggle={toggleLightMode}
            lightMode={lightMode}
            handleHardModeToggle={toggleHardMode}
            hardMode={hardMode}
            route={route}
            onMouseMove={onMouseMove} // Reset timer if user moves mouse
            onKeyDown={onKeyDown}
            showSettings={showSettings}
          />
        )}
      {route === GAME_PAUSED && (
        <div>
          <PauseMenu
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
    </>
  );
};

export default GameMenu;
