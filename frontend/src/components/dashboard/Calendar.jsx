import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './Calendar.css';

const getInitialSelectedDate = () => {
  const today = new Date();
  const day = today.getDay();

  if (day === 6) {
    const monday = new Date(today);
    monday.setDate(today.getDate() + 2);
    return monday;
  }

  if (day === 0) {
    const monday = new Date(today);
    monday.setDate(today.getDate() + 1);
    return monday;
  }

  return today;
};

const toValidDate = (value) => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const toDateMap = (items) => {
  const map = new Map();

  items.forEach((item) => {
    const parsed = toValidDate(item?.date);
    if (parsed) {
      map.set(format(parsed, 'yyyy-MM-dd'), item);
    }
  });

  return map;
};

const Calendar = ({ bookings = [], holidays = [], onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(getInitialSelectedDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const bookingByDate = useMemo(() => toDateMap(bookings), [bookings]);
  const holidayByDate = useMemo(() => toDateMap(holidays), [holidays]);

  const bookedDates = useMemo(
    () => Array.from(bookingByDate.keys()).map((dateKey) => parseISO(dateKey)),
    [bookingByDate]
  );

  const holidayDates = useMemo(
    () => Array.from(holidayByDate.keys()).map((dateKey) => parseISO(dateKey)),
    [holidayByDate]
  );

  const selectedDateKey = format(selectedDate, 'yyyy-MM-dd');
  const selectedHoliday = holidayByDate.get(selectedDateKey);
  const selectedBooked = bookingByDate.has(selectedDateKey);

  const handleSelect = (date) => {
    if (!date) {
      return;
    }

    setSelectedDate(date);
    onDateSelect?.(format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="booking-calendar-card">
      <DayPicker
        mode="single"
        required
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        selected={selectedDate}
        onSelect={handleSelect}
        disabled={[{ dayOfWeek: [0, 6] }]}
        showOutsideDays
        modifiers={{
          weekendHoliday: { dayOfWeek: [0, 6] },
          booked: bookedDates,
          holiday: holidayDates
        }}
        modifiersClassNames={{
          weekendHoliday: 'booking-day-weekend-holiday',
          booked: 'booking-day-booked',
          holiday: 'booking-day-holiday'
        }}
        components={{
          Chevron: ({ orientation }) => (
            <span className="material-symbols-outlined booking-chevron" aria-hidden="true">
              {orientation === 'left' ? 'chevron_left' : 'chevron_right'}
            </span>
          )
        }}
        classNames={{
          root: 'booking-rdp-root',
          month: 'booking-rdp-month',
          month_caption: 'booking-rdp-caption',
          caption_label: 'booking-rdp-caption-label',
          nav: 'booking-rdp-nav',
          button_previous: 'booking-rdp-nav-btn',
          button_next: 'booking-rdp-nav-btn',
          month_grid: 'booking-rdp-grid',
          weekdays: 'booking-rdp-weekdays',
          weekday: 'booking-rdp-weekday',
          week: 'booking-rdp-week',
          day: 'booking-rdp-day',
          day_button: 'booking-rdp-day-btn',
          selected: 'booking-rdp-selected',
          today: 'booking-rdp-today',
          disabled: 'booking-rdp-disabled',
          outside: 'booking-rdp-outside'
        }}
      />

      <div className="booking-calendar-legend">
        <span className="booking-dot booking-dot-selected" />
        <span>Selected</span>
        <span className="booking-dot booking-dot-booked" />
        <span>Booked</span>
        <span className="booking-dot booking-dot-holiday" />
        <span>Holiday</span>
      </div>

      <p className="booking-calendar-note">
        {selectedHoliday
          ? `Holiday: ${selectedHoliday.label ?? 'Office holiday'}`
          : selectedBooked
            ? 'This day already has bookings.'
            : 'Pick a date to manage seats quickly.'}
      </p>
    </div>
  );
};

export default Calendar;
