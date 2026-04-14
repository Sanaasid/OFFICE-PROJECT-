const Footer = () => {
  return (
    <footer className="bg-slate-50 py-12">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <div className="text-xl font-semibold text-slate-950">OfficeSync</div>
          <p className="max-w-md text-sm leading-7 text-slate-600">
            A smarter way to manage office seating with clear visibility, smooth desk transitions, and modern workspace controls.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Product</h4>
          <a className="block text-sm text-slate-600 transition hover:text-slate-900" href="#features">Features</a>
          <a className="block text-sm text-slate-600 transition hover:text-slate-900" href="#">Floorplans</a>
          <a className="block text-sm text-slate-600 transition hover:text-slate-900" href="#">Integrations</a>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Support</h4>
          <a className="block text-sm text-slate-600 transition hover:text-slate-900" href="#">Contact</a>
          <a className="block text-sm text-slate-600 transition hover:text-slate-900" href="#">Terms</a>
          <a className="block text-sm text-slate-600 transition hover:text-slate-900" href="#">Privacy</a>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1280px] flex-col gap-4 border-t border-slate-200 px-8 pt-8 text-sm text-slate-500 md:flex-row md:justify-between md:items-center">
        <p>© 2026 OfficeSync. All rights reserved.</p>
        <div className="flex gap-4 text-slate-500">
          <span className="material-symbols-outlined cursor-pointer transition hover:text-slate-900">public</span>
          <span className="material-symbols-outlined cursor-pointer transition hover:text-slate-900">chat</span>
          <span className="material-symbols-outlined cursor-pointer transition hover:text-slate-900">share</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;