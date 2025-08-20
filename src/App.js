// src/App.js
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import BookingConfirm from "./pages/BookingConfirm";// ← NEW

export default function App() {
  return (
    <div className="container">
      <header aria-label="Site Header">
        <Nav />
      </header>

      <main id="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking/confirm" element={<BookingConfirm />} /> {/* ← NEW */}
        </Routes>
      </main>

      <aside>{/* sidebar or specials if you need it */}</aside>

      <footer>
        <small>© Little Lemon</small>
      </footer>
    </div>
  );
}
