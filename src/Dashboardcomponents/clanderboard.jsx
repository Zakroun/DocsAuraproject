import React, { useState } from "react";

export default function Calendar(props) {
  const appointments = props.appointments || [];
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('02');
  const [selectedStatus, setSelectedStatus] = useState('all'); // State for selected status

  // Group appointments by date in 'YYYY-MM-DD' format
  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(appointment);
    return acc;
  }, {});

  // Generate all days of the selected month and year
  const generateDaysInMonth = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const days = [];
    while (date.getMonth() === month - 1) {
      days.push(date.toISOString().split('T')[0]);
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const daysInMonth = generateDaysInMonth(selectedYear, selectedMonth);

  // Filter appointments by status
  const filterAppointmentsByStatus = (appointments) => {
    if (selectedStatus === 'all') {
      return appointments; // Return all appointments if 'all' is selected
    }
    return appointments.filter((appointment) => appointment.status === selectedStatus);
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Medical Appointments</h2>

      <div className="filters">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          {/* Add more months as needed */}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)} // Set selected status
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="calendar-grid">
        {daysInMonth.map((date) => (
          <div key={date} className="calendar-day">
            <h4 className="calendar-date">{date}</h4>
            {groupedAppointments[date] && groupedAppointments[date].length > 0 ? (
              filterAppointmentsByStatus(groupedAppointments[date]).map((appointment) => (
                <div
                  key={appointment.id}
                  className={`appointment-card ${appointment.status}`}
                >
                  <img
                    src={`/images/${appointment.image}`}
                    alt={appointment.fullName}
                    className="appointment-image"
                  />
                  <div className="appointment-info">
                    <p className="appointment-name">{appointment.fullName}</p>
                    <p className="appointment-time">
                      {appointment.timeFrom} - {appointment.timeTo}
                    </p>
                    <span className={`status ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="noappointments">No appointments</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
