export default function BookingConfirm() {
  const data = JSON.parse(sessionStorage.getItem("lastReservation") || "{}");
  const hasData = !!data.date;

  return (
    <section aria-labelledby="confirm-title" style={{ padding: "1rem" }}>
      <h1 id="confirm-title">Reservation Confirmed</h1>
      {hasData ? (
        <ul>
          <li><strong>Date:</strong> {data.date}</li>
          <li><strong>Time:</strong> {data.time}</li>
          <li><strong>Guests:</strong> {data.guests}</li>
          <li><strong>Occasion:</strong> {data.occasion || "—"}</li>
          <li><strong>Seating:</strong> {data.seating || "—"}</li>
          <li><strong>Notes:</strong> {data.notes || "—"}</li>
        </ul>
      ) : (
        <p>No reservation found. <a href="/booking">Make a booking</a>.</p>
      )}
    </section>
  );
}
