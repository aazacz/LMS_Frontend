import React from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar"; // or your preferred calendar library
import "react-calendar/dist/Calendar.css"; // Ensure calendar styles are included
import "./Dashboard.css"; // Import custom CSS for modal styling

const CalendarModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="calendar-container justify-center items-center flex">
          <Calendar className="calendar p-2 shadow-md rounded-lg overflow-hidden font-poppins border-none bg-[#E5F0FC]" />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CalendarModal;
