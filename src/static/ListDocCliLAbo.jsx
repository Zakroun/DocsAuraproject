import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ListDocCliLAbo() {
  const Doc = useSelector((state) => state.Docsaura.doctors);
  const Clinic = useSelector((state) => state.Docsaura.clinics);
  const Labo = useSelector((state) => state.Docsaura.laboratories);
  function generateStars(rating) {
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) {
        return (
          <span key={i} className="star filled">
            ★
          </span>
        );
      } else if (i < rating) {
        return (
          <span key={i} className="star half">
            ★
          </span>
        );
      } else {
        return (
          <span key={i} className="star empty">
            ☆
          </span>
        );
      }
    });
  }
  return (
    <div className="ListDocCliLAbo">
      <h1>Doctors</h1>
      <hr className="hrsevice" />
      <div className="contdiv-btn">
        <div className="containerDoctors">
          {Doc.slice(0, 4).map((d) => (
            <div key={d.id} className="doctor">
              <Link to={`/pages/doctor`} state={{ id: d.id }} id="Linktoone">
                <img
                  id="imgDocLabcli"
                  src={`/images/doctors/${d.image}`}
                  alt={d.fullName}
                />
                <div className="informations">
                  <h3>
                    {d.fullName.length > 20
                      ? d.fullName.substring(0, 20) + "..."
                      : d.fullName}
                  </h3>
                  <p className="pspecialty">{d.specialty}</p>
                  <div className="stars">{generateStars(d.rating)}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/pages/Doctors">
          <button className="btnseemore">See more</button>
        </Link>
      </div>
      <h1>Clinics</h1>
      <hr className="hrsevice" />
      <div className="contdiv-btn">
        <div className="containerClinics">
          {Clinic.slice(0, 4).map((c) => (
            <div key={c.id} className="clinic">
              <Link to={`/pages/clinic`} state={{ id: c.id }} id="Linktoone">
                <img
                  id="imgDocLabcli"
                  src={`/images/clinics/${c.image}`}
                  alt={c.fullName}
                />
                <div className="informations">
                  <h3>
                    {c.fullName.length > 20
                      ? c.fullName.substring(0, 20) + "..."
                      : c.fullName}
                  </h3>
                  <p className="paddress">{c.address}</p>
                  <div className="stars">{generateStars(c.rating)}</div>
                  {/* <button className="btnsee">See</button> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/pages/Clinical">
          <button className="btnseemore">See more</button>
        </Link>
      </div>
      <h1>Laboratories</h1>
      <hr className="hrsevice" />
      <div className="contdiv-btn">
        <div className="containerLaboratories">
          {Labo.slice(0, 4).map((l) => (
            <div key={l.id} className="laboratory">
              <Link
                to={`/pages/laboratory`}
                state={{ id: l.id }}
                id="Linktoone"
              >
                <img
                  id="imgDocLabcli"
                  src={`/images/laboratory/${l.image}`}
                  alt={l.fullName}
                />
                <div className="informations">
                  <h3>
                    {l.fullName.length > 20
                      ? l.fullName.substring(0, 20) + "..."
                      : l.fullName}
                  </h3>
                  <p className="paddress">{l.address}</p>
                  <div className="stars">{generateStars(l.rating)}</div>
                  {/* <button className="btnsee">See</button> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/pages/Laboratories">
          <button className="btnseemore">See more</button>
        </Link>
      </div>
    </div>
  );
}
