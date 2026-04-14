const Floorplan = () => {
  return (
    <section className="py-24">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Floorplan insights for modern teams
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Master Your <span className="text-blue-600">Floorplan</span> Dynamics</h2>
          <p className="max-w-xl text-base leading-8 text-slate-600">
            Visualize occupancy, released seats, and admin overrides in one polished interface. Keep your workspace balanced and responsive to team needs.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-blue-600 mt-1">check_circle</span>
              <div>
                <h4 className="text-lg font-semibold text-slate-950">Occupancy Visuals</h4>
                <p className="text-slate-600">Track which desks are active and identify open capacity instantly.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-amber-600 mt-1">error</span>
              <div>
                <h4 className="text-lg font-semibold text-slate-950">Released State</h4>
                <p className="text-slate-600">Automatically mark seats as released when users check out early.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-slate-900 mt-1">info</span>
              <div>
                <h4 className="text-lg font-semibold text-slate-950">Admin Blocks</h4>
                <p className="text-slate-600">Override seating for visitors, maintenance, or priority hires with ease.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-sm">
          <img
            className="h-full w-full object-cover"
            data-alt="clean digital office floorplan interface showing a grid of modern desks"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-u8W64zh9NmAbubqqImE9Lem8Qa0AXJEzX0CHjday7wkaDFWo8oiW66TRqBNpPcBWj5d_dTcfyn2s4wxGoqWZO1CTDkD4ZN8eDJyWdb_9_uAR4AKVMeh-XqGnh21XzSc6kHCFNFA97EjrfD6h3mBwCGXkduo085fKrzB9QnTwdrY3ZZ1h7EgKeeN2JrlKN6zw9XsxBPBorzWYQNK0P9ihmYKA9GBhsuNcg0cF9yxSBmgpcZzrilAfpnWY9qh2-4PoxCFmZ2mxf7Mr"
          />
          <div className="absolute left-6 bottom-6 rounded-[20px] border border-white/70 bg-white/95 p-5 shadow-lg shadow-slate-900/10 backdrop-blur">
            <div className="text-3xl font-semibold text-slate-950">Workspace Hub</div>
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-4">
                <span>Fixed Desks</span>
                <span className="font-semibold text-slate-900">40</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Floating Spots</span>
                <span className="font-semibold text-blue-600">10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Floorplan;