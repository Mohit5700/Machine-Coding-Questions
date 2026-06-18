/**
 * SEAT.JSX
 * Handles the visual look of the seat (Booked, Selected, or Category Color)
 */
const Seat = ({ id, status, isSelected, category, onClick }) => {
  // 1. Define the base color logic
  const getBaseColor = () => {
    if (status === "booked") return "bg-gray-400 cursor-not-allowed opacity-50";
    if (isSelected) return "bg-green-500 text-white border-green-600 scale-110";

    // Colors for different categories (Matches the legend)
    switch (category) {
      case "Silver":
        return "bg-slate-200 border-slate-300 hover:bg-slate-300";
      case "Gold":
        return "bg-blue-200 border-blue-300 hover:bg-blue-300";
      case "Platinum":
        return "bg-purple-200 border-purple-300 hover:bg-purple-300";
      default:
        return "bg-slate-200";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`w-10 h-10 m-1 rounded-t-lg border-2 flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all ${getBaseColor()}`}
    >
      {id.slice(1)} {/* Just show the number like '1', '2' */}
    </div>
  );
};

export default Seat;
