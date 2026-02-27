import React from "react";

export const NewBookingCard = ({
  rooms,
  room,
  setRoom,
  date,
  setDate,
  description,
  setDescription,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  error,
  success,
  onSubmit,
  timeSlots
}) => {
  return (
    <section className="card">
      <h2>New Booking</h2>
      <form className="booking-form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="room">Room</label>
          <select
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a short note about the purpose of this meeting or key agenda items."
          />
        </div>

        <div className="field-inline">
          <div className="field">
            <label htmlFor="start">Start time</label>
            <select
              id="start"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              <option value="">Select start time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="end">End time</label>
            <select
              id="end"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            >
              <option value="">Select end time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button type="submit" className="primary-btn">
          Book room
        </button>
      </form>
    </section>
  );
};

