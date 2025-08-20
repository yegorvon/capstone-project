// src/pages/BookingPage.jsx
import { useReducer, useMemo } from "react";
import BookingForm from "../reservations/BookingForm";
import BookingSlots from "../reservations/BookingSlots";

// Fake availability source (stub for now)
// In a later lesson you’ll replace this with real API logic.
const ALL_TIMES = ["17:00", "18:00", "19:00", "20:00", "21:00"];

// initializeTimes: first load (or per-date if using initArg)
function initializeTimes() {
  // You can seed based on today's date if you want,
  // for now return the full list.
  return {
    date: "",
    available: ALL_TIMES,
    booked: [] // simple record for UX; not persisted
  };
}

// updateTimes: reducer for date changes + booking
function updateTimes(state, action) {
  switch (action.type) {
    case "date": {
      // In a real app, compute availability from the API based on action.date
      // For now, we’ll reset available to ALL_TIMES and clear booked for that date.
      return {
        date: action.date,
        available: ALL_TIMES,
        booked: []
      };
    }
    case "book": {
      // Remove the selected time from available, append to booked
      const t = action.time;
      if (!state.available.includes(t)) return state; // already booked
      return {
        ...state,
        available: state.available.filter(x => x !== t),
        booked: [...state.booked, t]
      };
    }
    default:
      return state;
  }
}

export default function BookingPage() {
  const [timesState, dispatch] = useReducer(updateTimes, undefined, initializeTimes);

  // Handler from the form when date changes
  const handleDateChange = (date) => {
    dispatch({ type: "date", date });
  };

  // Submit handler from the form
  const handleSubmit = async (payload) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 250));
    // Mark slot as booked in local reducer state
    dispatch({ type: "book", time: payload.time });

    // Persist last reservation for the confirm page
    sessionStorage.setItem("lastReservation", JSON.stringify(payload));
    // Navigate (simple redirect; swap to useNavigate if you prefer)
    window.location.assign("/booking/confirm");
  };

  const selectedDateCopy = useMemo(
    () => (timesState.date ? new Date(timesState.date).toDateString() : "—"),
    [timesState.date]
  );

  return (
    <section aria-labelledby="booking-title" style={{ padding: "1rem" }}>
      <h1 id="booking-title">Reserve a Table</h1>
      <p>Select a date, time, guests, and occasion.</p>

      <BookingForm
        availableTimes={timesState.available}
        onDateChange={handleDateChange}
        onSubmit={handleSubmit}
      />

      {/* Slots list (read-only view of availability) */}
      <BookingSlots
        dateLabel={selectedDateCopy}
        available={timesState.available}
        booked={timesState.booked}
      />
    </section>
  );
}
