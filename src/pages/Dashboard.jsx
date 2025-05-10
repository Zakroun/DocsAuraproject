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
import Userslist from "../Dashboardcomponents/Users";
import Requests from "../Dashboardcomponents/Requests";
import Controlpanel from "../Dashboardcomponents/Controlpanel";
import Complaints from "../Dashboardcomponents/Complaints";

export default function Dashboard() {
  const navigate = useNavigate();
  const locations = useLocation();
  const Use = locations.state?.user || null;
  const curboard = useSelector((state) => state.Docsaura.currentboard);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.Docsaura.conversations);
  const [Listconversations, setListconversations] = useState(conversations);
  useEffect(() => {
    setListconversations(conversations);
  }, [conversations]);

  useEffect(() => {
    if (Use) {
      dispatch(changeboard("appointmnt"));
      navigate(".", { replace: true, state: {} });
    }
  }, [Use, dispatch, navigate]);

  // const Users = useSelector((s) => s.Docsaura.doctors);
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);
  console.log(user)
  
  console.log('curent user ' , user)
  return (
    <div className="containerDashboard">
      <Part1Dashboard Use={user} />
      <div className="part2dashboard">
        <HeaderBoard Use={user} />
        {curboard === "home" ? (
          <Homeboard Use={user} />
        ) : curboard === "calander" ? (
          <Calendar appointments={user.appointments} role={user.Role} id={user.id}/>
        ) : curboard === "appointmnt" ? (
          <Appointmntform user={Use} Use={user} />
        ) : curboard === "settings" ? (
          <SettingsBoard Use={user} />
        ) : curboard === "messages" ? (
          <Messages conversations={Listconversations} />
        ) : curboard === "Logout" ? (
          <Logout />
        ) : curboard === "files" ? (
          <FileManager />
        ) : curboard === "users" ? (
          <Userslist />
        ) : curboard === "requests" ? (
          <Requests />
        ) : curboard === "complaints" ? (
          <Complaints />
        ) : curboard === "dashboard" ? (
          <Controlpanel />
        ) : (
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At
              perferendis dolore fugiat aliquid sint quisquam officia dolorem in
              necessitatibus voluptatibus corrupti, temporibus quia nemo sequi
              possimus autem repudiandae. Nulla, suscipit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
