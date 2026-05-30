const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const WEEKDAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export const BOOKING_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const pad = (n) => String(n).padStart(2, '0');

export function getInitialMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

/** Clé stable YYYY-MM-DD pour une date calendaire */
export function toDateKey(year, monthIndex, day) {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

export function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return { year, monthIndex: month - 1, day };
}

export function buildBookingSlotFromKey(dateKey, selectedTime) {
  const { year, monthIndex, day } = parseDateKey(dateKey);
  const [hours, minutes] = selectedTime.split(':').map(Number);
  const start = new Date(year, monthIndex, day, hours, minutes, 0);

  return {
    startsAt: start.toISOString(),
    displayDate: `${WEEKDAY_NAMES[start.getDay()]} ${day} ${MONTH_NAMES[monthIndex].toLowerCase()} ${year}`,
    displayTime: selectedTime.replace(':', 'h'),
    dateKey,
    selectedTime,
  };
}

/** @deprecated — préférer buildBookingSlotFromKey */
export function buildBookingSlot(currentMonth, selectedDay, selectedTime) {
  return buildBookingSlotFromKey(
    toDateKey(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDay),
    selectedTime,
  );
}

export function isPastDay(year, monthIndex, day) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const candidate = new Date(year, monthIndex, day);
  candidate.setHours(0, 0, 0, 0);
  return candidate < today;
}

export function isPastTimeSlot(dateKey, time) {
  const { year, monthIndex, day } = parseDateKey(dateKey);
  const [hours, minutes] = time.split(':').map(Number);
  const slot = new Date(year, monthIndex, day, hours, minutes, 0);
  return slot <= new Date();
}

export function isWeekend(year, monthIndex, day) {
  const d = new Date(year, monthIndex, day).getDay();
  return d === 0 || d === 6;
}

export { MONTH_NAMES, WEEKDAY_NAMES };
