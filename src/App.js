import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";

export default function App() {
  return (
    <div className="container">
      <header aria-label="Site Header">
        {/* Your logo can be inside Nav or here; pick one to avoid duplication */}
        <Nav />
      </header>

      {/* Optional: separate <nav> area if your grid expects it
      <nav aria-label="Primary Navigation"><Nav /></nav>
      */}

      <main id="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          {/* Add more routes as you build pages */}
        </Routes>
      </main>

      <aside>
        {/* Optional: sidebar content (specials promo, hours, etc.) */}
      </aside>

      <footer>
        {/* Your Footer component here */}
        <small>© Little Lemon</small>
      </footer>
    </div>
  );
}
