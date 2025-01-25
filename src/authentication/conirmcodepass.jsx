
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Conirmcodepass(){
    const [code, setCode] = useState("");

    return(
        <div className="CodeConfirm">
             {/* <img src="/images/Asset 13.png" alt="img" id="loginimg"/> */}
             <h2 id="h2code">Please enter confirmation code</h2>
            <input type="text" name="codeconfirmemail" placeholder="confirmation code" id="code" value={code} onChange={(e)=>setCode(e.target.value)}/>
            <br />
            <Link to='/pages/newpass'><button id="btn">confirm</button></Link>
        </div>
    )
}