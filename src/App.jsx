import { useEffect, useState } from "react";
import GameStatus from "./components/GameStatus";
import VictoryModal from "./components/VictoryModal";
import GameOver from "./components/GameOver";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { saveScores } from "./utils/saveScores";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [counter, setCounter] = useState(0);
  const [star, setStar] = useState(0);
  const [timeLeft, setTimeLeft] = useState(80);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState("playing");

  useEffect(() => {
    if (!hasStarted || status !== "playing" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, status]);

  useEffect(() => {
    if (status === "playing" && timeLeft === 0) {
      const timeout = setTimeout(() => {
        setStatus("lost");
        saveScores(score, moves, timeLeft);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [status, score, moves, timeLeft]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center px-4">
      <div className="w-full flex justify-center sticky top-0  z-10 ">
        <div className="w-full max-w-2xl flex justify-center">
          <Header />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full max-w-2xl">
        {status === "lost" ? (
          <GameOver
            setHasStarted={setHasStarted}
            status={status}
            setStatus={setStatus}
            score={score}
            setScore={setScore}
            setTimeLeft={setTimeLeft}
            setCounter={setCounter}
            star={star}
            setStar={setStar}
          />
        ) : status === "win" ? (
          <VictoryModal
            setHasStarted={setHasStarted}
            status={status}
            setStatus={setStatus}
            setScore={setScore}
            setTimeLeft={setTimeLeft}
            setCounter={setCounter}
            star={star}
            setStar={setStar}
            moves={moves}
          />
        ) : (
          <>
            <GameStatus
              setHasStarted={setHasStarted}
              setCounter={setCounter}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              setStatus={setStatus}
              score={score}
              setScore={setScore}
              setStar={setStar}
            />

            <GameBoard
              hasStarted={hasStarted}
              setHasStarted={setHasStarted}
              score={score}
              counter={counter}
              status={status}
              setStatus={setStatus}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              setScore={setScore}
              setStar={setStar}
              moves={moves}
              setMoves={setMoves}
            />
          </>
        )}
      </div>

      <div className="w-full flex justify-center sticky bottom-0 z-10 ">
        <div className="w-full max-w-2xl flex justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
