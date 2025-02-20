import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { GoFileSubmodule } from "react-icons/go";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeboard } from "../data/DocsauraSlice";

export default function Part1Dashboard(props) {
  const user = props.user;
  const dispatch = useDispatch();

  return (
    <div className="Part1Dashboard">
      <div className="Part1Dashboard__header">
        <Link to={"/"}>
          <img
            src="/Images/Asset 10.png"
            alt="logodashboard"
            className="logodashboard"
          />
        </Link>
      </div>
      <div className="content">
        <IoMdHome
          className="icon enabled"
          onClick={() => dispatch(changeboard("home"))}
        />
        <FaCalendarAlt
          className={`icon ${user.Verified === false ? "disabled" : "enabled"}`}
          onClick={user.Verified === false ? null : () => dispatch(changeboard("calander"))}
        />
        <BiSolidMessageSquareDetail
          className={`icon ${user.Verified === false ? "disabled" : "enabled"}`}
          onClick={user.Verified === false ? null : () => dispatch(changeboard("messages"))}
        />
        <IoMdSettings
          className={`icon ${user.Verified === false ? "disabled" : "enabled"}`}
          onClick={user.Verified === false ? null : () => dispatch(changeboard("settings"))}
        />
        <GoFileSubmodule
          className={`icon ${user.Verified === false ? "disabled" : "enabled"}`}
          onClick={user.Verified === false ? null : () => dispatch(changeboard("files"))}
        />
      </div>
      <div className="footerdashbord">
        <RiLoginBoxFill className="iconleft" />
      </div>
    </div>
  );
}
