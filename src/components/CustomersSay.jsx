import { testimonials } from "../data/testimonials";

export default function CustomersSay() {
  return (
    <section aria-labelledby="test-title">
      <h2 id="test-title">What our customers say</h2>
      <ul className="testimonials">
        {testimonials.map(t => (
          <li key={t.id} className="testimonial">
            <div aria-label={`${t.rating} out of 5 stars`} className="stars">
              {"★★★★★☆☆☆☆☆".slice(5 - t.rating, 10 - t.rating)}
            </div>
            <p>“{t.text}”</p>
            <small>— {t.name}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
