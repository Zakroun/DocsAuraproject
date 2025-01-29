import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ListDocCliLAbo() {
    const Doc = useSelector((state) => state.Docsaura.doctors);
    const Clinic = useSelector((state) => state.Docsaura.clinics);
    const Labo = useSelector((state) => state.Docsaura.laboratories);

    return(
        <div className="ListDocCliLAbo">
            <h1>Doctors</h1>
            <hr className="hrsevice" />
            <div className="containerDoctors">
                {Doc.slice(0, 4).map((d) => (
                    <div key={d.id} className="doctor">
                        <img id="imgDocLabcli" src={`/images/${d.image}`} alt={d.fullName} />
                        <h2>{d.fullName}</h2>
                        <p>{d.specialty}</p>
                        <Link to={`/pages/doctors/${d.id}`}><button className="btnsee">See</button></Link>
                    </div>
                ))}
            </div>
            <button className="btnseemore">See more</button>
            <h1>Clinics</h1>
            <hr className="hrsevice" />
            <div className="containerClinics">
                {Clinic.slice(0, 4).map((c) => (
                    <div key={c.id} className="clinic">
                        <img id="imgDocLabcli" src={`/images/${c.image}`} alt={c.name} />
                        <h2>{c.name}</h2>
                        <p>{c.address}</p>
                        <Link to={`/clinics/${c.id}`}><button className="btnsee">See</button></Link>
                    </div>
                ))}
            </div>
            <button className="btnseemore">See more</button>
            <h1>Laboratories</h1>
            <hr className="hrsevice" />
            <div className="containerLaboratories">
                {Labo.slice(0, 4).map((l) => (
                    <div key={l.id} className="laboratory">
                        <img id="imgDocLabcli" src={`/images/${l.image}`} alt={l.name} />
                        <h2>{l.name}</h2>
                        <p>{l.address}</p>
                        <Link to={`/laboratories/${l.id}`}><button className="btnsee">See</button></Link>
                    </div>
                ))}
            </div>
            <button className="btnseemore">See more</button>
        </div>
    )
}