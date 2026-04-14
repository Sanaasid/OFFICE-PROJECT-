const Hero = () => {
  return (
    <section className="relative py-24">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            Smart office seating in one simple platform
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Effortless Office Seating for <span className="text-blue-600">Modern Teams.</span>
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            Give your hybrid workplace a polished seating experience with transparent desk states, reservation control, and intelligent team rotation.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="/dashboard" className="inline-flex h-14 items-center justify-center rounded-[16px] bg-blue-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700">
              Get Started
            </a>
            <button className="inline-flex h-14 items-center justify-center rounded-[16px] border border-slate-300 bg-white px-8 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              See how it works
            </button>
          </div>
        </div>
        <div className="hidden lg:block relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-slate-100 to-white opacity-75" />
          <div className="relative p-8 sm:p-10">
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
              <img className="h-[520px] w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7zszC_Pmie_S7IWwdFeg7h46hdSWCrpekaME98DQ4jMIXT7GKDZuLgz8du7ElAizy_TquokUEzHtCjvSQ1EkMCANb5B1rsX5pYzZCFAfm7s99nLK4uGUeu0DiU4nUIX2VINBxyIIKOKzqwr1bPcW6pGwDEfaEOp0Un0SttWHmpeNTvcKwMgTtNQub5JSMqFooOp_9XI6GTe5qigRBoKOKWiShwaZyduSl7lTH3znGRGLE-3mtRFCk-IjvQFjSGvnaZJzva15n8PYG" alt="Modern office seating design" />
            </div>
            <div className="absolute left-8 bottom-8 rounded-[20px] border border-white/70 bg-white/90 p-5 shadow-lg shadow-slate-900/10 backdrop-blur">
              <div className="text-3xl font-semibold text-slate-900">84%</div>
              <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Occupancy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;