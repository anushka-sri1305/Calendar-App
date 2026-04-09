import React, { useState } from "react";

const Notes = ({ addEvent, activeEvent, setEvents, events, setActiveEvent }) => {
  const [text, setText] = useState("");

  const handleDelete = () => {
    const updated = events.filter(
      (e) =>
        !(
          e.startDate === activeEvent.startDate &&
          e.endDate === activeEvent.endDate &&
          e.month === activeEvent.month &&
          e.text === activeEvent.text
        )
    );

    setEvents(updated);
    setActiveEvent(null); 
  };

  return (
    <div className="notes">
      <h3>Add Event</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Why are you selecting these dates?"
      />

      <button
        onClick={() => {
          if (!text.trim()) return; 
          addEvent(text);
          setText("");
        }}
      >
        Save Event
      </button>

      
      {activeEvent &&
        events.some(
          (e) =>
            e.startDate === activeEvent.startDate &&
            e.endDate === activeEvent.endDate &&
            e.month === activeEvent.month &&
            e.text === activeEvent.text
        ) && (
          <div className="event-view">
            <h4>Event Details</h4>
            <p><b>From:</b> {activeEvent.startDate}</p>
            <p><b>To:</b> {activeEvent.endDate}</p>
            <p><b>Note:</b> {activeEvent.text}</p>

            <button onClick={handleDelete}>
              Delete Event
            </button>
          </div>
        )}
    </div>
  );
};

export default Notes;