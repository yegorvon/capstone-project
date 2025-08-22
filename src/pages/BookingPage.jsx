import { useReducer, useMemo } from "react";
import BookingForm from "../reservations/BookingForm";
import BookingSlots from "../reservations/BookingSlots";
import { getAvailableTimes } from "../reservations/api";
function parseFlexibleDate(value) {
  if (!value) return null;
  if (value.includes("-")) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  if (value.includes("/")) {
    const [d, m, y] = value.split("/").map(Number);
    return new Date(y, m - 1, d);
  }
  const dt = new Date(value);
  return isNaN(dt.getTime()) ? null : dt;
}

function formatDateLabel(yyyyMmDd) {
  if (!yyyyMmDd) return "—";
  const dt = parseFlexibleDate(yyyyMmDd);
  return dt ? dt.toDateString() : "—";
}
function initializeTimes() {
  return {
    date: "",
    available: getAvailableTimes(new Date()),
    booked: []
  };
}

function updateTimes(state, action) {
  switch (action.type) {
    case "date": {
      const dateObj = parseFlexibleDate(action.date);
      const available = dateObj ? getAvailableTimes(dateObj) : [];
      return { date: action.date, available, booked: [] };
    }
    case "book": {
      const t = action.time;
      if (!state.available.includes(t)) return state;
      return {
        ...state,
        available: state.available.filter((x) => x !== t),
        booked: [...state.booked, t]
      };
    }
    default:
      return state;
  }
}

export default function BookingPage({ submitForm }) {
  const [timesState, dispatch] = useReducer(updateTimes, undefined, initializeTimes);

  const handleDateChange = (date) => {
    dispatch({ type: "date", date });
  };

  const handleSubmit = async (payload) => {
    if (!timesState.available.includes(payload.time)) {
      alert("That time is no longer available. Please pick another.");
      return;
    }
    const ok = await submitForm?.(payload);
    if (ok) {
      dispatch({ type: "book", time: payload.time }); // optimistic local update
    } else {
      alert("Could not submit reservation. Please try again.");
    }
  };

  const selectedDateCopy = useMemo(
    () => formatDateLabel(timesState.date),
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

      <BookingSlots
        dateLabel={selectedDateCopy}
        available={timesState.available}
        booked={timesState.booked}
      />
    </section>
  );
}

export { initializeTimes, updateTimes, parseFlexibleDate };
