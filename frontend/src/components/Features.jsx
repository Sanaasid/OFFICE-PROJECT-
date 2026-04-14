const Features = () => {
  return (
    <section className="py-24" id="features">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="mb-12 max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">Built for hybrid work</p>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Architected for <span className="italic text-slate-700">Hybrid</span> Flow</h2>
          <p className="max-w-2xl text-base leading-8 text-slate-600">
            OfficeSync removes the friction from workspace seating by giving teams an elegant, data-driven way to manage desks, occupancy, and booking policy.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <span className="material-symbols-outlined">sync_alt</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-950">Smart Rotation</h3>
            <p className="text-sm leading-7 text-slate-600">Keep desk assignments fair with automated rotation logic that balances fixed and flexible seats.</p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-950">Real-time States</h3>
            <p className="text-sm leading-7 text-slate-600">See occupancy, releases, and blocks at a glance so your workplace stays coordinated.</p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-1">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-slate-950">Flexible Booking</h3>
            <p className="text-sm leading-7 text-slate-600">Support easy seat reservation and admin overrides with intuitive controls.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;