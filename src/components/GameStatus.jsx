import { useState } from "react";
import HighScore from "./LastScores";

const GameStatus = ({
  setHasStarted,
  setCounter,
  timeLeft,
  setTimeLeft,
  setStatus,
  score,
  setScore,
  setStar,
}) => {
  const [showHighScore, setShowHighScores] = useState(false);

  const resetGame = () => {
    setHasStarted(false);
    setCounter((prev) => prev + 1);
    setStatus("playing");
    setTimeLeft(80);
    setScore(0);
    setStar(0);
  };

  const toggleHighScores = () => {
    setShowHighScores((prev) => {
      const next = !prev;
      setStatus(next ? "scores" : "playing");
      return next;
    });
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 items-center justify-items-center h-8 w-full max-w-2xl">
        <button
          className="border border-rose-600 text-rose-600 h-full w-full rounded-lg hover:bg-rose-600 hover:text-white hover:scale-105 transition-transform ease-in-out"
          onClick={toggleHighScores}
        >
          {showHighScore ? "Close Scores" : "Show Scores"}
        </button>

        <div className="col-span-2 border border-rose-600 w-full rounded-lg h-full">
          <div className="grid grid-cols-2 w-full h-full">
            <div className="grid h-full items-center justify-items-center text-rose-600">
              Time: {timeLeft}
            </div>
            <div className="grid h-full items-center justify-items-center text-rose-600">
              Score: {score}
            </div>
          </div>
        </div>

        <button
          className="border border-rose-600 text-rose-600 h-full w-full rounded-lg hover:bg-rose-600 hover:text-white hover:scale-105 transition-transform ease-in-out"
          onClick={resetGame}
        >
          Restart
        </button>
      </div>

      {showHighScore && <HighScore onClose={toggleHighScores} />}
    </>
  );
};

export default GameStatus;
