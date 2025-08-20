import BookingForm from "../reservations/BookingForm";

export default function BookingPage() {
  const handleSubmit = async (payload) => {
    await new Promise(r => setTimeout(r, 250)); // simulate API
    sessionStorage.setItem("lastReservation", JSON.stringify(payload));
    window.location.assign("/booking/confirm"); // simple redirect; can swap to useNavigate
  };

  return (
    <section aria-labelledby="booking-title" style={{ padding: "1rem" }}>
      <h1 id="booking-title">Reserve a Table</h1>
      <p>Select a date, time, guests, and occasion.</p>
      <BookingForm onSubmit={handleSubmit} />
    </section>
  );
}
