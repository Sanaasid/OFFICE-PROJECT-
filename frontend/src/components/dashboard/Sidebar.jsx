const navItems = [
  { key: 'home', label: 'Dashboard', icon: 'dashboard' },
  { key: 'seat-booking', label: 'Seat Booking', icon: 'event_seat' },
  { key: 'my-bookings', label: 'My Bookings', icon: 'inventory_2' },
  { key: 'block-seat', label: 'Block Seat', icon: 'block' },
  { key: 'holiday-calendar', label: 'Holiday Calendar', icon: 'calendar_month' },
  { key: 'profile', label: 'Profile', icon: 'person' },
  { key: 'logout', label: 'Logout', icon: 'exit_to_app' },
];

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 transform overflow-y-auto border-r border-slate-200/70 bg-white/95 px-4 py-6 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.35)] backdrop-blur-xl transition duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-10 flex items-center justify-between px-2">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-600">FluidWorkspace</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">London Studio</h2>
        </div>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 md:hidden" onClick={() => setSidebarOpen(false)}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav className="space-y-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActiveSection(item.key);
              setSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-left text-sm font-semibold transition ${
              activeSection === item.key
                ? 'bg-blue-600/10 text-blue-700 shadow-[0_10px_30px_-22px_rgba(59,130,246,0.8)]'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            <span className="material-symbols-outlined text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;
