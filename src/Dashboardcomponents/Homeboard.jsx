import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { FaHospitalUser } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";

export default function Homeboard(props) {
  const d = props.doctor;
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  return (
    <div className="homeboard">
      <div className="searchadd">
        <div className="searchdiv">
          <input type="text" placeholder="Search ..." className="inputsearch" />
          <button className="searchbtn">
            <LuSearch className="iconsearch" size={15} />
          </button>
        </div>
        <div className="add">
          <button className="addbtn"> + Add Patients</button>
        </div>
      </div>
      <div className="homeboard__header">
        <div className="homeboard__header__title">
          <h1>
            {greeting} <br /> <span> {d.fullName} </span>
          </h1>
          <p>Have a nice day at the hospital!</p>
        </div>
        <div className="homeboard__header__image">
          <img src={`../images/doctor.png`} alt="Doctor Image" />
        </div>
      </div>
      <div className="weeklyReports">
        <div className="weeklyheader">
          <h2>Weekly Reports</h2>
          <select name="weeklyselect" id="weeklyselect">
            <option value="last week">Last Week</option>
            <option value="this week">This Week</option>
            <option value="last month">Last Month</option>
            <option value="this month">This Month</option>
            <option value="last year">Last Year</option>
            <option value="this year">This Year</option>
          </select>
        </div>
        <div className="weeklyReports__content">
          <div className="partweekly">
            <div className="partweekly__header">
              <FaHospitalUser size={30} color="#008481" style={{backgroundColor:'#00848276', padding:7 , borderRadius:10}}/>
            </div>
            <h3>Total Patients </h3>
            <h3>200</h3>
          </div>
          <div className="partweekly">
            <div className="partweekly__header">
              <IoCallSharp size={30} color="rgb(195, 101, 0)" style={{backgroundColor:'rgba(195, 101, 0, 0.45)', padding:7 , borderRadius:10}}/>
            </div>
            <h3>Phone Calls </h3>
            <h3>20</h3>
          </div>
          <div className="partweekly">
            <div className="partweekly__header">
              <FaCalendarAlt size={30} color="rgb(153, 0, 0)" style={{backgroundColor:'rgba(153, 0, 0, 0.46)', padding:7 , borderRadius:10}}/>
            </div>
            <h3>Appointements </h3>
            <h3>100</h3>
          </div>
          <div className="partweekly">
            <div className="partweekly__header">
              <MdMarkEmailUnread size={30} color="rgb(0, 0, 155)" style={{backgroundColor:'rgba(0, 0, 155, 0.44)', padding:7 , borderRadius:10}}/>
            </div>
            <h3>Unread Messages </h3>
            <h3>10</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
