import { Link } from "react-router-dom";
import { useState } from "react";
export default function NewPass(){
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    return(
        <div className="NewPass">
            <h2 id="h2code">Please enter the new Password</h2>
            <input type="password" name="newpass" id="newpass" placeholder="New Password" value={newPass} onChange={(e)=>setNewPass(e.target.value)}></input>
            <br />
            <input type="password" name="confirmpass" id="confirmpass" placeholder="Confirm Password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}></input>
            <br />
            <Link to="/"><button id="btn">confirm</button></Link>
        </div>
    )
}