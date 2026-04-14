const statusStyles = {
  Fixed: 'bg-rose-500/10 text-rose-700 border-rose-200/70',
  Occupied: 'bg-emerald-500/10 text-emerald-700 border-emerald-200/70',
  Released: 'bg-amber-400/10 text-amber-700 border-amber-200/70',
  Blocked: 'bg-sky-500/10 text-sky-700 border-sky-200/70',
  Available: 'bg-slate-400/10 text-slate-700 border-slate-300/70',
};

const cardStyles = {
  Fixed: 'bg-rose-50/80 border-rose-200/70',
  Occupied: 'bg-emerald-50/70 border-emerald-200/60',
  Released: 'bg-amber-50/70 border-amber-200/60',
  Blocked: 'bg-sky-50/70 border-sky-200/60',
  Available: 'bg-slate-50/80 border-slate-200/70',
};

const SeatGrid = ({ seats, onSelectSeat }) => {
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {seats.map((seat) => (
        <button
          key={seat.number}
          onClick={() => onSelectSeat(seat)}
          className={`group min-h-[120px] rounded-[24px] border p-3 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${cardStyles[seat.status]}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold tracking-[0.02em] text-slate-600">{seat.name}</p>
              <h3 className="mt-2 truncate text-sm font-semibold text-slate-950">{seat.user}</h3>
            </div>
            <span className={`inline-flex max-w-[90px] items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyles[seat.status]}`}>
              {seat.status}
            </span>
          </div>
          <div className="mt-5 text-sm text-slate-500">
            <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{seat.batch}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SeatGrid;
