// src/reservations/BookingForm.jsx
import { useEffect, useRef, useState, useMemo } from "react";

const todayISO = new Date().toISOString().slice(0, 10);

const initial = {
  date: todayISO,   // prefill today
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

  // ---- Derived validity (React-side) ----
  const isValid = useMemo(() => {
    if (!form.date) return false;
    if (!form.time) return false;
    if (typeof form.guests !== "number") return false;
    if (form.guests < 1 || form.guests > 12) return false;
    if (form.notes && form.notes.length > 500) return false;
    return true;
  }, [form]);

  // Lift initial date to parent so availability loads immediately
  useEffect(() => {
    onDateChange?.(initial.date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep selected time valid when the availability list changes
  useEffect(() => {
    if (availableTimes.length === 0) {
      if (form.time) setForm((f) => ({ ...f, time: "" }));
      return;
    }
    if (!availableTimes.includes(form.time)) {
      setForm((f) => ({ ...f, time: availableTimes[0] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableTimes]);

  // ---- Validation helpers ----
  const validate = (state) => {
    const e = {};
    if (!state.date) e.date = "Please choose a date.";
    if (!state.time) e.time = "Please choose a time.";
    if (!state.guests || state.guests < 1 || state.guests > 12) e.guests = "Please enter 1–12 guests.";
    if (state.notes && state.notes.length > 500) e.notes = "Notes must be 500 characters or fewer.";
    return e;
  };

  const validateField = (name, value) => {
    const next = { ...form, [name]: name === "guests" ? Number(value) : value };
    const e = validate(next);
    setErrors(e);
  };

  // ---- Handlers ----
  const update = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: name === "guests" ? Number(value) : value };
    setForm(next);
    validateField(name, value);
    if (live.current) live.current.textContent = ""; // clear live region noise
  };

  const handleDate = (e) => {
    update(e);
    onDateChange?.(e.target.value);       // lift date so parent refreshes times
    setForm((f) => ({ ...f, time: "" })); // reset time on date change
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      if (live.current) live.current.textContent = "Form has errors.";
      return;
    }
    // Guard: ensure selected time still available at submit moment
    if (!availableTimes.includes(form.time)) {
      if (live.current) live.current.textContent = "Selected time is no longer available.";
      alert("That time is no longer available. Please pick another.");
      return;
    }
    if (live.current) live.current.textContent = "Submitting…";
    await onSubmit?.(form);
  };

  return (
    <form onSubmit={submit} className="ll-form">
      {/* Accessibility: live region for non-visual feedback */}
      <div ref={live} role="status" aria-live="polite" className="sr-only" />

      <h2 className="ll-form__title">Reserve a Table</h2>

      <div className="ll-form__grid">
        {/* Date */}
        <div className="field">
          <label htmlFor="res-date">Choose date *</label>
          <input
            id="res-date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleDate}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "err-date" : undefined}
            required
            min={todayISO}              // HTML5: block past dates
          />
          {errors.date && (
            <div id="err-date" role="alert" className="error">{errors.date}</div>
          )}
        </div>

        {/* Time */}
        <div className="field">
          <label htmlFor="res-time">Choose time *</label>
          <select
            id="res-time"
            name="time"
            value={form.time}
            onChange={update}
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? "err-time" : undefined}
            required
            disabled={!form.date || availableTimes.length === 0}
          >
            <option value="">{availableTimes.length ? "Select…" : "No times available"}</option>
            {availableTimes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && (
            <div id="err-time" role="alert" className="error">{errors.time}</div>
          )}
        </div>

        {/* Guests */}
        <div className="field">
          <label htmlFor="guests">Number of guests (1–12) *</label>
          <input
            id="guests"
            name="guests"
            type="number"
            inputMode="numeric"
            min="1"
            max="12"
            value={form.guests}
            onChange={update}
            aria-invalid={!!errors.guests}
            aria-describedby={errors.guests ? "err-guests" : undefined}
            required
          />
          {errors.guests && (
            <div id="err-guests" role="alert" className="error">{errors.guests}</div>
          )}
        </div>

        {/* Occasion */}
        <div className="field">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={form.occasion}
            onChange={update}
          >
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>None</option>
          </select>
        </div>

        {/* Seating */}
        <fieldset className="field field--full">
          <legend>Seating preference</legend>
          <label className="choice">
            <input
              type="radio"
              name="seating"
              value="indoor"
              checked={form.seating === "indoor"}
              onChange={update}
            />{" "}
            Indoor
          </label>
          <label className="choice">
            <input
              type="radio"
              name="seating"
              value="outdoor"
              checked={form.seating === "outdoor"}
              onChange={update}
            />{" "}
            Outdoor
          </label>
        </fieldset>

        {/* Notes */}
        <div className="field field--full">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={update}
            placeholder="Allergies, high chair, etc."
            rows={3}
            maxLength={500}             // HTML5: soft cap
            aria-invalid={!!errors.notes}
            aria-describedby={errors.notes ? "err-notes" : undefined}
          />
          {errors.notes && (
            <div id="err-notes" role="alert" className="error">{errors.notes}</div>
          )}
          <div className="help" aria-live="polite">
            {form.notes?.length ? `${form.notes.length}/500` : null}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn ll-btn"
        disabled={!isValid}
        aria-disabled={!isValid}
      >
        Make Your reservation
      </button>
    </form>
  );
}
