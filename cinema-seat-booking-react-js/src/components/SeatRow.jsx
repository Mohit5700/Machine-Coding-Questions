import Seat from "./Seat";

const SeatRow = ({
  rowLetter,
  rowIdx,
  seatsPerRow,
  aisleIndex,
  getSeatDetails,
  bookedSeats,
  selectedSeats,
  toggleSeat,
}) => {
  // Get pricing for this specific row once
  const { category, price } = getSeatDetails(rowIdx);

  return (
    <div className="flex items-center">
      {/* Row Label (e.g., A, B, C) */}
      <span className="w-6 font-bold text-gray-300 text-sm mr-6">
        {rowLetter}
      </span>

      <div className="flex">
        {[...Array(seatsPerRow)].map((_, sIdx) => {
          const id = `${rowLetter}${sIdx + 1}`; // e.g., "A1"

          return (
            <div key={id} className="flex">
              {/* AISLE LOGIC: If current index matches aisleIndex, insert empty space */}
              {sIdx === aisleIndex && <div className="w-12" />}

              <Seat
                id={id}
                price={price}
                category={category}
                status={bookedSeats.includes(id) ? "booked" : "available"}
                isSelected={selectedSeats.some((s) => s.id === id)}
                onClick={() => toggleSeat(id, price)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatRow;
