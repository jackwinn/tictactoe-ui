import { useState, useEffect } from "react";
import "../styles/ticTacToePage.css";
import Square from "../components/square";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const TicTacToePage = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [gameState, setGameState] = useState(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishedState] = useState(null);
  const [finishedArrayState, setFinishedArrayState] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentFound, setOpponentFound] = useState(false);
  const [opponentName, setOpponentName] = useState(null);
  const [playingAs, setPlayingAs] = useState(null);

  const checkWinner = () => {
    // row dynamic
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    // column dynamic
    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }

    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      return gameState[0][0];
    }

    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      return gameState[0][2];
    }

    const isDrawMatch = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") return true;
    });

    if (isDrawMatch) return "draw";

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishedState(winner);
    }
  }, [gameState]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setPlayOnline(true);
    });

    socket.on("OpponentNotFound", () => {
      setOpponentName(false);
    });

    socket.on("OpponentFound", (data) => {
      setPlayingAs(data.playingAs);
      setOpponentName(data.opponentName);
      setOpponentFound(true);
    });

    socket.on("opponentLeftMatch", () => {
      setFinishedState("opponentLeftMatch");
    });

    socket.on("playerMoveFromServer", (data) => {
      const id = data.state.id;
      setGameState((prevState) => {
        const newState = [...prevState];
        const rowIndex = Math.floor(id / 3);
        const colIndex = id % 3;
        newState[rowIndex][colIndex] = data.state.sign;
        return newState;
      });
      setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
    });

    return () => {
      socket.off("connect");
      socket.off("OpponentNotFound");
      socket.off("OpponentFound");
      socket.off("opponentLeftMatch");
      socket.off("playerMoveFromServer");
    };
  }, [socket]);

  const playOnlineClick = async () => {
    const username = user.username;
    setPlayerName(username);

    const newSocket = io(process.env.REACT_APP_BACKEND, {
      autoConnect: true,
    });

    newSocket?.emit("request_to_play", {
      playerName: username,
    });

    setSocket(newSocket);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    if (socket) socket.disconnect();
    navigate("/login");
  };

  return (
    <>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      {!playOnline && (
        <div className="main-div">
          <button onClick={playOnlineClick} className="playOnline">
            Play Online
          </button>
        </div>
      )}

      {playOnline && !opponentName && (
        <div className="waiting">
          <p>Waiting for opponent...</p>
        </div>
      )}

      {opponentFound && (
        <>
          <div className="main-div">
            <div className="move-detection">
              <div
                className={`left ${
                  currentPlayer === playingAs
                    ? "current-move-" + currentPlayer
                    : ""
                }`}
              >
                {playerName}
              </div>
              <h3 className="game-against">VS</h3>
              <div
                className={`right ${
                  currentPlayer !== playingAs
                    ? "current-move-" + currentPlayer
                    : ""
                }`}
              >
                {opponentName}
              </div>
            </div>

            <div>
              <h1 className="game-heading">Tic Tac Toe</h1>

              {finishedState === "opponentLeftMatch" && (
                <h3>You won the match, Opponent has left</h3>
              )}

              <div className="square-wrapper">
                {gameState.map((arr, rowIndex) =>
                  arr.map((e, colIndex) => {
                    return (
                      <Square
                        socket={socket}
                        playingAs={playingAs}
                        gameState={gameState}
                        finishedArrayState={finishedArrayState}
                        finishedState={finishedState}
                        currentPlayer={currentPlayer}
                        setCurrentPlayer={setCurrentPlayer}
                        setGameState={setGameState}
                        id={rowIndex * 3 + colIndex}
                        key={rowIndex * 3 + colIndex}
                        currentElement={e}
                      />
                    );
                  })
                )}
              </div>
              {finishedState &&
                finishedState !== "opponentLeftMatch" &&
                finishedState !== "draw" && (
                  <h3 className="finished-state">
                    {finishedState === playingAs ? "you " : finishedState} won
                    the game!
                  </h3>
                )}
              {finishedState &&
                finishedState !== "opponentLeftMatch" &&
                finishedState === "draw" && (
                  <h3 className="finished-state">It's a Draw</h3>
                )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TicTacToePage;
