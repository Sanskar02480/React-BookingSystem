import React from "react";

export const Highlights = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return null;
  }

  const recent = bookings.slice(-3).reverse();

  return (
    <section className="highlights-strip">
      {recent.map((b) => (
        <div key={b.id} className="highlight-card">
          <div className="highlight-header">
            <span className="badge badge-room">{b.room}</span>
            <span className="badge badge-time">
              {b.startTime} – {b.endTime}
            </span>
          </div>
          <div className="highlight-body">
            <div className="highlight-date">{b.date}</div>
            {b.description && (
              <p className="highlight-description">
                {b.description.length > 70 ? `${b.description.slice(0, 70)}...` : b.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

