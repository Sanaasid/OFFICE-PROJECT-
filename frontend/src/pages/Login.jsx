import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === 'sanasidi@gmail.com' && password === 'Sana@123') {
      window.location.href = '/dashboard';
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20 text-slate-900">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/5">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">OfficeSync</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950">Welcome back</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Sign in to continue managing your office seating platform.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Email address
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 w-full rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              Remember me
            </label>
            <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="inline-flex h-14 w-full items-center justify-center rounded-[18px] bg-blue-600 px-6 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        <div className="mt-8 text-center text-sm text-slate-600">
          Don’t have an account? <a href="/" className="font-semibold text-slate-900 hover:text-blue-600">Back to home</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
