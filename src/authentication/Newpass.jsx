import { Link } from "react-router-dom";
import { useState } from "react";
export default function NewPass(){
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    return(
        <div className="NewPass">
            <img src="/images/Asset 13.png" alt="img" id="loginimg"/>
            <h3 id="h3">Please enter the new Password</h3>
            <label htmlFor="newpass">New Password</label><br />
            <input type="password" name="newpass" id="newpass" value={newPass} onChange={(e)=>setNewPass(e.target.value)}></input>
            <br /><br />
            <label htmlFor="confirmpass">Confirm Password</label> <br />
            <input type="password" name="confirmpass" id="confirmpass" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}></input>
            <br />
            <Link to="/"><button id="btn">confirm</button></Link>
        </div>
    )
}