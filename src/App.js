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

  useEffect(() => {
    const time = setTimeout(() => {
      setDisplayLoader(false);
      setDisplayPages(true);
    }, 500);
    return () => clearInterval(time);
  }, []);

  useEffect(() => {
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
          role = 'visiteur';
      }
      
      dispatch(fetchUserAppointments({ id, role }));
    }
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