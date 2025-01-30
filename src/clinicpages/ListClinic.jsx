import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ListClinic() {
  const clinics = useSelector((s) => s.Docsaura.clinics);
  const [Listcl, setList] = useState(clinics);
  useEffect(() => {
    setList(clinics);
  }, [clinics]);
  useEffect(()=>{
    window.scrollTo({top: 0, behavior: 'smooth'})
  },[])
  return (
    <div className="Parent">
      <h1>List Clinics</h1>
      <hr className="hrsevice" />
      <div className="containerClinics">
        {Listcl.map((c) => (
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
    </div>
  );
}
