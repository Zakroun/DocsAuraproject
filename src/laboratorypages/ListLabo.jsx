import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ListLabo() {
  const laboratories = useSelector((s) => s.Docsaura.laboratories);
  const [ListLabo, setList] = useState(laboratories);
  const cities = useSelector((s) => s.Docsaura.cities);
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  useEffect(() => {
    if (name === "" && city === "") {
      setList(laboratories);
    }
    setList(laboratories);
  }, [laboratories,name,city]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const Search = () => {
    const filter = laboratories.filter((l) => {
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
      <h1>List Laboratories</h1>
      <hr className="hrsevice" />
      <div className="search">
        <input
          type="text"
          name="name"
          placeholder="Search your best laboratorie..."
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
        <button id="search" onClick={Search}>Search</button>
      </div>
      <div className="containerLaboratories">
        {ListLabo.map((l) => (
          <div key={l.id} className="laboratory">
            <Link to={`/pages/laboratories/${l.id}`} id="Linktoone">
              <img id="imgDocLabcli" src={`/images/${l.image}`} alt={l.name} />
              <div className="informations">
                <h3>{l.name}</h3>
                <p>{l.address}</p>
                <div className="stars">{generateStars(l.rating)}</div>
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
