const Topbar = ({ onToggleSidebar, currentSection }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col gap-5 rounded-[28px] border border-slate-200/70 bg-white/90 p-5 shadow-[0_30px_100px_-48px_rgba(15,23,42,0.20)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <button className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-700 md:hidden" onClick={onToggleSidebar} aria-label="Open sidebar">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Current section</p>
          <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">{currentSection === 'home' ? 'Dashboard' : currentSection.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</h1>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1.6fr_auto_auto] lg:grid-cols-[1.4fr_auto_auto]">
        <div className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-slate-50 px-4 py-3 shadow-sm">
          <span className="material-symbols-outlined text-slate-500">search</span>
          <input
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
            placeholder="Search seats, teams or colleagues..."
          />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-full bg-slate-100 px-4 py-3 text-sm text-slate-700 shadow-sm">
          <span className="material-symbols-outlined text-slate-500">notifications</span>
          {currentDate}
        </div>

        <button className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-sm text-white">AS</span>
          <span>Admin</span>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
