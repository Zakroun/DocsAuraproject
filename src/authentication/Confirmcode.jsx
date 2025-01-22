import { Link } from "react-router-dom";
import { useState } from "react";
export default function CodeConfirm(){
    const [code, setCode] = useState("");

    return(
        <div className="CodeConfirm">
            <img src="/images/Asset 13.png" alt="img" id="loginimg"/>
            <h3 id="h3">Please enter confirmation code</h3>
            <label htmlFor="code">Code </label><br />
            <input type="text" name="codeconfirmaccount" id="code" value={code} onChange={(e)=>setCode(e.target.value)}/>
            <br />
            <Link to={'/'}><button id="btn">confirm</button></Link>
        </div>
    )
}