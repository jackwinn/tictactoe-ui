import React, { useState, useEffect } from "react";
import "../styles/ticTacToePage.css";
import { io } from "socket.io-client";

const TicTacToePage = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [isMatched, setIsMatched] = useState(false);
  const [game, setGame] = useState({
    board: Array(9).fill(null),
    currentPlayer: "X",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [playerTurn, setPlayerTurn] = useState("");

  useEffect(() => {
    // future socket event handlers or matchmaking logic
  }, []);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], winningLine: [a, b, c] };
      }
    }
    return null;
  };

  const makeMove = (index) => {
    const squares = [...game.board];

    if (calculateWinner(squares) || squares[index]) {
      setErrorMessage("Invalid move. Please try again.");
      return;
    }

    squares[index] = game.currentPlayer;

    setGame({
      board: squares,
      currentPlayer: game.currentPlayer === "X" ? "O" : "X",
    });
  };

  const result = calculateWinner(game.board);
  const winner = result?.winner;
  const winningLine = result?.winningLine || [];

  return (
    <div className="board-container">
      <h1>Welcome to Tic Tac Toe Game</h1>

      {!isMatched ? (
        <button onClick={() => setIsMatched(true)} className="find-match-button">
          Find a Match
        </button>
      ) : (
        <>
          <div className="board">
            {game.board.map((cell, index) => (
              <div
                key={index}
                className={`cell ${winningLine.includes(index) ? "winner" : ""}`}
                onClick={() => makeMove(index)}
              >
                {cell}
              </div>
            ))}
          </div>
          <p className="current-player">
            {winner ? `Player ${winner} wins!` : `Current Player: ${playerTurn || game.currentPlayer}`}
          </p>
        </>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default TicTacToePage;
