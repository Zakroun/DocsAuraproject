import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ListDoctors() {
  const Doctors = useSelector((s) => s.Docsaura.doctors);
  const [ListD, setList] = useState(Doctors);
  useEffect(() => {
    setList(Doctors);
  }, [Doctors]);
  useEffect(()=>{
    window.scrollTo({top: 0, behavior: 'smooth'})
  },[])
  return (
    <div className="Parent">
      <h1>List Doctors</h1>
      <hr className="hrsevice" />
      <div className="containerDoctors">
        {ListD.map((d) => (
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
    </div>
  );
}
