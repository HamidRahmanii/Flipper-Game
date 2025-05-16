const GameOver = ({
  setHasStarted,
  status,
  setStatus,
  setTimeLeft,
  score,
  setScore,
  setCounter,
  star,
  setStar,
}) => {
  if (status !== "lost") return null;

  const resetGame = () => {
    setHasStarted(false);
    setCounter((prev) => prev + 1);
    setTimeLeft(80);
    setScore(0);
    setStar(0);
    setStatus("playing");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg transform animate-scaleIn">
        <h2 className="text-2xl font-bold text-rose-800 mb-4 text-center">
          Game Over!
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          You lost with {score} scores!
        </p>
        <div className="flex justify-center mb-6">
          <div className="flex gap-2">
            {[...Array(star)].map((_, i) => (
              <div
                key={i}
                className="text-amber-400 animate-bounce text-3xl"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                ★
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={resetGame}
          className="w-full bg-rose-600 hover:bg-rose-700 text-rose-100 font-medium py-3 rounded-lg shadow-sm transition-colors duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
export default GameOver;
