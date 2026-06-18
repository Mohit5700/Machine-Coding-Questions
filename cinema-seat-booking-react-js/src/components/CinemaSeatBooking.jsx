import { useState } from "react";
// Components are split for better "Separation of Concerns"
import BookingSummary from "./BookingSummary";
import SeatLegend from "./SeatLegend";
import SeatRow from "./SeatRow";

const CinemaSeatBooking = ({
  rows = 8,
  seatPerRow = 12,
  aisleIndex = 6,
  bookedSeats = [],
  onBookingComplete,
}) => {
  // selectedSeats is an array of objects: [{id: "A1", price: 150}, ...]
  const [selectedSeats, setSelectedSeats] = useState([]);

  /**
   * PRICING LOGIC:
   * Categorizes rows based on index. This is easier to maintain than
   * hardcoding values into every single seat.
   */
  const getSeatDetails = (rIdx) => {
    if (rIdx < 3) return { category: "Silver", price: 150 };
    if (rIdx < 6) return { category: "Gold", price: 250 };
    return { category: "Platinum", price: 350 };
  };

  /**
   * TOGGLE LOGIC:
   * A "Set" behavior. If the seat exists, remove it (Deselect).
   * If it doesn't, add it (Select).
   */
  const toggleSeat = (id, price) => {
    // Guard Clause: Don't allow selecting seats already owned by others
    if (bookedSeats.includes(id)) return;

    setSelectedSeats(
      (prev) =>
        prev.find((s) => s.id === id)
          ? prev.filter((s) => s.id !== id) // Remove
          : [...prev, { id, price }], // Add
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) return;

    // Calculate total on the fly before sending to API
    const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);
    onBookingComplete({
      seatIds: selectedSeats.map((s) => s.id),
      totalPrice: total,
    });
    setSelectedSeats([]); // Reset local UI state after success
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Cinema Hall</h2>

      <SeatLegend />

      {/* SCREEN VISUALIZATION: Helps user orientation */}
      <div className="w-full max-w-2xl mb-16">
        <div className="w-full h-2 bg-slate-300 rounded-full shadow-sm mb-2" />
        <p className="text-center text-[10px] tracking-[.5em] text-gray-400 font-bold uppercase">
          Screen
        </p>
      </div>

      {/* GRID GENERATION: Creates row components based on 'rows' prop */}
      <div className="flex flex-col gap-3">
        {[...Array(rows)].map((_, rIdx) => (
          <SeatRow
            key={rIdx}
            // Converts index 0 to 'A', 1 to 'B', etc.
            rowLetter={String.fromCharCode(65 + rIdx)}
            rowIdx={rIdx}
            seatsPerRow={seatPerRow}
            aisleIndex={aisleIndex}
            getSeatDetails={getSeatDetails}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
            toggleSeat={toggleSeat}
          />
        ))}
      </div>

      <div className="w-full max-w-lg mt-12">
        <BookingSummary selectedSeats={selectedSeats} onBook={handleConfirm} />
      </div>
    </div>
  );
};

export default CinemaSeatBooking;
