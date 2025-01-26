import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [gender, setgender] = useState("");
  const [cities, setcities] = useState("");
  const [birthyear, setbirthyear] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  return (
    <div className="Register">
      <h1 id="h1">Create Account</h1>
      <input
        type="text"
        name="fullname"
        id="fullname"
        value={fullname}
        placeholder="Full Name"
        onChange={(e) => setfullname(e.target.value)}
      />
      <br />
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setemail(e.target.value)}
      />
      <br />
      <select
        name="Role"
        value={role}
        id="Role"
        onChange={(e) => setrole(e.target.value)}
      >
        <option value="">Choose your Role</option>
        <option value="Patient">Patient</option>
        <option value="doctor">doctor</option>
        <option value="pharmacy">pharmacy</option>
        <option value="pharmacy">laboratory</option>
      </select>
      <br />
      <select
        name="gender "
        value={gender}
        id="gender"
        onChange={(e) => setgender(e.target.value)}
      >
        <option value="">Choose your gender </option>
        <option value="Patient">Male</option>
        <option value="doctor">Female</option>
      </select>
      <br />
      <select
        id="cities"
        name="cities"
        value={cities}
        onChange={(e) => setcities(e.target.value)}
      >
        <option value="">Choose a city in Morocco</option>
        <option value="casablanca">Casablanca</option>
        <option value="rabat">Rabat</option>
        <option value="marrakech">Marrakech</option>
        <option value="fes">Fès</option>
        <option value="meknes">Meknès</option>
        <option value="tangier">Tangier</option>
        <option value="agadir">Agadir</option>
        <option value="oujda">Oujda</option>
        <option value="tetouan">Tétouan</option>
        <option value="safi">Safi</option>
        <option value="el-jadida">El Jadida</option>
        <option value="nador">Nador</option>
        <option value="kenitra">Kénitra</option>
        <option value="temara">Témara</option>
        <option value="settat">Settat</option>
        <option value="berrechid">Berrechid</option>
        <option value="khemisset">Khémisset</option>
        <option value="beni-mellal">Beni Mellal</option>
        <option value="taroudant">Taroudant</option>
        <option value="errachidia">Errachidia</option>
        <option value="laayoune">Laâyoune</option>
        <option value="dakhla">Dakhla</option>
        <option value="ouarzazate">Ouarzazate</option>
        <option value="taza">Taza</option>
        <option value="guelmim">Guelmim</option>
        <option value="sidi-kacem">Sidi Kacem</option>
        <option value="sidi-slimane">Sidi Slimane</option>
        <option value="oualidia">Oualidia</option>
        <option value="zoumi">Zoumi</option>
        <option value="youssoufia">Youssoufia</option>
        <option value="chefchaouen">Chefchaouen</option>
        <option value="asfi">Asfi</option>
        <option value="al-hoceima">Al Hoceima</option>
        <option value="midelt">Midelt</option>
        <option value="azilal">Azilal</option>
        <option value="taourirt">Taourirt</option>
        <option value="ifran">Ifrane</option>
        <option value="tiznit">Tiznit</option>
        <option value="essaouira">Essaouira</option>
        <option value="tan-tan">Tan-Tan</option>
        <option value="chichaoua">Chichaoua</option>
        <option value="smara">Smara</option>
      </select>

      {/* <input type="radio" name="Patient" id="Patient" onChange={()=>setrole('Patient')}/><label htmlFor="Patient">Patient</label>
            <input type="radio" name="doctor" id="doctor" onChange={()=>setrole('doctor')}/><label htmlFor="doctor">doctor</label>
            <input type="radio" name="pharmacy" id="pharmacy" onChange={()=>setrole('pharmacy')}/><label htmlFor="pharmacy">pharmacy</label>
            <input type="radio" name="laboratory" id="laboratory" onChange={()=>setrole('laboratory')}/><label htmlFor="laboratory">laboratory</label> */}
      <br />
      <input
        type="date"
        name="birthyear"
        id="birthyear"
        value={birthyear}
        onChange={(e) => setbirthyear(e.target.value)}
      />
      <br />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <br />
      <input
        type="password"
        name="confirmpassword"
        id="confirmpassword"
        placeholder="Confirm password"
        value={confirmpassword}
        onChange={(e) => setconfirmpassword(e.target.value)}
      />
      <br />
      <Link to="/pages/codeconfirm">
        <button id="btnRegister">Register</button>
      </Link>
    </div>
  );
}
