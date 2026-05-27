export function formDataToObject(formData) {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

export function displayNameFromPayload(type, payload) {
  if (!payload) return '';
  if (type === 'contact' || type === 'reservation') {
    return (payload.name || '').trim();
  }
  return [payload.firstName, payload.lastName].filter(Boolean).join(' ').trim();
}

export function emailFromPayload(payload) {
  return (payload?.email || '').trim().toLowerCase();
}

export const PENDING_BOOKING_KEY = 'grace_pending_booking';

export function savePendingBooking(meta) {
  sessionStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify(meta));
}

export function loadPendingBooking() {
  try {
    const raw = sessionStorage.getItem(PENDING_BOOKING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPendingBooking() {
  sessionStorage.removeItem(PENDING_BOOKING_KEY);
}
