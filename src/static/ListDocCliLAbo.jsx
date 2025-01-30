import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ListDocCliLAbo() {
  const Doc = useSelector((state) => state.Docsaura.doctors);
  const Clinic = useSelector((state) => state.Docsaura.clinics);
  const Labo = useSelector((state) => state.Docsaura.laboratories);

  return (
    <div className="ListDocCliLAbo">
      <h1>Doctors</h1>
      <hr className="hrsevice" />
      <div className="containerDoctors">
        {Doc.slice(0, 4).map((d) => (
          <div key={d.id} className="doctor">
            <Link to={`/pages/doctors/${d.id}`} id="Linktoone">
              <img
                id="imgDocLabcli"
                src={`/images/${d.image}`}
                alt={d.fullName}
              />
              <div className="informations">
                <h3>{d.fullName}</h3>
                <p>{d.specialty}</p>
                <Link to={`/pages/doctors/${d.id}`}>
                  <button className="btnsee">See</button>
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/pages/Doctors"><button className="btnseemore">See more</button></Link>
      <h1>Clinics</h1>
      <hr className="hrsevice" />
      <div className="containerClinics">
        {Clinic.slice(0, 4).map((c) => (
          <div key={c.id} className="clinic">
            <Link to={`/pages/clinics/${c.id}`} id="Linktoone">
              <img id="imgDocLabcli" src={`/images/${c.image}`} alt={c.name} />
              <div className="informations">
                <h3>{c.name}</h3>
                <p>{c.address}</p>
                <Link to={`/pages/clinics/${c.id}`}>
                  <button className="btnsee">See</button>
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/pages/Clinical"><button className="btnseemore">See more</button></Link>
      <h1>Laboratories</h1>
      <hr className="hrsevice" />
      <div className="containerLaboratories">
        {Labo.slice(0, 4).map((l) => (
          <div key={l.id} className="laboratory">
            <Link to={`/pages/laboratories/${l.id}`} id="Linktoone"><img id="imgDocLabcli" src={`/images/${l.image}`} alt={l.name} />
            <div className="informations">
              <h3>{l.name}</h3>
              <p>{l.address}</p>
              <Link to={`/pages/laboratories/${l.id}`}>
                <button className="btnsee">See</button>
              </Link>
            </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/pages/Laboratories"><button className="btnseemore">See more</button></Link>
    </div>
  );
}
