import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import StatsCard from '../components/dashboard/StatsCard';
import SeatGrid from '../components/dashboard/SeatGrid';
import BookingTable from '../components/dashboard/BookingTable';
import Modal from '../components/dashboard/Modal';
import Calendar from '../components/dashboard/Calendar';

const seatStatuses = ['Fixed', 'Occupied', 'Released', 'Blocked', 'Available'];

const buildSeats = (sourceSeats = []) => {
  const seatLookup = new Map(
    sourceSeats
      .filter((seat) => Number.isFinite(Number(seat?.number)))
      .map((seat) => [Number(seat.number), seat])
  );

  return Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    const sourceSeat = seatLookup.get(number);
    const fixedSeat = number <= 40;
    const status = fixedSeat ? 'Fixed' : sourceSeat?.status ?? 'Available';
    const employeeId = `EMP${100 + number}`;

    return {
      number,
      name: `Seat ${number}`,
      status,
      batch: number <= 25 ? 'Batch 1' : 'Batch 2',
      employeeId,
      user: fixedSeat ? employeeId : status === 'Available' ? 'Open desk' : sourceSeat?.user ?? employeeId,
    };
  });
};

const bookingItems = [
  { id: 'BK-1128', seat: '12A', date: '2026-04-21', status: 'Confirmed' },
  { id: 'BK-1142', seat: '07B', date: '2026-04-22', status: 'Occupied' },
  { id: 'BK-1165', seat: '23C', date: '2026-04-23', status: 'Released' },
  { id: 'BK-1190', seat: '18A', date: '2026-04-24', status: 'Blocked' },
];

const holidayDates = [
  { date: '2026-04-25', label: 'Office Holiday' },
  { date: '2026-05-01', label: 'Labor Day' },
  { date: '2026-05-05', label: 'Team Retreat' },
];

const adminCards = [
  { title: 'Add Holiday', description: 'Set the calendar and disable seat booking during holidays.' },
  { title: 'Manage Users', description: 'Invite new team members and assign seat roles.' },
  { title: 'Edit Seat Allocation', description: 'Adjust seat blocks and batch allocations.' },
  { title: 'Weekly Rotation Config', description: 'Fine-tune batch schedules and desk rules.' },
];

const statusColors = {
  Fixed: 'bg-rose-500/10 text-rose-700 ring-rose-500/20',
  Occupied: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20',
  Released: 'bg-amber-400/10 text-amber-700 ring-amber-400/20',
  Blocked: 'bg-sky-500/10 text-sky-700 ring-sky-500/20',
  Available: 'bg-slate-200/70 text-slate-700 ring-slate-200',
};

const apiBase = import.meta.env.VITE_API_URL || '/api';

const dayShortNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayLongNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const parseDateString = (value) => {
  if (!value || typeof value !== 'string') {
    return new Date();
  }

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) {
    return new Date();
  }

  return new Date(year, month - 1, day);
};

const getRotationForDate = (dateValue) => {
  const date = typeof dateValue === 'string' ? parseDateString(dateValue) : new Date(dateValue);
  const dayIndex = date.getDay();
  const weekNumber = Math.max(1, Math.ceil(date.getDate() / 7));
  const effectiveDayIndex = dayIndex === 0 || dayIndex === 6 ? 5 : dayIndex;
  const weekOnePattern = weekNumber % 2 === 1;

  const fixedBatch = weekOnePattern
    ? effectiveDayIndex <= 3
      ? 1
      : 2
    : effectiveDayIndex <= 3
      ? 2
      : 1;

  return {
    fixedBatch,
    weekNumber,
    dayIndex,
    dayShort: dayShortNames[dayIndex],
    dayLong: dayLongNames[dayIndex],
  };
};

