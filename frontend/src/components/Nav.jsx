const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center gap-6 px-8">
        <div className="text-lg font-semibold tracking-tight text-slate-900">OfficeSync</div>
        <div className="hidden md:flex flex-1 justify-center gap-8 text-sm font-medium text-slate-600">
          <a className="transition hover:text-slate-900" href="#features">Features</a>
          <a className="transition hover:text-slate-900" href="#">Solutions</a>
          <a className="transition hover:text-slate-900" href="#">Pricing</a>
          <a className="transition hover:text-slate-900" href="/dashboard">Dashboard</a>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <a className="inline-flex h-12 items-center justify-center rounded-[16px] border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50" href="/login">
            Login
          </a>
          <a className="inline-flex h-12 items-center justify-center rounded-[16px] bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700" href="/dashboard">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
