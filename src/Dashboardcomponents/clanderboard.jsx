import React from "react";

export default function Calendar(props) {
  // Ensure the prop is correctly named and passed
  const appointments = props.appointments || [];
  console.log(appointments);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>Calendar</h2>
        <button>+ Add appointment</button>
      </div>
    </div>
  );
}
