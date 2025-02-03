import { useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";

export default function Doctorprofile(props) {
  const List = useSelector((s) => s.Docsaura.doctors);
  const Doctor = List?.find((a) => a.id === props.id);
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
    <div className="profile">
      <div className="part1">
        <div className="imgprofile">
          <img
            src={`/images/${Doctor.image}`}
            alt="imgprofile"
            id="imageprofile"
          />
        </div>
        <div className="stars">{generateStars(Doctor.rating)}</div>
        <div className="comments">
          {Doctor.comments.map((c) => {
            return (
              <div className="comment" key={c.id}>
                {c.text}
              </div>
            );
          })}
        </div>
      </div>
      <div className="part2">
        <div className="informationsdoctor">
          <div className="head">
            <div className="part1head">
              <h1>
                {Doctor.fullName}{" "}
                {Doctor.Verified ? <MdVerified className="verif" /> : ""}
              </h1>
            </div>
            <div className="part2head">
                <button className="reserve">Reserve</button><button className="msg">Send Message</button>
            </div>
          </div>
          <p>{Doctor.addressLoc}</p>
          <p>
            Email : {Doctor.emailLoc} / Phone : {Doctor.fax}
          </p>
          <p className="specialty">specialty : {Doctor.specialty}</p>
          <p className="specialty">Address Location : </p>
          <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.8241741085076!2d-85.7219484243674!3d38.21289738680233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88690d94db47e13b%3A0x73357ab7faf3550b!2sAlice%20H%20Johnson%2C%20MD!5e1!3m2!1sen!2sma!4v1738597550212!5m2!1sen!2sma"
        width="600"
        height="250"
        style={{
          border: 0,
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "600px",
          height: "250px",
        }}
        // allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
          {/* <div className="part2head">
            <button className="reserve">Reserve</button>
            <button className="msg">Send Message</button>
          </div> */}
        </div>
      </div>
      <div className="part3">
      </div>
    </div>
  );
}
