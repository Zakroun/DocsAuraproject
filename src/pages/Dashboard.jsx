import Part1Dashboard from "../Dashboardcomponents/Dashboardpart1";
import { useSelector } from "react-redux";

import Homeboard from "../Dashboardcomponents/Homeboard";
export default function Dashboard() {
  const curboard = useSelector((state) => state.Docsaura.currentboard);
  const doctors = useSelector((s) => s.Docsaura.visitors);
  const doctor = doctors.find((a) => a.id === 7);
  return (
    <div className="containerDashboard">
      <Part1Dashboard user={doctor}/>
      <div className="part2dashboard">
        {curboard === "home" ? <Homeboard doctor={doctor}/> : <div> </div>}
      </div>
    </div>
  );
}
