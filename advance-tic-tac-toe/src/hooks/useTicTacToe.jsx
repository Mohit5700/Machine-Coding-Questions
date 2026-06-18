import { useMemo, useState } from "react";

// Helper helper function to generate an empty board array of size N * N
const createInitialBoard = (size) => Array(size * size).fill(null);

const useTicTacToe = (boardSize = 3) => {
  // Use lazy initialization so this array is only generated ONCE on mount
  const [board, setBoard] = useState(() => createInitialBoard(boardSize));
  const [isXTurn, setIsXTurn] = useState(true);

  /**
   * MEMOIZED WINNING PATTERNS GENERATION:
   * Generating patterns is computationally heavy for large boards.
   * We use useMemo here so it ONLY runs if the boardSize prop changes.
   */
  const winningPatterns = useMemo(() => {
    const patterns = [];

    // 1. Generate Horizontal and Vertical Rows
    for (let row = 0; row < boardSize; row++) {
      const horizontalPattern = [];
      const verticalPattern = [];
      for (let col = 0; col < boardSize; col++) {
        horizontalPattern.push(row * boardSize + col);
        verticalPattern.push(col * boardSize + row);
      }
      patterns.push(horizontalPattern, verticalPattern);
    }

    // 2. Generate Diagonals
    const leftToRightDiagonal = [];
    const rightToLeftDiagonal = [];
    for (let i = 0; i < boardSize; i++) {
      leftToRightDiagonal.push(i * (boardSize + 1));
      rightToLeftDiagonal.push((i + 1) * (boardSize - 1));
    }
    patterns.push(leftToRightDiagonal, rightToLeftDiagonal);

    return patterns;
  }, [boardSize]);

  /**
   * FIXED WINNER CALCULATION:
   * We loop through all generated patterns. For each pattern, we check if
   * EVERY index contains the exact same player string ("X" or "O").
   */
  const calculateWinner = (currentBoard) => {
    // 1. We loop through the list of all possible lines (Rows, Cols, Diagonals)
    for (const pattern of winningPatterns) {
      // 2. Pick the symbol in the very first slot of the current line
      const firstCell = currentBoard[pattern[0]];

      // 3. If that slot is empty, nobody can win on this line.
      // We use 'continue' to skip to the next pattern.
      if (!firstCell) continue;

      // 4. .every() is a built-in JS tool. It looks at every 'index' in our pattern
      // and checks if the board at that index matches our 'firstCell'.
      const isWinningLine = pattern.every(
        (index) => currentBoard[index] === firstCell,
      );

      // 5. If isWinningLine is true, we found a winner!
      if (isWinningLine) {
        return { player: firstCell, pattern };
      }
    }

    // 6. If the loop finishes and we found nothing, return null.
    return null;
  };

  // Derived State using useMemo
  const winnerInfo = useMemo(
    () => calculateWinner(board),
    [board, winningPatterns],
  );

  // Draw Detection
  const isDraw = !winnerInfo && !board.includes(null);
  const currentPlayer = isXTurn ? "X" : "O";

  const handleClick = (index) => {
    if (winnerInfo || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(createInitialBoard(boardSize));
    setIsXTurn(true);
  };

  return { board, winnerInfo, isDraw, currentPlayer, handleClick, resetGame };
};

export default useTicTacToe;
