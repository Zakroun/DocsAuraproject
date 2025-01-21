import { Link } from "react-router-dom";
import { useState } from "react";
export default function ConfirmEmail() {
    return(
        <div className="ForgetPass">
            <h1 id="h1">Forget Password</h1>
            <label htmlFor="emailpass">Email : </label>
            <input type="email" name="emailpass" id="emailpass" />
            <br />
            <Link to='/pages/codeconfirmforget'><button>Send</button></Link>
        </div>
    )
}