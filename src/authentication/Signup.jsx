import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(){
    const [fullname, setfullname] = useState("");
    const [email,setemail] = useState('')
    const [role,setrole] = useState('')
    const [password,setpassword] = useState('')
    const [confirmpassword,setconfirmpassword] = useState('')

    return(
        <div className="Register">
            <img src="/images/Asset 13.png" alt="img" id="loginimg"/>
            <h3 id="h3">Register</h3>
            <label htmlFor="fullname">Full Name </label><br />
            <input type="text" name="fullname" id="fullname" value={fullname} onChange={(e)=>setfullname(e.target.value)}/>
            <br /><br />
            <label htmlFor="email">Email </label><br />
            <input type="email" name="email" id="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
            <br /><br />
            <label htmlFor="role">Role </label><br />
            <select name="Role" value={role} id="Role" onChange={(e)=>setrole(e.target.value)}>
                <option value="">Choose your Role</option>
                <option value="Patient">Patient</option>
                <option value="doctor">doctor</option>
                <option value="pharmacy">pharmacy</option>
                <option value="pharmacy">laboratory</option>
            </select>
            {/* <input type="radio" name="Patient" id="Patient" onChange={()=>setrole('Patient')}/><label htmlFor="Patient">Patient</label>
            <input type="radio" name="doctor" id="doctor" onChange={()=>setrole('doctor')}/><label htmlFor="doctor">doctor</label>
            <input type="radio" name="pharmacy" id="pharmacy" onChange={()=>setrole('pharmacy')}/><label htmlFor="pharmacy">pharmacy</label>
            <input type="radio" name="laboratory" id="laboratory" onChange={()=>setrole('laboratory')}/><label htmlFor="laboratory">laboratory</label> */}
            <br /><br />
            <label htmlFor="password">Password </label><br />
            <input type="password" name="password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
            <br /><br />
            <label htmlFor="confirmpassword">Confirm Password </label><br />
            <input type="password" name="confirmpassword" id="confirmpassword" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)}/>
            <br /><br />
            <Link to="/pages/codeconfirm"><button id="btn">Register</button></Link>
        </div>
    )

}