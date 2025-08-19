import { specials } from "../data/specials";

export default function Specials() {
  return (
    <section aria-labelledby="specials-title">
      <div className="section-header">
        <h2 id="specials-title">Specials</h2>
        <a className="btn" href="/order-online">Order Online</a>
      </div>
      <div className="card-grid">
        {specials.map(item => (
          <article key={item.id} className="special-card">
            <img src={item.img} alt={item.name} />
            <div className="special-card__header">
              <h3>{item.name}</h3>
              <span className="price">{item.price}</span>
            </div>
            <p>{item.desc}</p>
            <a className="btn-text" href="/order-online">Order a delivery</a>
          </article>
        ))}
      </div>
    </section>
  );
}
