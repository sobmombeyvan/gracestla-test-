import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormFeedback } from '../components/FormFeedback';
import { isSupabaseConfigured } from '../lib/supabase';
import { loadPendingBooking, clearPendingBooking } from '../lib/formData';
import { createBooking } from '../services/bookings';
import './BookingCalendar.css';

const BookingCalendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 1)); // July 2026
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay() || 7; // 1 (Mon) to 7 (Sun)
  };

  const days = [];
  const totalDays = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  // Padding for start of month
  for (let i = 1; i < firstDay; i++) {
    days.push(null);
  }

  // Actual days
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const weekdayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const start = new Date(year, month, selectedDate, hours, minutes, 0);

    const displayDate = `${weekdayNames[start.getDay()]} ${selectedDate} ${monthNames[month].toLowerCase()} ${year}`;
    const displayTime = selectedTime.replace(':', 'h');

    localStorage.setItem('bookedDate', displayDate);
    localStorage.setItem('bookedTime', displayTime);
    localStorage.setItem('bookedStartISO', start.toISOString());

    if (!isSupabaseConfigured) {
      setError('Supabase n’est pas configuré. Le créneau est affiché localement uniquement.');
      navigate('/success');
      return;
    }

    const pending = loadPendingBooking();
    setSaving(true);
    setError(null);

    try {
      await createBooking({
        submissionId: pending?.submissionId,
        email: pending?.email,
        name: pending?.name,
        startsAt: start.toISOString(),
        displayDate,
        displayTime,
      });
      clearPendingBooking();
      navigate('/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de confirmer le rendez-vous.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="calendar-page">
      <div className="container">
        <FormFeedback error={error} loading={saving} />
        <div className="calendar-layout">
          <div className="calendar-left">
            <h2>Sélectionnez une date</h2>
            <div className="calendar-grid-container">
              <div className="calendar-grid-header">
                <button className="nav-btn">‹</button>
                <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                <button className="nav-btn">›</button>
              </div>
              <div className="weekday-header">
                <span>LUN</span><span>MAR</span><span>MER</span><span>JEU</span><span>VEN</span><span>SAM</span><span>DIM</span>
              </div>
              <div className="calendar-days">
                {days.map((day, idx) => (
                  <div key={idx} className="day-cell">
                    {day && (
                      <button 
                        className={`day-num ${selectedDate === day ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedDate(day);
                          setSelectedTime(null);
                        }}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="calendar-right">
            {selectedDate ? (
              <div className="time-selection animated-fade-in">
                <h2>{selectedDate} {monthNames[currentMonth.getMonth()]}</h2>
                <p>Choisissez l'heure de votre rendez-vous</p>
                <div className="time-slots">
                  {times.map((time) => (
                    <button 
                      key={time} 
                      className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                
                {selectedTime && (
                  <button
                    type="button"
                    className="btn btn-primary next-btn animated-slide-up"
                    onClick={handleConfirm}
                    disabled={saving}
                  >
                    {saving ? 'Confirmation…' : 'Suivant'}
                  </button>
                )}
              </div>
            ) : (
              <div className="empty-state">
                <div className="calendar-icon">📅</div>
                <p>Veuillez sélectionner une date pour voir les créneaux disponibles.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
