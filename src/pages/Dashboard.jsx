import Part1Dashboard from "../Dashboardcomponents/Dashboardpart1";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../Dashboardcomponents/clanderboard";
import Homeboard from "../Dashboardcomponents/Homeboard";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { changeboard } from "../data/DocsauraSlice";
import Appointmntform from "../Dashboardcomponents/appointmntform";
import SettingsBoard from "../Dashboardcomponents/SettingsBoard";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const locations = useLocation();
  const user = locations.state?.user || null;
  const curboard = useSelector((state) => state.Docsaura.currentboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(changeboard("appointmnt"));
      navigate(".", { replace: true, state: {} });
    }
  }, [user, dispatch]);

  console.log(curboard);
  const Users = useSelector((s) => s.Docsaura.visitors);
  const Use = Users.find((a) => a.id === 1);

  return (
    <div className="containerDashboard">
      <Part1Dashboard Use={Use} />
      <div className="part2dashboard">
        {curboard === "home" ? (
          <Homeboard Use={Use} />
        ) : curboard === "calander" ? (
          <Calendar appointments={Use.appointments} />
        ) : curboard === "appointmnt" ? (
          <Appointmntform user={user} Use={Use} />
        ) : curboard === "settings" ? ( 
          <SettingsBoard Use={Use}/>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
