export function saveScores(score, moves, timeLeft) {
  const existingScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const newScore = { score, moves, timeLeft };
  existingScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(existingScores));
}
