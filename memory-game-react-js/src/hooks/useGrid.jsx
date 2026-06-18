import { useEffect, useState } from "react";
import { generateGrid } from "../utils/gameUtils";

const useGrid = () => {
  // Initialize grid with 36 cards (18 pairs)
  const [cards, setCards] = useState(generateGrid());
  // Tracks the indices of the currently flipped (but not yet matched) cards
  const [flippedCards, setFlippedCards] = useState([]);
  /**
   * BOARD LOCKING:
   * Essential for preventing "illegal" clicks.
   * While we are waiting for the 1-second timeout to hide a mismatch,
   * the user should not be able to flip a 3rd card.
   */
  const [isBoardLocked, setIsBoardLocked] = useState(false);

  const resetGame = () => {
    setCards(generateGrid());
    setFlippedCards([]);
    setIsBoardLocked(false);
  };

  const handleClick = (index) => {
    // GUARD CLAUSE: Prevent clicking already flipped cards or clicking during evaluation
    if (cards[index].isFlipped || isBoardLocked) return;

    // IMMUTABILITY: Flip the clicked card
    const copyCards = [...cards];
    copyCards[index].isFlipped = true;

    setCards(copyCards);
    setFlippedCards((prev) => [...prev, index]);
  };

  /**
   * EVALUATION SIDE EFFECT:
   * Triggered whenever 'flippedCards' updates.
   * If 2 cards are flipped, we wait 1 second and then check for a match.
   */
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsBoardLocked(true); // Stop user from clicking more cards

      setTimeout(() => {
        const [first, second] = flippedCards;

        if (cards[first].number === cards[second].number) {
          // MATCH FOUND: Keep them flipped and mark as matched
          setCards((prevCards) => {
            const copy = [...prevCards];
            copy[first].isMatched = true;
            copy[second].isMatched = true;
            return copy;
          });
        } else {
          // MISMATCH: Flip them back over
          setCards((prevCards) => {
            const copy = [...prevCards];
            copy[first].isFlipped = false;
            copy[second].isFlipped = false;
            return copy;
          });
        }

        // Clean up: Unlock board and clear the tracker
        setIsBoardLocked(false);
        setFlippedCards([]);
      }, 1000); // 1 second "peek" time
    }
  }, [flippedCards, cards]);

  return { cards, flippedCards, resetGame, handleClick };
};

export default useGrid;
