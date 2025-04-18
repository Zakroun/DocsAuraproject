import Part1Dashboard from "../Dashboardcomponents/Dashboardpart1";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../Dashboardcomponents/clanderboard";
import Homeboard from "../Dashboardcomponents/Homeboard";
import { useLocation } from "react-router-dom";
import FileManager from "../Dashboardcomponents/Filemanager";
import { useState } from "react";
import { useEffect } from "react";
import { changeboard } from "../data/DocsauraSlice";
import Appointmntform from "../Dashboardcomponents/appointmntform";
import SettingsBoard from "../Dashboardcomponents/SettingsBoard";
import { useNavigate } from "react-router-dom";
import Messages from "../Dashboardcomponents/Messages/Messages";
import HeaderBoard from "../Dashboardcomponents/headerboard";
import Logout from "../Dashboardcomponents/Logout";
export default function Dashboard() {
  const navigate = useNavigate();
  const locations = useLocation();
  const user = locations.state?.user || null;
  const curboard = useSelector((state) => state.Docsaura.currentboard);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.Docsaura.conversations);
  const [Listconversations, setListconversations] = useState(conversations);
  useEffect(()=>{
    setListconversations(conversations)
  },[conversations])

  useEffect(() => {
    if (user) {
      dispatch(changeboard("appointmnt"));
      navigate(".", { replace: true, state: {} });
    }
  }, [user, dispatch, navigate]);

  const Users = useSelector((s) => s.Docsaura.laboratories);
  const Use = Users.find((a) => a.id === 1);
  return (
    <div className="containerDashboard">
      <Part1Dashboard Use={Use} />
      <div className="part2dashboard">
        <HeaderBoard Use={Use}/>
        {curboard === "home" ? (
          <Homeboard Use={Use} />
        ) : curboard === "calander" ? (
          <Calendar appointments={Use.appointments} />
        ) : curboard === "appointmnt" ? (
          <Appointmntform user={user} Use={Use} />
        ) : curboard === "settings" ? (
          <SettingsBoard Use={Use} />
        ) : curboard === "messages" ? (
          <Messages conversations={Listconversations} />
        ) : curboard === "Logout" ? (
          <Logout />
        ) :  curboard === "files" ? (
          <FileManager />
        ) : (
          <div></div>
        )
      }
      </div>
    </div>
  );
}
