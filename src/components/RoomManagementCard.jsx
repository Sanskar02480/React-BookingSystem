import React from "react";

export const RoomManagementCard = ({
  newRoomId,
  setNewRoomId,
  newRoomName,
  setNewRoomName,
  newRoomStatus,
  setNewRoomStatus,
  roomError,
  roomSuccess,
  onSubmit
}) => {
  return (
    <section className="card">
      <h2>Room Management</h2>
      <p className="muted admin-card-note">
        Create new rooms. Currently, only <strong>Admin</strong> can create rooms; participant access is disabled.
      </p>
      <form className="booking-form" onSubmit={onSubmit}>
        <div className="field-inline">
          <div className="field">
            <label htmlFor="room-id">Room ID</label>
            <input
              id="room-id"
              type="text"
              value={newRoomId}
              onChange={(e) => setNewRoomId(e.target.value)}
              placeholder="e.g. TITAN-01"
            />
          </div>
          <div className="field">
            <label htmlFor="room-name">Room name</label>
            <input
              id="room-name"
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="e.g. Titan Meeting Room"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="room-status">Status</label>
          <select
            id="room-status"
            value={newRoomStatus}
            onChange={(e) => setNewRoomStatus(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Participant" disabled>Participant</option>
          </select>
        </div>

        {roomError && <div className="alert alert-error">{roomError}</div>}
        {roomSuccess && <div className="alert alert-success">{roomSuccess}</div>}

        <button type="submit" className="primary-btn">
          Add room
        </button>
      </form>
    </section>
  );
};

