import React, { useState, useEffect } from "react";
import FlipCalendar from "./FlipCalendar";
import Notes from "./Notes";
import "./CalendarApp.css";

const CalendarApp = () => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDayClick = (day) => {
  if (startDate === null) {
    setStartDate(day);
  } else if (endDate === null) {
    if (day < startDate) {
      setEndDate(startDate);
      setStartDate(day);
    } else {
      setEndDate(day);
    }
  } else {
    setStartDate(day);
    setEndDate(null);
  }
};
  const addEvent = (text) => {
  if (startDate == null || endDate == null) {
    alert("Please select a date range first");
    return;
  }

  if (!text.trim()) {
    alert("Please enter event details");
    return;
  }

  const newEvent = {
    startDate,
    endDate,
    text: text.trim(),
    month
  };

  setEvents((prev) => [...prev, newEvent]);

  setStartDate(null);
  setEndDate(null);
  setActiveEvent(newEvent);
};

  const next = () => setMonth((prev) => (prev + 1) % 12);
  const prev = () => setMonth((prev) => (prev - 1 + 12) % 12);

  return (
    <div className="main-layout">

      <FlipCalendar
        month={month}
        next={next}
        prev={prev}
        startDate={startDate}
        endDate={endDate}
        handleDayClick={handleDayClick}
        events={events}
        setActiveEvent={setActiveEvent}
      />

      <Notes
        addEvent={addEvent}
        activeEvent={activeEvent}
        setEvents={setEvents}
        events={events}
        setActiveEvent={setActiveEvent}   
      />

    </div>
  );
};

export default CalendarApp;