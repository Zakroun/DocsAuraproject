import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { GoFileSubmodule } from "react-icons/go";
import { RiLoginBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeboard } from "../data/DocsauraSlice";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Menu } from "../data/DocsauraSlice";
// admin
import { FaUsers } from "react-icons/fa6";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";

export default function Part1Dashboard(props) {
  const user = props.Use;
  const dispatch = useDispatch();
  const curmenu = useSelector((s) => s.Docsaura.menu);
  const [menuOpen, setMenuOpen] = useState(curmenu);
  
  const toggleMenu = () => {
    dispatch(Menu());
  };
  
  useEffect(() => {
    setMenuOpen(curmenu);
  }, [curmenu]);

  const isAdmin = user?.role === "admin";
  const isVerified = user?.verified === 1; // Changed to check for 1 instead of boolean

  return (
    <>
      <div className="Part1Dashboard_menu">
        <div className={`Part1Dashboard_active ${menuOpen ? "open" : "closed"}`}>
          <div className="content">
            <IoMenu className="menu-icon2" size={50} onClick={toggleMenu} />

            {isAdmin ? (
              <>
                <IoMdHome
                  className="icon enabled"
                  onClick={() => dispatch(changeboard("home"))}
                />
                <FaUsers
                  className="icon enabled"
                  onClick={() => dispatch(changeboard("users"))}
                />
                <FaCodePullRequest
                  className="icon enabled"
                  onClick={() => dispatch(changeboard("requests"))}
                />
                <MdOutlinePendingActions
                  className="icon enabled"
                  onClick={() => dispatch(changeboard("complaints"))}
                />
              </>
            ) : (
              <>
                <IoMdHome
                  className="icon enabled"
                  onClick={() => dispatch(changeboard("home"))}
                />
                <FaCalendarAlt
                  className={`icon ${isVerified ? "enabled" : "disabled"}`}
                  onClick={isVerified ? () => dispatch(changeboard("calander")) : null}
                />
                <BiSolidMessageSquareDetail
                  className={`icon ${isVerified ? "enabled" : "disabled"}`}
                  onClick={isVerified ? () => dispatch(changeboard("messages")) : null}
                />
                <IoMdSettings
                  className={`icon ${isVerified ? "enabled" : "disabled"}`}
                  onClick={isVerified ? () => dispatch(changeboard("settings")) : null}
                />
                <GoFileSubmodule
                  className={`icon ${isVerified ? "enabled" : "disabled"}`}
                  onClick={isVerified ? () => dispatch(changeboard("files")) : null}
                />
              </>
            )}
          </div>

          <div className="footerdashbord">
            <RiLoginBoxFill
              className="iconleft"
              onClick={() => dispatch(changeboard("Logout"))}
            />
          </div>
        </div>
      </div>

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
          {isAdmin ? (
            <>
              <IoMdHome
                className="icon enabled"
                onClick={() => dispatch(changeboard("home"))}
              />
              <FaUsers
                className="icon enabled"
                onClick={() => dispatch(changeboard("users"))}
              />
              <FaCodePullRequest
                className="icon enabled"
                onClick={() => dispatch(changeboard("requests"))}
              />
              <MdOutlinePendingActions
                className="icon enabled"
                onClick={() => dispatch(changeboard("complaints"))}
              />
            </>
          ) : (
            <>
              <IoMdHome
                className="icon enabled"
                onClick={() => dispatch(changeboard("home"))}
              />
              <FaCalendarAlt
                className={`icon ${isVerified ? "enabled" : "disabled"}`}
                onClick={isVerified ? () => dispatch(changeboard("calander")) : null}
              />
              <BiSolidMessageSquareDetail
                className={`icon ${isVerified ? "enabled" : "disabled"}`}
                onClick={isVerified ? () => dispatch(changeboard("messages")) : null}
              />
              <IoMdSettings
                className={`icon ${isVerified ? "enabled" : "disabled"}`}
                onClick={isVerified ? () => dispatch(changeboard("settings")) : null}
              />
              <GoFileSubmodule
                className={`icon ${isVerified ? "enabled" : "disabled"}`}
                onClick={isVerified ? () => dispatch(changeboard("files")) : null}
              />
            </>
          )}
        </div>

        <div className="footerdashbord">
          <RiLoginBoxFill
            className="iconleft"
            onClick={() => dispatch(changeboard("Logout"))}
          />
        </div>
      </div>
    </>
  );
}