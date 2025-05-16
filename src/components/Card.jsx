const Card = ({ card, onClick, disabled }) => {
  return (
    <div
      className={`relative w-full aspect-[3/2] perspective-1000 cursor-pointer
                 ${disabled ? "cursor-default" : "hover:scale-105"}
                 transition-transform duration-300 ease-in-out`}
      onClick={!disabled ? onClick : undefined}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d
                  ${card.isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Card Back */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-lg shadow-md
                     bg-gradient-to-tl from-indigo-700 to-violet-900 flex items-center justify-center
                     ${card.isMatched ? "opacity-0" : ""}
                     transition-opacity duration-300`}
        >
          <img
            src="/icons/amadast.svg"
            alt="Amadast Icon"
            className="w-1/2 h-1/2 opacity-60"
          />
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-lg shadow-md
                     ${card.color} flex items-center justify-center rotate-y-180
                     ${card.isMatched ? "opacity-80" : ""}
                     transition-opacity duration-300`}
        >
          <div className="w-full h-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Card;
