import { useEffect, useState } from "react";
import Card from "./Card";
import { shuffleCards } from "../utils/shuffle";
import { saveScores } from "../utils/saveScores";

const COLORS = [
  "bg-purple-500",
  "bg-rose-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-indigo-500",
];

const createInitialCards = () => {
  const allCards = [];
  let id = 0;
  COLORS.forEach((color) => {
    const pair = [
      { id: id++, color, isFlipped: false, isMatched: false },
      { id: id++, color, isFlipped: false, isMatched: false },
    ];
    allCards.push(...pair);
  });
  return shuffleCards(allCards);
};

const GameBoard = ({
  hasStarted,
  setHasStarted,
  score,
  moves,
  counter,
  setStatus,
  setScore,
  timeLeft,
  setTimeLeft,
  setStar,
  setMoves,
}) => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCards(createInitialCards());
  }, [counter]);

  const resetSelectedCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  const handleClickCards = (id) => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    const selectedCard = cards.find((card) => card.id === id);
    if (
      disabled ||
      !selectedCard ||
      selectedCard.isFlipped ||
      selectedCard.isMatched ||
      id === firstCard
    )
      return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    if (firstCard === null) {
      setFirstCard(id);
    } else if (secondCard === null) {
      setSecondCard(id);
    }
  };

  useEffect(() => {
    if (firstCard === null || secondCard === null) return;

    const first = cards.find((card) => card.id === firstCard);
    const second = cards.find((card) => card.id === secondCard);

    setDisabled(true);
    setMoves((prev) => prev + 1);

    if (first.color === second.color) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === firstCard || card.id === secondCard
            ? { ...card, isMatched: true }
            : card
        )
      );
      setScore((prevScore) => prevScore + 1000 / 8);
      setStar((prevStar) => prevStar + 1);
      resetSelectedCards();
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstCard || card.id === secondCard
              ? { ...card, isFlipped: false }
              : card
          )
        );
        resetSelectedCards();
      }, 1000);
    }
  }, [firstCard, secondCard]);
  useEffect(() => {
    if (cards.length && cards.every((card) => card.isMatched)) {
      setTimeout(() => {
        setStatus("win");
        saveScores(score, moves, timeLeft);
        setTimeLeft((prevTime) => prevTime);
      }, 1000);
    }
  }, [cards]);

  return (
    <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => handleClickCards(card.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default GameBoard;
