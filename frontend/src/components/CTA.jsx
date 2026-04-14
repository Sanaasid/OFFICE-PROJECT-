const CTA = () => {
  return (
    <section className="py-24">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">Ready to simplify seating?</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Ready to sync your office?</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Join modern teams optimizing their floorplans with a clean, intelligent workspace management experience.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex h-14 items-center justify-center rounded-[16px] bg-blue-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700">
              Get Started Free
            </button>
            <button className="inline-flex h-14 items-center justify-center rounded-[16px] border border-slate-300 bg-white px-8 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;