const renderHome = ({ stats, quickAction }) => (
  <div className="space-y-8">
    <section className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Live occupancy
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950">84% Occupancy</h1>
          <p className="mt-3 text-sm text-slate-500">Central Studio Floorplan • Wednesday, Oct 24</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">Filter by team</button>
          <button className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Export data</button>
        </div>
      </div>
    </section>

    <div className="grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
      <div className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.25)]">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Live workspace map</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Main Production Floor</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex max-w-[110px] items-center justify-center whitespace-nowrap rounded-full bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-700">Fixed</span>
            <span className="inline-flex max-w-[110px] items-center justify-center whitespace-nowrap rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">Occupied</span>
            <span className="inline-flex max-w-[110px] items-center justify-center whitespace-nowrap rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700">Released</span>
            <span className="inline-flex max-w-[110px] items-center justify-center whitespace-nowrap rounded-full bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-700">Blocked</span>
            <span className="inline-flex max-w-[110px] items-center justify-center whitespace-nowrap rounded-full bg-slate-500/10 px-3 py-1.5 text-xs font-semibold text-slate-700">Available</span>
          </div>
        </div>

        <div className="grid gap-4 rounded-[28px] bg-slate-50 p-6">
          <div className="grid grid-cols-8 gap-3">
            {stats.layoutSeats.map((seat) => (
              <div key={seat.number} className={`h-12 rounded-xl ${seat.color}`} />
            ))}
          </div>
        </div>
      </div>

      <aside className="rounded-[32px] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Quick actions</p>
        <h3 className="mt-3 text-xl font-semibold text-slate-950">Selected: Desk 42B</h3>

        <div className="mt-6 space-y-4">
          <div className="rounded-[24px] bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Current status</p>
            <div className="mt-3 inline-flex rounded-full bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700">Occupied</div>
          </div>
          <div className="rounded-[24px] bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">User</p>
            <p className="mt-2 text-sm font-semibold text-slate-950">David Sterling</p>
          </div>
          <div className="rounded-[24px] bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Team</p>
            <p className="mt-2 text-sm font-semibold text-slate-950">Architecture</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button onClick={() => quickAction('swap')} className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Request Seat Swap</button>
          <button onClick={() => quickAction('release')} className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">Release This Seat</button>
        </div>
      </aside>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.22)]">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Weekly trend</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-950">+12.4%</h3>
        <p className="mt-3 text-sm text-slate-600">Increase in workspace utilization from last week.</p>
      </div>
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.22)]">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Flexibility score</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-950">9.2</h3>
        <p className="mt-3 text-sm text-slate-600">Based on release/re-booking speed in London studio.</p>
      </div>
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.22)]">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Active users</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="grid -space-x-3 overflow-hidden rounded-full">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=80" alt="" className="h-11 w-11 rounded-full border-2 border-white object-cover" />
            <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=64&q=80" alt="" className="h-11 w-11 rounded-full border-2 border-white object-cover" />
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&q=80" alt="" className="h-11 w-11 rounded-full border-2 border-white object-cover" />
          </div>
          <span className="text-sm font-semibold text-slate-950">+42 on site</span>
        </div>
        <p className="mt-3 text-sm text-slate-600">42 colleagues currently on-site in the production zone.</p>
      </div>
    </div>
  </div>
);

