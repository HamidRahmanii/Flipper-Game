const LastScores = ({ onClose }) => {
  const lastScores = JSON.parse(localStorage.getItem("highScores")) || [];

  const filteredScores = lastScores.filter(
    (item) =>
      item.score > 0 &&
      typeof item.moves === "number" &&
      !isNaN(item.moves) &&
      typeof item.timeLeft === "number" &&
      !isNaN(item.timeLeft)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg transform animate-scaleIn">
        <h2 className="text-2xl font-bold text-rose-800 mb-4 text-center">
          Last Scores
        </h2>

        <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-2">
          {filteredScores.length === 0 ? (
            <p className="text-center text-gray-500">No scores yet.</p>
          ) : (
            [...filteredScores].reverse().map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 ${
                  item.score === 1000 ? "bg-green-100" : "bg-indigo-50"
                } ${
                  item.score === 1000 ? "text-green-900" : "text-indigo-800"
                }  p-2 rounded text-sm`}
              >
                <p>
                  <span className="font-semibold">Score: </span> {item.score}
                </p>
                <p>
                  <span className="font-semibold">Moves: </span> {item.moves}
                </p>
                <p>
                  <span className="font-semibold">Time: </span>
                  {80 - item.timeLeft}
                </p>
              </div>
            ))
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-rose-600 hover:bg-rose-700 text-rose-100 font-medium py-2 rounded-lg transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LastScores;
