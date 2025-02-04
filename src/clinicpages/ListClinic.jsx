import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ListClinic() {
  const clinics = useSelector((s) => s.Docsaura.clinics);
  const [Listcl, setList] = useState(clinics);
  const cities = useSelector((s) => s.Docsaura.cities);
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  useEffect(() => {
    if (name === "" && city === "") {
      setList(clinics);
    }
    setList(clinics);
  }, [clinics, name, city]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const Search = () => {
    const filter = clinics.filter((l) => {
      const matchesName = name
        ? l.name.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesCity = city
        ? l.address.toLowerCase().includes(city.toLowerCase())
        : true;

      return matchesName && matchesCity;
    });

    setList(filter);
  };
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
    <div className="Parent">
      <h1>List Clinics</h1>
      <hr className="hrsevice" />
      <div className="search">
        <input
          type="text"
          name="name"
          placeholder="Search your best Clinic..."
          id="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <select
          name="citie"
          id="citie"
          onChange={(e) => setcity(e.target.value)}
        >
          {cities.map((a) => {
            return (
              <option key={a} value={a}>
                {a === "" ? "Search a city" : a}
              </option>
            );
          })}
        </select>
        <button id="search" onClick={Search}>
          Search
        </button>
      </div>
      <div className="containerClinics">
        {Listcl.map((c) => (
          <div key={c.id} className="clinic">
            <Link to={`/pages/clinic`} state={{ id: c.id }} id="Linktoone">
              <img
                id="imgDocLabcli"
                src={`../images/${c.image}`}
                alt={c.name}
              />
              <div className="informations">
                <h3>{c.name}</h3>
                <p>{c.address}</p>
                <div className="stars">{generateStars(c.rating)}</div>
                <button className="btnsee">See</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