const renderSeatBooking = ({ selectedWeek, selectedDay, seats, setSelectedSeat, quickAction, setSelectedDay, setSelectedWeek, fixedBatch, rotationWeek, rotationDay, onCalendarDateSelect }) => (
  <div className="space-y-8">
    <section className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)]">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Seat booking</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Select your desk</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Choose the best seat for your team and manage reservations with confidence.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[auto_auto]">
          <div className="rounded-full bg-slate-100 p-1 ring-1 ring-slate-200">
            <select
              value={selectedWeek}
              onChange={(event) => setSelectedWeek(event.target.value)}
              className="h-12 rounded-full border-none bg-transparent px-5 text-sm font-semibold text-slate-900 outline-none"
            >
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week) => (
                <option key={week} value={week}>{week}</option>
              ))}
            </select>
          </div>
          <div className="rounded-full bg-slate-100 p-2 ring-1 ring-slate-200">
            <div className="grid grid-cols-5 gap-2 px-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${selectedDay === day ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'bg-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-900'}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="grid gap-6 xl:grid-cols-[1.7fr_0.46fr]">
      <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)] min-w-0">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Seat layout</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">Office seat map</h3>
            <p className="mt-2 text-sm text-slate-500">Rotation: Week {rotationWeek} • {rotationDay}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Fixed Seats: Batch {fixedBatch}</span>
        </div>
        <SeatGrid seats={seats} onSelectSeat={setSelectedSeat} />
      </div>

      <aside className="space-y-6">
        <Calendar bookings={seats} holidays={[
          { date: '2026-04-25', label: 'Office Holiday' },
          { date: '2026-05-01', label: 'Labor Day' },
          { date: '2026-05-05', label: 'Team Retreat' },
        ]} onDateSelect={onCalendarDateSelect} />

        <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Legend</p>
              <h4 className="mt-2 text-lg font-semibold text-slate-950">Seat status</h4>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ['Fixed', 'bg-rose-500/10 text-rose-700'],
              ['Occupied', 'bg-emerald-500/10 text-emerald-700'],
              ['Released', 'bg-amber-400/10 text-amber-700'],
              ['Blocked', 'bg-sky-500/10 text-sky-700'],
              ['Available', 'bg-slate-200/10 text-slate-700'],
            ].map(([label, color]) => (
              <div key={label} className="flex items-center gap-3 rounded-3xl border border-slate-200/70 bg-white/90 px-3 py-2 shadow-sm">
                <span className={`inline-flex h-3.5 min-w-[0.75rem] rounded-full ${color}`} />
                <span className="truncate text-sm font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Quick controls</p>
              <h4 className="mt-2 text-lg font-semibold text-slate-950">Actions</h4>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {['Book Now', 'Release'].map((label) => (
              <button key={label} onClick={() => quickAction(label.toLowerCase().split(' ')[0])} className="w-full rounded-[20px] bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                {label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
);

const renderMyBookings = (bookings) => (
  <div className="space-y-6">
    <section className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)]">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">My bookings</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">Your current reservations</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Track reservation status and manage upcoming seat assignments in one central place.</p>
    </section>
    <BookingTable bookings={bookings} onAction={() => {}} />
  </div>
);

const renderOfficeAnalytics = () => (
  <div className="space-y-6">
    <section className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)]">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Office analytics</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">Capacity and trends</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Analyze seat usage and occupancy trends across the business floor.</p>
    </section>
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">Peak occupancy</p>
        <p className="mt-4 text-4xl font-semibold text-slate-950">84%</p>
        <p className="mt-3 text-sm text-slate-600">Highest desk usage recorded this week.</p>
      </div>
      <div className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">Release ratio</p>
        <p className="mt-4 text-4xl font-semibold text-slate-950">15%</p>
        <p className="mt-3 text-sm text-slate-600">Percentage of desks released early or made available.</p>
      </div>
    </div>
  </div>
);

const renderSettings = () => (
  <div className="space-y-6">
    <section className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)]">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Settings</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">Workspace preferences</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Control notification, booking rules, and seat assignment defaults.</p>
    </section>
    <div className="grid gap-6 lg:grid-cols-2">
      {[
        ['Notifications', 'On'],
        ['Auto-assign', 'Enabled'],
        ['Holiday lock', 'Active'],
        ['Team filters', 'Workspace teams'],
      ].map(([label, value]) => (
        <div key={label} className="rounded-[24px] border border-slate-200/70 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-3 text-lg font-semibold text-slate-950">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

const renderHolidayCalendar = () => (
  <div className="space-y-6">
    <section className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)]">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Holiday calendar</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">Planned time off</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">View upcoming holidays and how they affect seat bookings across the office.</p>
    </section>
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)]">
        <div className="grid gap-4 sm:grid-cols-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="rounded-[20px] bg-slate-50 p-4 text-center text-sm font-semibold text-slate-700">{day}</div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {holidayDates.map((holiday) => (
            <div key={holiday.date} className="rounded-[24px] border border-slate-200/70 bg-slate-50 p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-950">{holiday.date}</p>
              <p className="mt-2 text-sm text-slate-600">{holiday.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Calendar notes</p>
        <ul className="mt-5 space-y-3 text-sm text-slate-600">
          <li>All bookings are blocked on official holidays.</li>
          <li>Rapid booking changes sync instantly across teams.</li>
          <li>Holiday dates are locked to prevent seat conflicts.</li>
        </ul>
      </div>
    </div>
  </div>
);

