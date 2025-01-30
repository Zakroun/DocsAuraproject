import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ListLabo() {
  const laboratories = useSelector((s) => s.Docsaura.laboratories);
  const [ListLabo, setList] = useState(laboratories);
  useEffect(() => {
    setList(laboratories);
  }, [laboratories]);
  useEffect(()=>{
    window.scrollTo({top: 0, behavior: 'smooth'})
  },[])
  return (
    <div className="Parent">
      <h1>List Laboratories</h1>
      <hr className="hrsevice" />
      <div className="containerLaboratories">
        {ListLabo.map((l) => (
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
    </div>
  );
}
