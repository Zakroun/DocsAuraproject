import { Link } from "react-router-dom";
import { useState } from "react";
export default function ConfirmEmail() {
    const [email, setemail] = useState("");
    return(
        <div className="ForgetPass">
            <h2 id="h2email">Please enter your Email to send <br /> confirmation code</h2>            
            <label htmlFor="emailpass">Email </label><br />
            <input type="email" name="emailpass" value={email} id="emailpass" onChange={(e)=>setemail(e.target.value)}/>
            <br />
            <Link to='/pages/codeconfirmforget'><button id="btn">Send</button></Link>
        </div>
    )
}