export const generateGrid = () => {
  // Create an array of 18 numbers: [1, 2, 3... 18]
  const arr = Array.from({ length: 18 }, (_, index) => index + 1);

  /**
   * SHUFFLING:
   * We duplicate the array to make pairs, then use .sort() with Math.random.
   * NOTE: For professional apps, use 'Fisher-Yates' shuffle for better randomness.
   */
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5);

  return grid.map((item, index) => ({
    id: index,
    number: item,
    isFlipped: false,
    isMatched: false,
  }));
};
