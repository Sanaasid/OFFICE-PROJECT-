import Nav from './components/Nav';
import Hero from './components/Hero';
import Features from './components/Features';
import Floorplan from './components/Floorplan';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const pathname = window.location.pathname;

  if (pathname === '/login') {
    return <Login />;
  }

  if (pathname === '/dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Nav />
      <main className="pt-24">
        <div className="mx-auto w-full max-w-[1280px] px-8">
          <Hero />
          <Features />
          <Floorplan />
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
