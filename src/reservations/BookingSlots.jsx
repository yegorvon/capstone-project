
export default function BookingSlots({ dateLabel, available = [], booked = [] }) {
  return (
    <section aria-labelledby="slots-title" style={{ marginTop: "1rem" }}>
      <h2 id="slots-title" style={{ color: "var(--ll-primary)" }}>
        Availability for {dateLabel}
      </h2>
      <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: ".5rem" }}>
        {available.length === 0 && booked.length === 0 && <span>Pick a date to see times.</span>}
        {available.map((t) => (
          <span key={`a-${t}`} className="slot badge badge--ok" aria-label={`${t} available`}>{t}</span>
        ))}
        {booked.map((t) => (
          <span key={`b-${t}`} className="slot badge badge--muted" aria-label={`${t} booked`}>{t}</span>
        ))}
      </div>
    </section>
  );
}
