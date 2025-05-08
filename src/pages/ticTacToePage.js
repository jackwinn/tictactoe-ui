import React, { useState } from "react";
import "../styles/ticTacToePage.css";

const TicTacToePage = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState("In Progress");

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  const checkWinner = (newBoard) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]; // "X" or "O"
      }
    }
    if (!newBoard.includes(null)) {
      return "Draw";
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || status !== "In Progress") return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result === "X" || result === "O") {
      setStatus(`Player ${result} wins!`);
    } else if (result === "Draw") {
      setStatus("It's a draw!");
    } else {
      setIsXNext(!isXNext);
    }
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)} key={index}>
      {board[index]}
    </button>
  );

  return (
    <div className="game-container">
      <div className="player-indicator">
        {status === "In Progress"
          ? `Current Player: ${isXNext ? "X" : "O"}`
          : status}
      </div>
      <div className="board">
        {board.map((_, index) => renderSquare(index))}
      </div>
    </div>
  );
};

export default TicTacToePage;
