const MONTHS_FR = {
  janvier: 0,
  février: 1,
  fevrier: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  aout: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11,
  decembre: 11,
};

const pad = (n) => String(n).padStart(2, '0');

/** Format local pour fichier ICS (heure locale, sans fuseau Z) */
function formatICSLocal(date) {
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}00`
  );
}

function escapeICS(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

/**
 * Tente de reconstruire la date de début depuis le stockage local.
 */
export function getBookedStartDate() {
  const iso = localStorage.getItem('bookedStartISO');
  if (iso) {
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d;
  }

  const dateStr = localStorage.getItem('bookedDate') || '';
  const timeStr = localStorage.getItem('bookedTime') || '11:00';
  const timeMatch = timeStr.match(/(\d{1,2})[:h](\d{2})/i);
  const hours = timeMatch ? Number(timeMatch[1]) : 11;
  const minutes = timeMatch ? Number(timeMatch[2]) : 0;

  const parts = dateStr.trim().split(/\s+/);
  const dayPart = parts.find((p) => /^\d{1,2}$/.test(p));
  const yearPart = parts.find((p) => /^\d{4}$/.test(p));
  const monthPart = parts.find((p) => MONTHS_FR[p.toLowerCase()] !== undefined);

  if (dayPart && yearPart && monthPart) {
    const day = Number(dayPart);
    const year = Number(yearPart);
    const month = MONTHS_FR[monthPart.toLowerCase()];
    return new Date(year, month, day, hours, minutes, 0);
  }

  return null;
}

/**
 * Télécharge un fichier .ics compatible Google / Apple / Outlook.
 */
export function downloadCalendarEvent({
  title = 'Appel — Grâce est là',
  description = 'Échange visioconférence avec l\'équipe Grâce est là.',
  location = 'Visioconférence',
  start,
  durationMinutes = 30,
}) {
  if (!start || Number.isNaN(start.getTime())) {
    return false;
  }

  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const now = new Date();
  const uid = `grace-${start.getTime()}@graceestla.fr`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Grace est la//Booking//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatICSLocal(now)}`,
    `DTSTART:${formatICSLocal(start)}`,
    `DTEND:${formatICSLocal(end)}`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rendez-vous-grace-est-la.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}

/** Lien Google Calendar (ouvre dans un nouvel onglet) */
export function getGoogleCalendarUrl({
  title = 'Appel — Grâce est là',
  description = 'Échange visioconférence avec l\'équipe Grâce est là.',
  location = 'Visioconférence',
  start,
  durationMinutes = 30,
}) {
  if (!start || Number.isNaN(start.getTime())) return null;

  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: description,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
