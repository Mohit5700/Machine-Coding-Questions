import "./App.css";
import CinemaSeatBooking from "./components/CinemaSeatBooking";

const App = () => {
  // 1. Initial data: This would typically come from your Backend/API
  const alreadyBooked = ["A1", "A8", "B3", "C12", "F5", "G2"];

  // 2. The Final Action: What happens after the user clicks "Confirm"?
  const handleBookingComplete = (bookingDetails) => {
    console.log("Final Booking Details sent to Server:", bookingDetails);
    alert(`Success! You have booked: ${bookingDetails.seatIds.join(", ")}`);
  };

  return (
    <div className="app-container">
      <CinemaSeatBooking
        rows={10}
        seatPerRow={12}
        aisleIndex={6}
        bookedSeats={alreadyBooked}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
};

export default App;