const renderAdminPanel = () => (
  <div className="space-y-6">
    <section className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)]">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Admin tools</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">Control center</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Configure seat policies, adjust holiday schedules, and manage office capacity from one premium dashboard.</p>
    </section>
    <div className="grid gap-6 lg:grid-cols-2">
      {adminCards.map((card) => (
        <div key={card.title} className="rounded-[24px] border border-slate-200/70 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white">
          <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Admin</div>
          <h3 className="text-xl font-semibold text-slate-950">{card.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const renderProfile = () => (
  <div className="rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)]">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Profile</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Admin User</h2>
      </div>
      <button className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700">Edit profile</button>
    </div>
    <div className="mt-8 grid gap-6 sm:grid-cols-2">
      {[
        ['Email', 'admin@officesync.com'],
        ['Role', 'Administrator'],
        ['Team', 'Workspace Operations'],
        ['Location', 'Head Office'],
      ].map(([label, value]) => (
        <div key={label} className="rounded-[24px] bg-slate-50 p-6">
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-base font-semibold text-slate-950">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

const renderLogout = () => (
  <div className="rounded-[28px] border border-slate-200/70 bg-white p-12 text-center shadow-[0_30px_80px_-60px_rgba(15,23,42,0.25)]">
    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Logout</p>
    <h2 className="mt-4 text-3xl font-semibold text-slate-950">You are logged out</h2>
    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Thank you for using OfficeSync. Please login again to access your dashboard.</p>
  </div>
);

const Dashboard = ({ initialSection = 'home' }) => {
  const initialRotation = getRotationForDate('2026-04-21');
  const [activeSection, setActiveSection] = useState(initialSection);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedDay, setSelectedDay] = useState(initialRotation.dayShort);
  const [selectedWeek, setSelectedWeek] = useState(`Week ${initialRotation.weekNumber}`);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('2026-04-21');
  const [bookingDate, setBookingDate] = useState('2026-04-21');
  const [selectedBookingSeat, setSelectedBookingSeat] = useState('1');
  const [selectedBookingBatch, setSelectedBookingBatch] = useState('Batch 1');
  const [bookingUserName, setBookingUserName] = useState('');
  const [bookingEmpId, setBookingEmpId] = useState('');
  const [seats, setSeats] = useState([]);

  const rotation = useMemo(() => getRotationForDate(selectedCalendarDate), [selectedCalendarDate]);
  const activeSeats = useMemo(() => {
    const sourceSeats = seats.length ? seats : buildSeats();
    return sourceSeats.map((seat) =>
      seat.number <= 40
        ? {
            ...seat,
            batch: `Batch ${rotation.fixedBatch}`,
          }
        : seat
    );
  }, [seats, rotation.fixedBatch]);
  const availableSeats = useMemo(() => activeSeats.filter((seat) => seat.status === 'Available'), [activeSeats]);
  const availableSeatsForBatch = useMemo(
    () => availableSeats.filter((seat) => seat.batch === selectedBookingBatch),
    [availableSeats, selectedBookingBatch]
  );

  useEffect(() => {
    fetch(`${apiBase}/seats`)
      .then((response) => response.json())
      .then((data) => setSeats(buildSeats(data)))
      .catch(() => setSeats(buildSeats()));
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (!availableSeatsForBatch.length) {
      setSelectedBookingSeat('');
      return;
    }

    setSelectedBookingSeat(String(availableSeatsForBatch[0].number));
  }, [availableSeatsForBatch]);

  useEffect(() => {
    setSelectedDay(rotation.dayShort);
    setSelectedWeek(`Week ${rotation.weekNumber}`);
  }, [rotation.dayShort, rotation.weekNumber]);

  const stats = useMemo(() => {
    const sourceSeats = activeSeats;
    const totalAvailable = sourceSeats.filter((seat) => seat.status === 'Available').length;
    const occupied = sourceSeats.filter((seat) => seat.status === 'Occupied').length;
    const floating = sourceSeats.filter((seat) => seat.status === 'Blocked').length;
    const layoutSeats = sourceSeats.map((seat) => ({
      number: seat.number,
      color:
        seat.status === 'Fixed'
          ? 'bg-rose-500/80'
          : seat.status === 'Occupied'
          ? 'bg-emerald-500/80'
          : seat.status === 'Released'
          ? 'bg-amber-400/80'
          : seat.status === 'Blocked'
          ? 'bg-sky-500/80'
          : 'bg-slate-300/80',
    }));

    return { totalAvailable, occupied, floating, bookingsCount: bookingItems.length, layoutSeats };
  }, [activeSeats]);

  const handleCalendarDateSelect = (date) => {
    setSelectedCalendarDate(date);
    setBookingDate(date);
  };

  const quickAction = (action) => {
    if (action === 'book') {
      if (!availableSeats.length) {
        setToastMessage('No available seats to book right now.');
        return;
      }
      setSelectedBookingBatch(availableSeats[0].batch);
      setSelectedBookingSeat(String(availableSeats[0].number));
      setBookingUserName('');
      setBookingEmpId('');
      setBookingFormOpen(true);
      return;
    }
    setToastMessage(`${action} action is ready to use.`);
  };

  const handleSeatAction = (action) => {
    if (!selectedSeat) return;

    if (action === 'Book') {
      if (selectedSeat.status !== 'Available') {
        setToastMessage('Only Available seats can be booked.');
        return;
      }
      setSelectedBookingBatch(selectedSeat.batch);
      setSelectedBookingSeat(String(selectedSeat.number));
      setBookingUserName('');
      setBookingEmpId(selectedSeat.employeeId ?? `EMP${100 + selectedSeat.number}`);
      setBookingFormOpen(true);
      return;
    }

    if (action === 'Release') {
      if (selectedSeat.status !== 'Occupied') {
        setToastMessage('Sorry, this seat is already not occupied.');
        return;
      }

      const confirmed = window.confirm(`Confirm ${action} for seat ${selectedSeat.number}?`);
      if (!confirmed) {
        return;
      }

      setSeats((previousSeats) => {
        const sourceSeats = previousSeats.length ? previousSeats : buildSeats();
        return sourceSeats.map((seat) =>
          seat.number === selectedSeat.number
            ? {
                ...seat,
                status: 'Available',
                user: 'Open desk',
              }
            : seat
        );
      });

      setToastMessage(`Seat ${selectedSeat.number} released successfully and is now Available.`);
      setSelectedSeat((previousSeat) =>
        previousSeat
          ? {
              ...previousSeat,
              status: 'Available',
              user: 'Open desk',
            }
          : previousSeat
      );
      return;
    }

    const confirmed = window.confirm(`Confirm ${action} for seat ${selectedSeat.number}?`);
    if (confirmed) {
      setToastMessage(`${action} action completed for seat ${selectedSeat.number}.`);
      setSelectedSeat(null);
    }
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();

    if (!bookingUserName.trim() || !bookingEmpId.trim()) {
      setToastMessage('Please enter both Name and EMP ID.');
      return;
    }

    if (!selectedBookingSeat) {
      setToastMessage(`No available seats found in ${selectedBookingBatch}.`);
      return;
    }

    setSeats((previousSeats) => {
      const sourceSeats = previousSeats.length ? previousSeats : buildSeats();
      return sourceSeats.map((seat) =>
        String(seat.number) === String(selectedBookingSeat)
          ? {
              ...seat,
              status: 'Occupied',
              user: `${bookingUserName.trim()} (${bookingEmpId.trim().toUpperCase()})`,
              employeeId: bookingEmpId.trim().toUpperCase(),
            }
          : seat
      );
    });

    if (selectedSeat && String(selectedSeat.number) === String(selectedBookingSeat)) {
      setSelectedSeat((prev) =>
        prev
          ? {
              ...prev,
              status: 'Occupied',
              user: `${bookingUserName.trim()} (${bookingEmpId.trim().toUpperCase()})`,
              employeeId: bookingEmpId.trim().toUpperCase(),
            }
          : prev
      );
    }

    setToastMessage(`Seat ${selectedBookingSeat} booked successfully. Status updated to Occupied.`);
    setBookingFormOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'seat-booking':
      case 'block-seat':
        return renderSeatBooking({
          selectedWeek,
          selectedDay,
          seats: activeSeats,
          setSelectedSeat,
          quickAction,
          setSelectedDay,
          setSelectedWeek,
          fixedBatch: rotation.fixedBatch,
          rotationWeek: rotation.weekNumber,
          rotationDay: rotation.dayLong,
          onCalendarDateSelect: handleCalendarDateSelect,
        });
      case 'my-bookings':
        return renderMyBookings(bookingItems);
      case 'office-analytics':
        return renderOfficeAnalytics();
      case 'settings':
        return renderSettings();
      case 'holiday-calendar':
        return renderHolidayCalendar();
      case 'profile':
        return renderProfile();
      case 'logout':
        return renderLogout();
      default:
        return renderHome({ stats, quickAction });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/95 text-slate-900">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-slate-900/40 md:hidden" />}

      <div className="md:pl-72">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-6">
          <Topbar onToggleSidebar={() => setSidebarOpen(true)} currentSection={activeSection} />
          <div className="mt-6">{renderContent()}</div>
        </div>
      </div>

      <Modal open={!!selectedSeat} title={`Seat ${selectedSeat?.number}`} onClose={() => setSelectedSeat(null)}>
        {selectedSeat && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Status</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{selectedSeat.status}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Assigned user</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{selectedSeat.user}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Batch</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{selectedSeat.batch}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Seat number</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{selectedSeat.number}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Employee ID</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{selectedSeat.employeeId ?? '-'}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => handleSeatAction('Book')} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Book Now</button>
              <button onClick={() => handleSeatAction('Release')} className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200">Release</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={bookingFormOpen} title="Book a Seat" onClose={() => setBookingFormOpen(false)}>
        <form onSubmit={handleBookingSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700">User name</label>
            <input
              value={bookingUserName}
              onChange={(event) => setBookingUserName(event.target.value)}
              placeholder="Enter employee name"
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Employee ID</label>
            <input
              value={bookingEmpId}
              onChange={(event) => setBookingEmpId(event.target.value)}
              placeholder="EMP101"
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Booking date</label>
            <input type="date" value={bookingDate} onChange={(event) => setBookingDate(event.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Batch</label>
            <select value={selectedBookingBatch} onChange={(event) => setSelectedBookingBatch(event.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none">
              {['Batch 1', 'Batch 2'].map((batch) => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Seat selector</label>
            <select value={selectedBookingSeat} onChange={(event) => setSelectedBookingSeat(event.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none">
              {availableSeatsForBatch.map((seat) => (
                <option key={seat.number} value={seat.number}>Seat {seat.number} — {seat.status}</option>
              ))}
              {!availableSeatsForBatch.length && <option value="">No available seats in {selectedBookingBatch}</option>}
            </select>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="inline-flex h-12 items-center justify-center rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700">Confirm booking</button>
            <button type="button" onClick={() => setBookingFormOpen(false)} className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
          </div>
        </form>
      </Modal>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-[24px] bg-slate-950 px-6 py-4 text-sm text-white shadow-2xl shadow-slate-950/20">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
