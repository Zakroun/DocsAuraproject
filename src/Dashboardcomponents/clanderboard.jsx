import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function Calendar(props) {
  const appointments = props.appointments || [];
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('02');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const groupedAppointments = appointments.reduce((acc, appointment) => {
    const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(appointment);
    return acc;
  }, {});

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

  const filterAppointmentsByStatus = (appointments) => {
    if (selectedStatus === 'all') {
      return appointments;
    }
    return appointments.filter((appointment) => appointment.status === selectedStatus);
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Medical Appointement</h2>

      <div className="filters">
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>

        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
        </select>

        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
        </select>

        <input
          type="text"
          placeholder="Search appointments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="calendar-actions">
        <button className="add-appointment" onClick={() => alert('Add new appointment')}>
          + Add Appointment
        </button>
      </div>

      <div className="legend">
        <div><span className="status completed"><FontAwesomeIcon icon={faCheckCircle} /></span> Completed</div>
        <div><span className="status pending"><FontAwesomeIcon icon={ faClock} /></span> Pending</div>
        <div><span className="status canceled"><FontAwesomeIcon icon={ faTimesCircle} /></span> Canceled</div>
      </div>

      <div className="calendar-grid">
        {daysInMonth.map((date) => (
          <div key={date} className="calendar-day">
            <h4 className="calendar-date">{date}</h4>
            {groupedAppointments[date] && groupedAppointments[date].length > 0 ? (
              filterAppointmentsByStatus(groupedAppointments[date])
                .filter((appointment) =>
                  appointment.fullName.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((appointment) => (
                  <Link key={appointment.id} className="Link" to={`/pages/Dashboard`} state={{user : appointment}}>
                  <div className={`appointment-card ${appointment.status}`}>
                    <div className="appointment-info">
                      <p className="appointment-name">{appointment.fullName}</p>
                      <p className="appointment-time">
                        {appointment.timeFrom} - {appointment.timeTo}
                      </p>
                      <p className="appointment-amount">${appointment.amount}</p>
                      <span className={`status ${appointment.status}`}>
                        {appointment.status === 'completed' && <FontAwesomeIcon icon={faCheckCircle} />}
                        {appointment.status === 'pending' && <FontAwesomeIcon icon={faClock} />}
                        {appointment.status === 'canceled' && <FontAwesomeIcon icon={faTimesCircle} />}
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                  </Link>
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