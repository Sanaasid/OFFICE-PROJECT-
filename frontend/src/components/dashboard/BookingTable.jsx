const statusStyle = {
  Confirmed: 'bg-emerald-100 text-emerald-800',
  Occupied: 'bg-sky-100 text-sky-800',
  Released: 'bg-amber-100 text-amber-800',
  Blocked: 'bg-rose-100 text-rose-800',
};

const BookingTable = ({ bookings, onAction }) => {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_30px_90px_-50px_rgba(15,23,42,0.20)]">
      <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.35em] text-slate-500">
          <tr>
            <th className="px-6 py-4">Booking ID</th>
            <th className="px-6 py-4">Seat</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {bookings.map((booking) => (
            <tr key={booking.id} className="transition hover:bg-slate-50/80">
              <td className="px-6 py-4 font-semibold text-slate-900">{booking.id}</td>
              <td className="px-6 py-4">{booking.seat}</td>
              <td className="px-6 py-4">{booking.date}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[booking.status]}`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full bg-blue-600/10 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-600/20" onClick={() => onAction(booking.id, 'release')}>
                    Release
                  </button>
                  <button className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200" onClick={() => onAction(booking.id, 'edit')}>
                    Edit
                  </button>
                  <button className="rounded-full bg-rose-100 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-200" onClick={() => onAction(booking.id, 'cancel')}>
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
