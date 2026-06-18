import useTicTacToe from "../hooks/useTicTacToe";

const TicTacToe = () => {
  // Destructure everything needed from our Custom Hook "Brain"
  const { board, winnerInfo, isDraw, currentPlayer, handleClick, resetGame } =
    useTicTacToe();

  return (
    <div className="game">
      {/* STATUS SECTION: Dynamic messaging based on game progress */}
      <div className="status">
        <p>
          {winnerInfo
            ? `Player ${winnerInfo.player} wins!`
            : isDraw
              ? "It's a draw!"
              : `Player ${currentPlayer} turn`}
        </p>
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      {/* GAME BOARD: 3x3 Grid Layout */}
      <div className="board">
        {board.map((cell, index) => {
          /**
           * WINNING HIGHLIGHT LOGIC:
           * If a winner exists, we check if this specific cell index
           * is part of the winning 3-cell pattern.
           */
          const isWinningCell = winnerInfo?.pattern.includes(index);

          return (
            <button
              key={index}
              className={`cell ${isWinningCell ? "winning-cell" : ""}`}
              onClick={() => handleClick(index)}
              // Accessibility/UX: Disable button if already filled
              disabled={cell !== null}
            >
              {cell}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
