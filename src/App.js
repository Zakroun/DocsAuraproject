import { useEffect, useState } from "react";
import Loader from "./static/Loader";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Routage from "./Routage";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "./data/DocsauraSlice";
//import UserProfile from "./userpages/user";
function App() {
  const dispatch = useDispatch();
  const [displayLoder, setdis] = useState(true);
  const [disppages, setdisppages] = useState(false);
  useEffect(() => {
    const time = setTimeout(() => {
      setdis(false);
      setdisppages(true);
    }, 500);
    return () => clearInterval(time);
  });
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  return (
    <div className="App">
      {displayLoder && <Loader></Loader>}
      {disppages && (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home></Home>
                </>
              }
            ></Route>
            <Route path="/pages/:d" element={<Routage></Routage>}></Route>
            {/* <Route path="/user" element={<UserProfile />}></Route> */}
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
