import React, { useState } from "react";
import "../styles/square.css";

const circleSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>
);

const crossSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M19 5L5 19M5.00001 5L19 19"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>
);

const Square = ({
  gameState,
  setGameState,
  socket,
  playingAs,
  finishedArrayState,
  setFinishedState,
  finishedState,
  id,
  currentPlayer,
  setCurrentPlayer,
  rowIndex,
  colIndex,
}) => {
  const currentElement = gameState[rowIndex][colIndex];
  const isFilled = currentElement === "circle" || currentElement === "cross";
  const isDisabled = finishedState || currentPlayer !== playingAs || isFilled;

  const clickOnSquare = () => {
    if (
      playingAs !== currentPlayer ||
      finishedState ||
      currentElement === "circle" ||
      currentElement === "cross"
    ) {
      return;
    }

    const myCurrentPlayer = currentPlayer;

    socket.emit("playerMoveFromClient", {
      state: {
        id,
        sign: myCurrentPlayer,
      },
    });

    setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");

    setGameState((prevState) => {
      let newState = [...prevState];
      const row = Math.floor(id / 3);
      const col = id % 3;
      newState[row][col] = myCurrentPlayer;
      return newState;
    });
  };

  return (
    <div
      onClick={clickOnSquare}
      className={`square 
    ${isDisabled ? "not-allowed" : ""}
    ${finishedArrayState.includes(id) ? finishedState + "-won" : ""}
    ${finishedState && finishedState !== playingAs ? "grey-background" : ""}
  `}
    >
      {currentElement === "circle"
        ? circleSvg
        : currentElement === "cross"
        ? crossSvg
        : null}
    </div>
  );
};

export default Square;
