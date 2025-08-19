import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();
  return (
    <section aria-labelledby="cta-title">
      <h1 id="cta-title">Reserve a Table</h1>
      <p>Book your dining experience at Little Lemon.</p>
      <button onClick={() => navigate("/booking")}>Book a table</button>
    </section>
  );
}
