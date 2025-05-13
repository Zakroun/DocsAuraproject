import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { doctors } from "../data/data";
export default function ListDoctors() {
  const Doctors = useSelector((s) => s.Docsaura.doctors);
  const specialized = useSelector((s) => s.Docsaura.specializedDoctors);
  const cities = useSelector((s) => s.Docsaura.cities);
  const [name, setname] = useState("");
  const [specialty, setspecialty] = useState("");
  const [city, setcity] = useState("");
  const [ListD, setList] = useState(Doctors);
  useEffect(() => {
    if (name === "" && specialty === "" && city === "") {
      setList(doctors);
    }
    setList(Doctors);
  }, [Doctors, name, specialty, city]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const Search = () => {
    const filteredDoctors = Doctors.filter((doctor) => {
      const matchesName = name
        ? doctor.fullName.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesSpecialty = specialty
        ? doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
        : true;
      const matchesCity = city
        ? doctor.city.toLowerCase().includes(city.toLowerCase())
        : true;

      return matchesName && matchesSpecialty && matchesCity;
    });
    setList(filteredDoctors);
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
      <h1>List Doctors</h1>
      <hr className="hrsevice" />
      <div className="search">
        <input
          type="text"
          name="fullname"
          placeholder="Search your best Doctor..."
          id="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <select
          name="specialized"
          id="specialized"
          onChange={(e) => setspecialty(e.target.value)}
        >
          {specialized.map((a) => {
            return (
              <option key={a} value={a}>
                {a === "" ? "Search a specialty" : a}
              </option>
            );
          })}
        </select>
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
      <div className="containerDoctors">
        {ListD.length !== 0 ? (
          ListD.map((d) => (
            <div key={d.id} className="doctor">
              <Link to={`/pages/doctor`} state={{ id: d.id }} id="Linktoone">
                <img
                  id="imgDocLabcli"
                  src={d.image ? `http://localhost:8000/storage/${d.image}` : '/images/doctors/doctor3.jpeg'}
                  alt={d.fullName}
                />
                <div className="informations">
                <h3>{d.fullName.length > 20 ? d.fullName.substring(0, 20) + '...' : d.fullName}</h3>
                  <p className="pspecialty">{d.specialty}</p>
                  <div className="rating-button">
                    <div className="stars">{generateStars(d.rating)}</div>
                    {/* <button className="btnsee">Reserve</button> */}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "20px" }}>This doctor not found</p>
        )}
      </div>
    </div>
  );
}
