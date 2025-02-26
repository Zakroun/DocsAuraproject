import Part1Dashboard from "../Dashboardcomponents/Dashboardpart1";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../Dashboardcomponents/clanderboard";
import Homeboard from "../Dashboardcomponents/Homeboard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { changeboard } from "../data/DocsauraSlice";
import Appointmntform from "../Dashboardcomponents/appointmntform";
export default function Dashboard() {
  const locations = useLocation();
  const user = locations.state?.user || null;
  const curboard = useSelector((state) => state.Docsaura.currentboard);
  const dispatch = useDispatch()
  useEffect(()=>{
    if(user){
      dispatch(changeboard("appointmnt"))
    }
  },[user,dispatch])
  console.log(curboard);
  const doctors = useSelector((s) => s.Docsaura.doctors);
  const doctor = doctors.find((a) => a.id === 1);

  return (
    <div className="containerDashboard">
      <Part1Dashboard user={doctor} />
      <div className="part2dashboard">
        {curboard === "home" ? (
          <Homeboard doctor={doctor} />
        ) : curboard === "calander" ? (
          <Calendar appointments={doctor.appointments} />
        ) : curboard === "appointmnt" ? (
          <Appointmntform user={user} doctor={doctor}/>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
