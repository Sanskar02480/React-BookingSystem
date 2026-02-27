import React from "react";

export const ExistingBookingsCard = ({
  rooms,
  groupedBookings,
  bookingsCount,
  searchTerm,
  setSearchTerm
}) => {
  const normalizedSearch = searchTerm.toLowerCase();

  return (
    <section className="card">
      <div className="card-header-row">
        <h2>Existing Bookings</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {bookingsCount === 0 ? (
        <p className="muted">No bookings yet. Create one to get started.</p>
      ) : (
        <div className="bookings-list">
          {rooms
            .filter((r) => !normalizedSearch || r.toLowerCase().includes(normalizedSearch))
            .map((r) => {
              const roomBookings = groupedBookings[r] || [];
              if (roomBookings.length === 0) {
                return null;
              }
              return (
                <div key={r} className="room-group">
                  <h3>{r}</h3>
                  <ul>
                    {roomBookings.map((b) => (
                      <li key={b.id}>
                        <span className="booking-date">{b.date}</span>
                        <span className="booking-time">
                          {b.startTime} – {b.endTime}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      )}
    </section>
  );
};

