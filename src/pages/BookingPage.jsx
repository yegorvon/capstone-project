
import { useReducer, useMemo } from "react";
import BookingForm from "../reservations/BookingForm";
import BookingSlots from "../reservations/BookingSlots";

const ALL_TIMES = ["17:00", "18:00", "19:00", "20:00", "21:00"];

function initializeTimes() {

  return {
    date: "",
    available: ALL_TIMES,
    booked: [] 
  };
}

function updateTimes(state, action) {
  switch (action.type) {
    case "date": {
    
      return {
        date: action.date,
        available: ALL_TIMES,
        booked: []
      };
    }
    case "book": {
   
      const t = action.time;
      if (!state.available.includes(t)) return state; 
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

  const handleDateChange = (date) => {
    dispatch({ type: "date", date });
  };

  const handleSubmit = async (payload) => {
  
    await new Promise((r) => setTimeout(r, 250));
  
    dispatch({ type: "book", time: payload.time });

    sessionStorage.setItem("lastReservation", JSON.stringify(payload));
   
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

      {}
      <BookingSlots
        dateLabel={selectedDateCopy}
        available={timesState.available}
        booked={timesState.booked}
      />
    </section>
  );
}
