import { useParams } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Signup";
import CodeConfirm from "./authentication/Confirmcode";
import NewPass from "./authentication/Newpass";
import ConfirmEmail from "./authentication/ConifrmEmail";
import Conirmcodepass from "./authentication/conirmcodepass";
import DivImage from "./static/divimage";
export default function Routage() {
  const { d } = useParams();
  if (d === "Login") {
    return (
      <div className="countainer">
        <DivImage />
        <Login />
      </div>
    );
  } else if (d === "register") {
    return (
      <div className="countainer">
        <DivImage /> <Register />
      </div>
    );
  } else if (d === "forgetpass") {
    return (
      <div className="countainer">
        <DivImage /> <ConfirmEmail />
      </div>
    );
  } else if (d === "codeconfirm") {
    return (
      <div className="countainer">
        <DivImage /> <CodeConfirm />
      </div>
    );
  } else if (d === "codeconfirmforget") {
    return (
      <div className="countainer">
        <DivImage /> <Conirmcodepass />
      </div>
    );
  } else if (d === "newpass") {
    return (
      <div className="countainer">
        <DivImage /> <NewPass />
      </div>
    );
  }
}
