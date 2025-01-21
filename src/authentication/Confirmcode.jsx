import { Link } from "react-router-dom";
import { useState } from "react";
export default function CodeConfirm(){
    const [code, setCode] = useState("");

    return(
        <div className="CodeConfirm">
            <h1 id="h1">Code Confirm</h1>
            <label htmlFor="code">Code : </label>
            <input type="text" name="code" id="code" value={code} onChange={(e)=>setCode(e.target.value)}/>
            <br />
            <Link to={'/'}><button>confirm</button></Link>
        </div>
    )
}