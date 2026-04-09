import React from "react";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const CalendarPage = ({
  month,
  startDate,
  endDate,
  handleDayClick,
  events,
  setActiveEvent
}) => {
  const year = 2026;

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days = [];

  const isInRange = (day) => {
    return startDate && endDate && day >= startDate && day <= endDate;
  };
  
  const getEvent = (day) => {
    return events.find(
      (e) =>
        e.month === month &&
        day >= e.startDate &&
        day <= e.endDate
    );
  };

  const isEventDay = (day) => {
    return events.some(
      (e) =>
        e.month === month &&   
        day >= e.startDate &&
        day <= e.endDate
    );
  };

  for (let i = 0; i < firstDay; i++) {
    days.push(<span key={"empty-" + i}></span>);
  }

  for (let i = 1; i <= totalDays; i++) {
    let className = "";

    if (i === startDate || i === endDate) className = "selected-day";
    else if (isInRange(i)) className = "in-range";
    else if (isEventDay(i)) className = "event-day";

    days.push(
      <span
        key={i}
        className={className}
        onClick={() => {
          handleDayClick(i);
          const event = getEvent(i);
          if (event) {
            setActiveEvent(event);
          } else {
            handleDayClick(i);
            setActiveEvent(null);
          }
        }}
      >
        {i}
      </span>
    );
  }

  

  return (
    <div className="calendar-page">

      <div className="image-section">
        <img src={`/images/${month + 1}.jpg`} alt="month" />
      </div>

      <div className="content">
        <div className="month-row">
          <h2>{months[month]} {year}</h2>
        </div>

        <div className="weekdays">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="dates-grid">{days}</div>
      </div>

    </div>
  );
};

export default CalendarPage;