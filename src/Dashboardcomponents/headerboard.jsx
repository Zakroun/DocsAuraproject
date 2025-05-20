import { LuSearch } from "react-icons/lu";
import { IoNotificationsSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeboard } from "../data/DocsauraSlice";
import { Menu } from "../data/DocsauraSlice";
import { IoMenu } from "react-icons/io5";
import axios from "axios";
import moment from "moment";
export default function HeaderBoard({ Use }) {
  const verified = Use.verified;
  const dispatch = useDispatch();
  const tableSearch = [
    "home",
    "calander",
    "settings",
    "messages",
    "files",
    "Logout",
  ];
  
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const apiBaseUrl = 'http://localhost:8000/api';

  // Fetch notifications from API
  const fetchNotifications = async () => {
    if (!userId) {
      setError('User ID not found');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${apiBaseUrl}/notifications`, {
        params: { userId }
      });
      setNotifications(response.data.data);
      updateUnreadCount(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`${apiBaseUrl}/notifications/${notificationId}/read`, { userId });
      
      // Update local state
      setNotifications(prev => prev.map(notif => 
        notif.id === notificationId ? {...notif, isRead: 1} : notif
      ));
      
      // Update unread count
      setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Update unread count
  const updateUnreadCount = (notifs) => {
    const count = notifs.filter(n => n.isRead === 0).length;
    setUnreadCount(count);
  };

  // Fetch initial unread count
  const fetchUnreadCount = async () => {
    if (!userId) return;
    
    try {
      const response = await axios.get(`${apiBaseUrl}/notifications/unread-count`, {
        params: { userId }
      });
      setUnreadCount(response.data.count);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  // Toggle notifications dropdown
  const toggleNotifications = () => {
    const newState = !showNotifications;
    setShowNotifications(newState);
    if (newState) {
      fetchNotifications();
    }
  };

  // Format time using moment.js
  const formatTime = (dateString) => {
    return moment(dateString).fromNow();
  };

  // Search function
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

  // Highlight search matches
  const highlightMatch = (word, query) => {
    const parts = word.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={index}
          style={{ color: "rgb(0, 113, 128)", fontWeight: "bold" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Change board view
  const Change = (a) => {
    dispatch(changeboard(a));
    setSearch("");
  };

  // Toggle menu
  const toggleMenu = () => {
    dispatch(Menu());
  };

  // Set up scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      toggleMenu();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Clear search results when empty
  useEffect(() => {
    if (search === "") {
      setSearchResult([]);
    }
  }, [search]);

  // Initial fetch of unread count
  useEffect(() => {
    fetchUnreadCount();
  }, [userId]);

  return (
    <header className="header-board">
      <div className="searchadd">
        <div className="Part1Dashboard__header">
          <IoMenu className="menu-icon" size={50} onClick={toggleMenu} />
        </div>
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
          {verified ? (
            <div className="serachresult">
              {searchResult.map((a, k) => {
                return (
                  <div className="searchitem" onClick={() => Change(a)} key={k}>
                    <p>{highlightMatch(a, search)}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="add">
          <div className="notification-container">
            <div
              className="icon-wrapper"
              onClick={toggleNotifications}
            >
              <IoNotificationsSharp
                size={24}
                color="#008481"
                className="notification-icon"
              />
              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount}
                </span>
              )}
            </div>
            {showNotifications && (
              <div className="notification-dropdown">
                {loading ? (
                  <div className="notification-loading">
                    <div className="spinner"></div>
                    <span>Loading notifications...</span>
                  </div>
                ) : error ? (
                  <div className="notification-error">
                    <span>⚠️ {error}</span>
                  </div>
                ) : notifications.length > 0 ? (
                  <>
                    <div className="notification-header">
                      <h4>Notifications</h4>
                      <button 
                        className="mark-all-read"
                        onClick={() => {
                          notifications.forEach(notif => {
                            if (!notif.isRead) markAsRead(notif.id);
                          });
                        }}
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="notification-list">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}
                          onClick={() => !notif.isRead && markAsRead(notif.id)}
                        >
                          <div className="notification-content">
                            <div className="notification-title">{notif.title}</div>
                            <div className="notification-message">{notif.content}</div>
                            <div className="notification-meta">
                              <span className="time">{formatTime(notif.created_at)}</span>
                              {!notif.isRead && <span className="unread-dot"></span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="notification-empty">
                    <span>No notifications</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}