import { useEffect, useState } from "react";
import Loader from "./static/Loader";
import { Link, Routes, Route } from "react-router-dom";
import Routage from "./Routage";
function App() {
  const [displayLoder, setdis] = useState(true);
  const [disppages, setdisppages] = useState(false);
  useEffect(() => {
    const time = setTimeout(() => {
      setdis(false);
      setdisppages(true);
    }, 2000);
    return () => clearInterval(time);
  });
  return (
    <div className="App">
      {displayLoder && <Loader></Loader>}
      {disppages && (
        <>
          <Routes>
            <Route path="/" element={<><Link to={"/pages/Login"}>Login</Link><h1>Hello react</h1></>}></Route>
            <Route path="/pages/:d" element={<Routage></Routage>}></Route>
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
