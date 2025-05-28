import { useEffect, useState } from "react";
import Loader from "./static/Loader";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Routage from "./Routage";
import { useDispatch } from "react-redux";
import { fetchAllUsers, fetchUserAppointments } from "./data/DocsauraSlice";

function App() {
  const dispatch = useDispatch();
  const [displayLoader, setDisplayLoader] = useState(true);
  const [displayPages, setDisplayPages] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Function to clear user data after 24 hours
  const setTokenExpiration = () => {
    if (user) {
      const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const currentTime = new Date().getTime();
      
      // Check if expiration time is already set
      const expiration = localStorage.getItem("tokenExpiration");
      
      if (!expiration) {
        // Set expiration time if not already set
        localStorage.setItem("tokenExpiration", currentTime + expirationTime);
      } else if (currentTime > parseInt(expiration)) {
        // Clear all user related data if expired
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        window.location.reload(); // Refresh the page to update the state
      }
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setDisplayLoader(false);
      setDisplayPages(true);
    }, 500);
    return () => clearInterval(time);
  }, []);

  useEffect(() => {
    setTokenExpiration(); // Check token expiration on initial load
    
    // Set up interval to check token expiration every hour
    const expirationCheckInterval = setInterval(setTokenExpiration, 60 * 60 * 1000);
    
    dispatch(fetchAllUsers());
    
    if (user) {
      // Determine which ID to use based on role
      let id, role;
      switch(user.role) {
        case 'doctor':
          id = user.id_doctor;
          role = 'doctor';
          break;
        case 'clinic':
          id = user.id_clinic;
          role = 'clinic';
          break;
        case 'laboratory':
          id = user.id_labo;
          role = 'laboratory';
          break;
        default:
          id = user.id;
          role = 'Patient';
      }
      
      dispatch(fetchUserAppointments({ id, role }));
    }
    
    return () => {
      clearInterval(expirationCheckInterval); // Clean up interval on unmount
    };
  }, [dispatch, user]);

  return (
    <div className="App">
      {displayLoader && <Loader />}
      {displayPages && (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route path="/pages/:d" element={<Routage />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;