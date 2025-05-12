import { useState, useEffect } from "react";
import "../styles/ticTacToePage.css";
import Square from "../components/square";
import { io } from "socket.io-client";
import Header from "../components/header";
import userBiz from "../businesses/userBiz";
import { useUser } from "../contexts/userContext";

const createInitialGameState = () => [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const TicTacToePage = () => {
  const token = localStorage.getItem("accessToken");
  const { user, setUser } = useUser();

  const [gameState, setGameState] = useState(createInitialGameState());
  const [gameVersion, setGameVersion] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishedState] = useState("");
  const [finishedArrayState, setFinishedArrayState] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState(null);
  const [playingAs, setPlayingAs] = useState(null);

  const [rechallengeRequested, setRechallengeRequested] = useState(false);
  const [rechallengeConfimation, setRechallengeConfimation] = useState(false);
  const [rechallengeAccepted, setRechallengeAccepted] = useState(false);
  const [rechallengeDeclined, setRechallengeDeclined] = useState(false);

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

  const updateScore = async (gameResult) => {
    const result = await userBiz.updateScore(gameResult, user.id, token);
    setUser(result);
  };

  useEffect(() => {
    console.log(user);
  }, []);

  useEffect(() => {
    const winner = checkWinner();
    let gameResult = "";
    if (winner) {
      if (winner === "draw") {
        gameResult = "draw";
      } else if (playingAs === winner) {
        gameResult = "win";
      } else {
        gameResult = "lose";
      }
      updateScore(gameResult);
    }
  }, [gameState]);

  useEffect(() => {
    if (rechallengeAccepted) {
      setGameState(createInitialGameState());
      setFinishedState("");
      setFinishedArrayState([]);
      setRechallengeRequested(false);
      setRechallengeConfimation(false);
      setRechallengeAccepted(false);
      setRechallengeDeclined(false);
      setGameVersion((prev) => prev + 1);
    }
  }, [rechallengeAccepted]);

  useEffect(() => {
    if (rechallengeDeclined) {
      setGameState(createInitialGameState());
      setFinishedState("");
      setFinishedArrayState([]);
      setRechallengeConfimation(false);
      setRechallengeRequested(false);
      setRechallengeAccepted(false);
      setRechallengeDeclined(false);
      setGameVersion((prev) => prev + 1);
      setPlayOnline(false);
    }
  }, [rechallengeDeclined]);

  socket?.on("opponentLeftMatch", () => {
    setFinishedState("opponentLeftMatch");
  });

  socket?.on("playerMoveFromServer", (data) => {
    const id = data.state.id;
    setGameState((prevState) => {
      let newState = [...prevState];
      const rowIndex = Math.floor(id / 3);
      const colIndex = id % 3;
      newState[rowIndex][colIndex] = data.state.sign;
      return newState;
    });
    setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
  });

  socket?.on("connect", function () {
    setPlayOnline(true);
  });

  socket?.on("OpponentNotFound", function () {
    setOpponentName(false);
  });

  socket?.on("OpponentFound", function (data) {
    setPlayingAs(data.playingAs);
    setOpponentName(data.opponentName);
  });

  socket?.on("rechallengeRequestedFromServer", (data) => {
    setRechallengeConfimation(data.rechallengeConfimation);
  });

  socket?.on("rechallengeAcceptedFromServer", (data) => {
    // setRechallengeRequested(false);
    // setRechallengeConfimation(false);
    setRechallengeAccepted(true);
  });

  socket?.on("rechallengeDeclinedFromServer", (data) => {
    // setRechallengeConfimation(false);
    // setRechallengeRequested(false);
    setRechallengeDeclined(true);
  });

  async function playOnlineClick() {
    const username = user.username;
    setPlayerName(username);

    const newSocket = io(process.env.REACT_APP_BACKEND, {
      autoConnect: true,
    });

    newSocket?.emit("request_to_play", {
      playerName: username,
    });

    setSocket(newSocket);
  }

  const handleRechallenge = () => {
    socket.emit("rechallengeRequestedFromClient", {
      rechallengeRequest: true,
    });
    setRechallengeRequested(true);
  };

  const handleAccept = () => {
    socket.emit("rechallengeAcceptedFromClient");
    setRechallengeAccepted(true);
  };

  const handleDecline = () => {
    socket.emit("rechallengeDeclinedFromClient");
    setRechallengeDeclined(true);
  };

  const handleLeave = () => {
    socket.disconnect();
    setRechallengeDeclined(true);
  };

  return (
    <>
      <Header />
      <div className="main-div">
        {!playOnline && (
          <button onClick={playOnlineClick} className="playOnline">
            Play Online
          </button>
        )}

        {playOnline && !opponentName && (
          <div className="waiting">
            <p>Waiting for opponent</p>
          </div>
        )}

        {rechallengeRequested && (
          <div className="waiting">
            <p>Waiting for {opponentName} to rechallenge</p>
          </div>
        )}

        {rechallengeConfimation && (
          <div className="waiting">
            <p>{opponentName} requested for rechallenge</p>
            <div className="button-group">
              <button className="accept" onClick={handleAccept}>
                Accept
              </button>
              <button className="decline" onClick={handleDecline}>
                Decline
              </button>
            </div>
          </div>
        )}

        {playOnline &&
          opponentName &&
          rechallengeRequested === false &&
          rechallengeConfimation === false && (
            <>
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
                <div>
                  <p>VS</p>
                </div>
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
                <h1 className="game-heading water-background">Tic Tac Toe</h1>
                <h3 className="playing-as">you are {playingAs}</h3>
                <div className="square-wrapper">
                  {gameState.map((arr, rowIndex) =>
                    arr.map((e, colIndex) => (
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
                        key={`square-${rowIndex}-${colIndex}-${gameVersion}`}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                      />
                    ))
                  )}
                </div>
                {finishedState &&
                  finishedState !== "opponentLeftMatch" &&
                  finishedState !== "draw" && (
                    <>
                      <h3 className="finished-state">
                        {finishedState === playingAs ? "you" : finishedState}
                        won the game
                      </h3>
                      <button
                        className="rechallenge"
                        onClick={handleRechallenge}
                      >
                        Rechallenge opponent
                      </button>
                    </>
                  )}
                {finishedState &&
                  finishedState !== "opponentLeftMatch" &&
                  finishedState === "draw" && (
                    <h3 className="finished-state">It's a Draw</h3>
                  )}
              </div>
              {finishedState && finishedState === "opponentLeftMatch" && (
                <h3>Opponent has left</h3>
              )}

              <button className="leave-game" onClick={handleLeave}>
                Leave game
              </button>
            </>
          )}
      </div>
    </>
  );
};

export default TicTacToePage;
