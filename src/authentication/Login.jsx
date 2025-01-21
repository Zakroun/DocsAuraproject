import { Link } from "react-router-dom";
import { useState } from "react";
export default function Login(){
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    return(
        <div className="login">
            <h1 id="h1">Login</h1>
            <label htmlFor="Email">Email </label><br />
            <input type="email" name="email" id="email" value={email} onChange={(e)=>setemail(e.target.value)}/><br />
            <label htmlFor="Password">Password </label><br />
            <input type="password" name="password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)}/><br />
            <button id="btn">Login</button><br />
            <Link to='/pages/register'><button id="btn">Register</button></Link><br />
            <Link to='/pages/forgetpass' id="link">Forget your password</Link>
        </div>
    )

}