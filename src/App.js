// src/App.js
import { Routes, Route, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import BookingConfirm from "./pages/BookingConfirm";
import { submitBooking } from "./reservations/api";

export default function App() {
  const navigate = useNavigate();

  // submitForm: called by BookingPage → calls API → navigates to confirm
  async function submitForm(formData) {
    const ok = await Promise.resolve(submitBooking(formData));
    if (ok) {
      sessionStorage.setItem("lastReservation", JSON.stringify(formData));
      navigate("/booking/confirm");
    }
    return ok;
  }

  return (
    <div className="container">
      <header aria-label="Site Header">
        <Nav />
      </header>

      <main id="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage submitForm={submitForm} />} />
          <Route path="/booking/confirm" element={<BookingConfirm />} />
        </Routes>
      </main>

      <aside>{/* optional */}</aside>

      <footer>
        <small>© Little Lemon</small>
      </footer>
    </div>
  );
}
