import "./App.css";
import useGrid from "./hooks/useGrid";

function App() {
  const { cards, flippedCards, resetGame, handleClick } = useGrid();

  /**
   * DERIVED STATE: Win Detection
   * We don't need a 'hasWon' state variable.
   * We just check if every card object has its 'isMatched' property set to true.
   */
  const hasWon = cards.length > 0 && cards.every((card) => card.isMatched);

  return (
    <div className="container">
      <h1>Memory Game</h1>

      <button onClick={resetGame} className="restart-btn">
        {hasWon ? "Play Again" : "Restart Game"}
      </button>

      <div className="grid-container">
        {cards.map(({ id, number, isFlipped, isMatched }, index) => {
          // Logic for UI feedback (showing red/green states)
          const isSelected = flippedCards.includes(index);
          const isMismatch =
            flippedCards.length === 2 &&
            isSelected &&
            !isMatched &&
            cards[flippedCards[0]].number !== cards[flippedCards[1]].number;

          let cardClass = "card";
          if (isMatched) cardClass += " green"; // Success color
          if (isMismatch) cardClass += " red"; // Error color

          return (
            <button
              key={id}
              className={cardClass}
              onClick={() => handleClick(index)}
              // Accessibility: Disable button if it's already solved
              disabled={isMatched}
            >
              {/* Only reveal the number if the card is flipped or already matched */}
              {isFlipped || isMatched ? number : "?"}
            </button>
          );
        })}
      </div>

      {hasWon && <p className="win">You win 🎉</p>}
    </div>
  );
}

export default App;
