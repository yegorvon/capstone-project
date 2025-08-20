import { useState, useRef } from "react";

const initial = {
  date: "",
  time: "",
  guests: 2,
  occasion: "Birthday",
  seating: "",
  notes: ""
};

export default function BookingForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [availableTimes] = useState(["17:00", "18:00", "19:00", "20:00", "21:00"]);
  const live = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === "guests" ? Number(value) : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
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
    <form onSubmit={submit} style={{ display: "grid", maxWidth: 320, gap: 12 }}>
      <div ref={live} role="status" aria-live="polite" style={{ position: "absolute", left: "-9999px" }} />

      <label htmlFor="res-date">Choose date *</label>
      <input id="res-date" name="date" type="date" value={form.date} onChange={update} aria-invalid={!!errors.date} required />
      {errors.date && <div role="alert">{errors.date}</div>}

      <label htmlFor="res-time">Choose time *</label>
      <select id="res-time" name="time" value={form.time} onChange={update} aria-invalid={!!errors.time} required>
        <option value="">Select…</option>
        {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      {errors.time && <div role="alert">{errors.time}</div>}

      <label htmlFor="guests">Number of guests (1–12) *</label>
      <input id="guests" name="guests" type="number" min="1" max="12" value={form.guests} onChange={update} aria-invalid={!!errors.guests} required />
      {errors.guests && <div role="alert">{errors.guests}</div>}

      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" name="occasion" value={form.occasion} onChange={update}>
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>

      <fieldset>
        <legend>Seating preference</legend>
        <label><input type="radio" name="seating" value="indoor" checked={form.seating==="indoor"} onChange={update}/> Indoor</label>
        <label><input type="radio" name="seating" value="outdoor" checked={form.seating==="outdoor"} onChange={update}/> Outdoor</label>
      </fieldset>

      <label htmlFor="notes">Notes</label>
      <textarea id="notes" name="notes" value={form.notes} onChange={update} placeholder="Allergies, high chair, etc." />

      <button type="submit">Make Your reservation</button>
    </form>
  );
}
