import { LuSearch } from "react-icons/lu";
import { IoNotificationsSharp } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeboard } from "../data/DocsauraSlice";
// import { changeboard } from "../data/DocsauraSlice";
export default function HeaderBoard() {
  const dispatch = useDispatch();
  const tableSearch = [
    "home",
    "calander",
    "appointmnt",
    "settings",
    "messages",
    "Logout",
  ];
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const Searchfn = (e) => {
    setSearch(e);
    if (e !== "") {
      const result = tableSearch.filter((item) =>
        item.toLowerCase().includes(e.toLowerCase())
      );
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  };
  const highlightMatch = (word, query) => {
    const parts = word.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ color: "rgb(0, 113, 128)", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    { id: 1, message: "New patient registered", time: "2 mins ago" },
    { id: 2, message: "Appointment rescheduled", time: "10 mins ago" },
    { id: 3, message: "New message from John", time: "30 mins ago" },
  ];
  const Change = (a) =>{
    dispatch(changeboard(a))
    setSearch("")
  }
  return (
    <header className="header-board">
      <div className="searchadd">
        <div className="serach_parent">
          <div className="searchdiv">
            <input
              type="text"
              placeholder="Search ..."
              className="inputsearch"
              value={search}
              onChange={(e) => Searchfn(e.target.value)}
            />
            <button className="searchbtn">
              <LuSearch className="iconsearch" size={15} />
            </button>
          </div>
          <div className="serachresult">
            {searchResult.map((a,k) => {
              return (
                <div className="searchitem" onClick={()=>Change(a)} key={k}>
                  <p>{highlightMatch(a, search)}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="add">
          {/* <button className="addbtn" onClick={()=>dispatch(changeboard('addPatient'))}>+ Add Patients</button> */}
          <div className="notification-container">
            <div
              className="icon-wrapper"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <IoNotificationsSharp
                size={24}
                color="#008481"
                className="notification-icon"
              />
              {notifications.length > 0 && (
                <span className="notification-badge">
                  {notifications.length}
                </span>
              )}
            </div>
            {showNotifications && (
              <div className="notification-dropdown">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="notification-item">
                      {notif.message}
                      <span className="time">{notif.time}</span>
                    </div>
                  ))
                ) : (
                  <p>No notifications for now</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
