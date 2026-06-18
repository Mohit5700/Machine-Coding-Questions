import { useMemo, useState } from "react";
import { WINNING_PATTERNS } from "../utils/constants";

// Baseline state: A flat array of 9 nulls representing an empty 3x3 grid
const initialBoard = Array(9).fill(null);

const useTicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);

  /**
   * CORE GAME LOGIC: Winner Calculation
   * Checks the current board against all 8 possible winning combinations.
   * Returns the winning player and the pattern (for UI highlighting) or null.
   */
  const calculateWinner = (currentBoard) => {
    for (const [a, b, c] of WINNING_PATTERNS) {
      if (
        currentBoard[a] && // Check if the first cell in the pattern is not empty
        currentBoard[a] === currentBoard[b] && // Compare 1st to 2nd
        currentBoard[a] === currentBoard[c] // Compare 1st to 3rd
      ) {
        return { player: currentBoard[a], pattern: [a, b, c] };
      }
    }
    return null;
  };

  /**
   * PERFORMANCE OPTIMIZATION: Derived State
   * We wrap winner calculation in useMemo so we only re-calculate when
   * the 'board' array actually changes, not on every component re-render.
   */
  const winnerInfo = useMemo(() => calculateWinner(board), [board]);

  /**
   * DRAW DETECTION:
   * A draw occurs if there is no winner AND no 'null' values are left in the array.
   */
  const isDraw = !winnerInfo && !board.includes(null);

  const currentPlayer = isXTurn ? "X" : "O";

  /**
   * CELL INTERACTION HANDLER:
   * Manages the "Turn" flow and prevents illegal moves.
   */
  const handleClick = (index) => {
    // GUARD CLAUSE: If someone already won OR cell is already taken, ignore the click
    if (winnerInfo || board[index]) return;

    // IMMUTABILITY: Create a shallow copy of the board before updating state
    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);
    setIsXTurn(!isXTurn); // Switch turn
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
  };

  return { board, winnerInfo, isDraw, currentPlayer, handleClick, resetGame };
};

export default useTicTacToe;
