import { Link } from "react-router-dom";
import { useState } from "react";
export default function Login(){
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    return(
        <div className="login">
            <img src="/images/Asset 13.png" alt="img" id="loginimg"/>
            <h3 id="h3">Welkom back, please login <br /> to your account.</h3>
            <label htmlFor="Email">Email </label><br />
            <input type="email" name="email" id="email" value={email} onChange={(e)=>setemail(e.target.value)}/><br /><br />
            <label htmlFor="Password">Password </label><br />
            <input type="password" name="password" id="password" value={password} onChange={(e)=>setpassword(e.target.value)}/><br />
            <input type="checkbox" name="remember" id="remember" /> <label htmlFor="remember">remember me</label> <br />
            <button id="btn">Login</button><br />
            <Link to='/pages/register'><button id="btn2">Register</button></Link><br />
            <Link to='/pages/forgetpass' id="link">Forget your password</Link>
        </div>
    )

}