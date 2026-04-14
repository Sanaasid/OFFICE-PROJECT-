const StatsCard = ({ title, value, label, icon, accent }) => {
  return (
    <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_25px_50px_-30px_rgba(15,23,42,0.15)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_rgba(15,23,42,0.2)]">
      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl text-white shadow-lg ${accent}`}>
        <span className="material-symbols-outlined text-lg">{icon}</span>
      </div>
      <div className="mt-6 space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{title}</p>
        <p className="text-3xl font-semibold text-slate-950">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;
