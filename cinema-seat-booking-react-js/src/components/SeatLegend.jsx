const SeatLegend = () => (
  <div className="flex flex-wrap justify-center gap-6 mb-10 p-4 bg-gray-50 rounded-xl border border-gray-100">
    {[
      { label: "Silver (₹150)", color: "bg-slate-200 border-slate-300" },
      { label: "Gold (₹250)", color: "bg-blue-200 border-blue-300" },
      { label: "Platinum (₹350)", color: "bg-purple-200 border-purple-300" },
      { label: "Selected", color: "bg-green-500 border-green-600" },
      { label: "Booked", color: "bg-gray-400 border-gray-500" },
    ].map((item) => (
      <div key={item.label} className="flex items-center gap-2">
        <div className={`w-5 h-5 border rounded-t-sm ${item.color}`} />
        <span className="text-xs font-semibold text-gray-600">
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

export default SeatLegend;
