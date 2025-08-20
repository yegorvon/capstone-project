// src/reservations/BookingForm.jsx
import { useState, useRef } from "react";

const initial = {
  date: "",
  time: "",
  guests: 2,
  occasion: "Birthday",
  seating: "",
  notes: ""
};

export default function BookingForm({ onSubmit, availableTimes = [], onDateChange }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const live = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "guests" ? Number(value) : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleDate = (e) => {
    update(e);
    if (onDateChange) onDateChange(e.target.value); // lift date
    // Reset chosen time when date changes (optional UX)
    setForm((f) => ({ ...f, time: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.date) e.date = "Please choose a date.";
    if (!form.time) e.time = "Please choose a time.";
    if (!form.guests || form.guests < 1 || form.guests > 12) e.guests = "Guests must be 1–12.";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      if (live.current) live.current.textContent = "Form has errors.";
      return;
    }
    if (live.current) live.current.textContent = "Submitting…";
    await onSubmit?.(form);
  };

  return (
    <form onSubmit={submit} className="ll-form">
      <div ref={live} role="status" aria-live="polite" className="sr-only" />

      <h2 className="ll-form__title">Reserve a Table</h2>

      <div className="ll-form__grid">
        <div className="field">
          <label htmlFor="res-date">Choose date *</label>
          <input
            id="res-date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleDate}
            aria-invalid={!!errors.date}
            required
          />
          {errors.date && <div role="alert" className="error">{errors.date}</div>}
        </div>

        <div className="field">
          <label htmlFor="res-time">Choose time *</label>
          <select
            id="res-time"
            name="time"
            value={form.time}
            onChange={update}
            aria-invalid={!!errors.time}
            required
            disabled={!form.date} /* block until date picked */
          >
            <option value="">Select…</option>
            {availableTimes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && <div role="alert" className="error">{errors.time}</div>}
        </div>

        <div className="field">
          <label htmlFor="guests">Number of guests (1–12) *</label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="12"
            value={form.guests}
            onChange={update}
            aria-invalid={!!errors.guests}
            required
          />
          {errors.guests && <div role="alert" className="error">{errors.guests}</div>}
        </div>

        <div className="field">
          <label htmlFor="occasion">Occasion</label>
          <select id="occasion" name="occasion" value={form.occasion} onChange={update}>
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
        </div>

        <fieldset className="field field--full">
          <legend>Seating preference</legend>
          <label className="choice">
            <input type="radio" name="seating" value="indoor" checked={form.seating === "indoor"} onChange={update} /> Indoor
          </label>
          <label className="choice">
            <input type="radio" name="seating" value="outdoor" checked={form.seating === "outdoor"} onChange={update} /> Outdoor
          </label>
        </fieldset>

        <div className="field field--full">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={update}
            placeholder="Allergies, high chair, etc."
            rows={3}
          />
        </div>
      </div>

      <button type="submit" className="btn ll-btn">Make Your reservation</button>
    </form>
  );
}
