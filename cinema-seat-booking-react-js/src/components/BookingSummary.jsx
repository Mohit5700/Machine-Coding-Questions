/**
 * BOOKINGSUMMARY.JSX
 * Derived State: Calculates total price based on the selectedSeats array.
 */

const BookingSummary = ({ selectedSeats, onBook }) => {
  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  if (selectedSeats.length === 0)
    return <p className="text-gray-500 mt-4">Select a seat to start.</p>;

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold">Summary</h3>
      <p>Seats: {selectedSeats.map((s) => s.id).join(", ")}</p>
      <p className="text-xl font-bold text-green-700">Total: ₹{total}</p>
      <button
        onClick={onBook}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingSummary;
