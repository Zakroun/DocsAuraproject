import { Link } from "react-router-dom";
import { useState } from "react";
export default function CodeConfirm(){
    const [code, setCode] = useState("");

    return(
        <div className="CodeConfirm">
            {/* <img src="/images/Asset 13.png" alt="img" id="loginimg"/> */}
            <h2 id="h2code">Please enter confirmation code</h2>
            <input type="text" name="codeconfirmaccount" placeholder="Confirmation code" id="code" value={code} onChange={(e)=>setCode(e.target.value)}/>
            <br />
            <Link to={'/'}><button id="btn">confirm</button></Link>
        </div>
    )
}