import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalendarPage from "./CalendarPage";

const FlipCalendar = ({
  month,
  next,
  prev,
  startDate,
  endDate,
  handleDayClick,
  events,
  setActiveEvent
}) => {
  return (
    <div className="calendar-wrapper">
      <button className="nav-btn" onClick={prev}>⬅</button>

      <div className="calendar-container">

        <AnimatePresence mode="wait">
          <motion.div
            key={month}
            className="page"
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CalendarPage
              month={month}
              startDate={startDate}
              endDate={endDate}
              handleDayClick={handleDayClick}
              events={events}
              setActiveEvent={setActiveEvent} 
            />
          </motion.div>
        </AnimatePresence>

      </div>

      <button className="nav-btn" onClick={next}>➡</button>
    </div>
  );
};

export default FlipCalendar;