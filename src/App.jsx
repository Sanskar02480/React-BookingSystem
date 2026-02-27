import React, { useMemo, useState } from "react";
import { Highlights } from "./components/Highlights";
import { NewBookingCard } from "./components/NewBookingCard";
import { ExistingBookingsCard } from "./components/ExistingBookingsCard";
import { RoomManagementCard } from "./components/RoomManagementCard";

const INITIAL_ROOMS = ["Room A", "Room B", "Room C"];

const TIME_SLOTS = Array.from({ length: 24 * 2 }, (_, index) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 === 0 ? 0 : 30;
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  return `${h}:${m}`;
});

export const App = () => {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [room, setRoom] = useState("Room A");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [newRoomId, setNewRoomId] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomStatus, setNewRoomStatus] = useState("Admin");
  const [roomError, setRoomError] = useState("");
  const [roomSuccess, setRoomSuccess] = useState("");

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetMessages();

    if (!date || !startTime || !endTime) {
      setError("Please fill in date, start time and end time.");
      return;
    }

    if (startTime >= endTime) {
      setError("Start time must be earlier than end time.");
      return;
    }

    const newStart = toMinutes(startTime);
    const newEnd = toMinutes(endTime);

    const conflicts = bookings.filter((b) => {
      return (
        b.room === room &&
        b.date === date &&
        timeRangesOverlap(newStart, newEnd, toMinutes(b.startTime), toMinutes(b.endTime))
      );
    });

    if (conflicts.length > 0) {
      const first = conflicts[0];
      setError(
        `This room is already booked on ${date} from ${first.startTime} to ${first.endTime}. Please choose a different time.`
      );
      return;
    }

    const newBooking = {
      id: Date.now(),
      room,
      date,
      startTime,
      endTime,
      description: description.trim() || undefined
    };

    setBookings((prev) => [...prev, newBooking]);
    setSuccess("Booking created successfully.");
    setDescription("");
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    setRoomError("");
    setRoomSuccess("");

    if (!newRoomId.trim() || !newRoomName.trim()) {
      setRoomError("Please fill in room ID and room name.");
      return;
    }

    if (newRoomStatus !== "Admin") {
      setRoomError("Only admin can create new rooms currently.");
      return;
    }

    if (rooms.includes(newRoomName.trim())) {
      setRoomError("A room with this name already exists.");
      return;
    }

    setRooms((prev) => [...prev, newRoomName.trim()]);
    setRoomSuccess("Room created successfully.");
    setNewRoomId("");
    setNewRoomName("");
    setNewRoomStatus("Admin");
  };

  const groupedBookings = useMemo(() => {
    const byRoom = {};

    for (const r of rooms) {
      byRoom[r] = [];
    }

    for (const b of bookings) {
      if (!byRoom[b.room]) {
        byRoom[b.room] = [];
      }
      byRoom[b.room].push(b);
    }

    Object.keys(byRoom).forEach((r) => {
      byRoom[r].sort((a, b) => {
        if (a.date === b.date) {
          return a.startTime.localeCompare(b.startTime);
        }
        return a.date.localeCompare(b.date);
      });
    });

    return byRoom;
  }, [bookings, rooms]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Meeting Room Booking</h1>
        <p>Book collaborative spaces, add details and keep track of your meeting highlights.</p>
      </header>

      <Highlights bookings={bookings} />

      <main className="layout">
        <NewBookingCard
          rooms={rooms}
          room={room}
          setRoom={setRoom}
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          error={error}
          success={success}
          onSubmit={handleSubmit}
          timeSlots={TIME_SLOTS}
        />

        <div className="right-column">
          <ExistingBookingsCard
            rooms={rooms}
            groupedBookings={groupedBookings}
            bookingsCount={bookings.length}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <RoomManagementCard
            newRoomId={newRoomId}
            setNewRoomId={setNewRoomId}
            newRoomName={newRoomName}
            setNewRoomName={setNewRoomName}
            newRoomStatus={newRoomStatus}
            setNewRoomStatus={setNewRoomStatus}
            roomError={roomError}
            roomSuccess={roomSuccess}
            onSubmit={handleCreateRoom}
          />
        </div>
      </main>
    </div>
  );
};

function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function timeRangesOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

