import { Link } from "react-router-dom";
import { useState } from "react";
export default function NewPass(){
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    return(
        <div className="NewPass">
            <h1 id="h1">Change Password</h1>
            <label htmlFor="newpass">New Password:</label>
            <input type="password" id="newpass" value={newPass} onChange={(e)=>setNewPass(e.target.value)}></input>
            <br />
            <label htmlFor="confirmpass">Confirm Password:</label>
            <input type="password" id="confirmpass" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}></input>
            <br />
            <Link to="/"><button>confirm</button></Link>
        </div>
    )
}