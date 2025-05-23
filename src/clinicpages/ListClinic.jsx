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
        ? l.fullName.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesCity = city
        ? l.city.toLowerCase().includes(city.toLowerCase())
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
  function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
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
        {Listcl.length !== 0 ? (
          Listcl.map((c) => (
            <div key={c.id} className="clinic">
              <Link to={`/pages/clinic`} state={{ id: c.id }} id="Linktoone">
                <img
                  id="imgDocLabcli"
                  src={
                    c.image
                      ? `http://localhost:8000/storage/${c.image}`
                      : "/images/clinics/clinic2.jpeg"
                  }
                  alt={c.name}
                />
                <div className="informations">
                  <h3>
                    {c.fullName.length > 20
                      ? c.fullName.substring(0, 20) + "..."
                      : c.fullName}
                  </h3>
                  <p className="paddress">{c.address}</p>
                  <div className="rating-button">
                    <div className="stars">{generateStars(calculateAverageRating(c.reviews))}</div>
                    {/* <button className="btnsee">Reserve</button> */}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "20px" }}>This clinic not found</p>
        )}
      </div>
    </div>
  );
}
