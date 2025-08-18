import React from "react";

function Main() {
  return (
    <main id="content">
      {/* Later: sections for Hero, Highlights, Testimonials, About */}
      <section aria-labelledby="hero-title">
        <h1 id="hero-title">Reserve a Table</h1>
        <p>Book your dining experience at Little Lemon.</p>
        <a className="btn" href="/reservations">Book a table</a>
      </section>
    </main>
  );
}

export default Main;
