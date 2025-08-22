// src/pages/ConfirmedBooking.jsx
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function ConfirmedBooking() {
  const last = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("lastReservation");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  return (
    <section style={{ padding: "1rem" }}>
      <h1>Booking Confirmed 🎉</h1>
      <p>Your table has been reserved. We look forward to serving you at Little Lemon.</p>

      {last ? (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid var(--ll-border, #ddd)",
            borderRadius: 8,
            maxWidth: 480
          }}
        >
          <h2 style={{ marginTop: 0 }}>Reservation details</h2>
          <ul style={{ lineHeight: 1.7, paddingLeft: "1rem" }}>
            <li><strong>Date:</strong> {last.date}</li>
            <li><strong>Time:</strong> {last.time}</li>
            <li><strong>Guests:</strong> {last.guests}</li>
            {last.occasion && <li><strong>Occasion:</strong> {last.occasion}</li>}
            {last.seating && <li><strong>Seating:</strong> {last.seating}</li>}
            {last.notes && <li><strong>Notes:</strong> {last.notes}</li>}
          </ul>
        </div>
      ) : (
        <p style={{ marginTop: "1rem" }}>
          (We couldn’t find the booking details—maybe the page was reloaded. That’s okay!)
        </p>
      )}

      <div style={{ marginTop: "1.25rem" }}>
        <Link to="/booking">Make another reservation</Link>
      </div>
    </section>
  );
}
