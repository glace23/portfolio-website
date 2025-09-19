import { useEffect } from "react";
import {
  GAME_IN_PROCESS,
  GAME_PAUSED,
  GAME_OVER,
  GAME_MENU,
} from "../constants.jsx";

export function useKeyboardControls({
  route,
  routeRef,
  setRoute,
  direction,
  nextDirection,
  restartGame,
  toggleSettings,
  showPopupRef,
}) {
  useEffect(() => {
    const onKeyDown = (e) => {
      e.preventDefault();

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
          if (routeRef.current === GAME_IN_PROCESS) {
            setRoute(GAME_PAUSED);
          } else if (route === GAME_PAUSED) {
            setRoute(GAME_IN_PROCESS);
          }
          break;
        case "R":
        case "r":
          if (
            routeRef.current === GAME_OVER ||
            routeRef.current === GAME_PAUSED
          ) {
            setRoute(GAME_MENU);
            restartGame();
          }
          break;
        case "1":
          if (showPopupRef.current === false) {
            toggleSettings();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [route, setRoute, restartGame, toggleSettings, direction]);
}

//   useEffect(() => {
//     const onKeyDown = (e) => {
//       e.preventDefault();
//       e = e || window.event;

//       const curRoute = routeRef.current;
//       const curShowPopup = showPopupRef.current;

//       switch (e.key) {
//         case "ArrowLeft":
//         case "A":
//         case "a":
//           if (direction !== "RIGHT") nextDirection.current = "LEFT";
//           break;
//         case "ArrowDown":
//         case "S":
//         case "s":
//           if (direction !== "UP") nextDirection.current = "DOWN";
//           break;
//         case "ArrowUp":
//         case "W":
//         case "w":
//           if (direction !== "DOWN") nextDirection.current = "UP";
//           break;
//         case "ArrowRight":
//         case "D":
//         case "d":
//           if (direction !== "LEFT") nextDirection.current = "RIGHT";
//           break;
//         case "P":
//         case "p":
//           // setRoute((prev) =>
//           //   prev === GAME_IN_PROCESS ? GAME_PAUSED : GAME_IN_PROCESS
//           // );
//           if (curRoute === GAME_IN_PROCESS) {
//             setRoute(GAME_PAUSED);
//           } else if (curRoute === GAME_PAUSED) {
//             setRoute(GAME_IN_PROCESS);
//           }
//           break;
//         case "R":
//         case "r":
//           if (curRoute === GAME_OVER || curRoute === GAME_PAUSED) {
//             setRoute(GAME_MENU);
//             restartGame();
//           }
//           break;
//         case "1":
//           if (curShowPopup === false) {
//             setShowSettings((prev) => !prev);
//           }
//           break;
//       }
//     };
//     document.addEventListener("keydown", onKeyDown);
//     return () => document.removeEventListener("keydown", onKeyDown);
//   }, [direction]);
