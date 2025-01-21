import { useParams } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Signup";
import CodeConfirm from "./authentication/Confirmcode";
import NewPass from "./authentication/Newpass";
import ConfirmEmail from "./authentication/ConifrmEmail";
import Conirmcodepass from "./authentication/conirmcodepass";
export default function Routage(){
    const {d} = useParams()
    if (d === 'Login') {
        return <Login />;
      } else if (d === 'register') {
        return <Register />;
      } else if (d === 'forgetpass') {
        return <ConfirmEmail />;
      } else if (d === 'codeconfirm') {
        return <CodeConfirm />;
      } else if (d === 'codeconfirmforget') {
        return <Conirmcodepass />;
      } else if (d === 'newpass') {
        return <NewPass />;
      }
}