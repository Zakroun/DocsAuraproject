import { useParams } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Signup";
import CodeConfirm from "./authentication/Confirmcode";
import NewPass from "./authentication/Newpass";
import ConfirmEmail from "./authentication/ConifrmEmail";
import Conirmcodepass from "./authentication/conirmcodepass";
import DivImage from "./static/divimage";
import ContactForm from "./authentication/contact";
import About from "./pages/About";
import ListClinic from "./clinicpages/ListClinic";
import ListDoctors from "./Doctorpages/ListDoctors";
import ListLabo from "./laboratorypages/ListLabo";
import Header from "./static/header";
import Footer from "./static/Footer";
import { GoMoveToTop } from "react-icons/go";
import { useLocation } from "react-router-dom";
import Clinicprofile from "./clinicpages/clinicprofile";
import Doctorprofile from "./Doctorpages/Doctorprofile";
import Laboratoryprofile from "./laboratorypages/laboratorypeofile";
import DoctorReserve from "./Doctorpages/ReserveDoctor";
import ClinicReserve from "./clinicpages/ClinicReserve";
import LaboratoryReserve from "./laboratorypages/Reservelaboratory";
import Dashboard from "./pages/Dashboard";
import Activate from "./authentication/Activate";
export default function Routage() {
  const { d } = useParams();
  const Loc = useLocation();
  const id = Loc.state?.id;
  const object = Loc.state?.object
  if (d === "Login") {
    return (
      <div className="countainer">
        <DivImage />
        <Login />
      </div>
    );
  } else if (d === "register") {
    return (
      <div className="countainer">
        <DivImage /> <Register />
      </div>
    );
  } else if (d === "forgetpass") {
    return (
      <div className="countainer">
        <DivImage /> <ConfirmEmail />
      </div>
    );
  } else if (d === "codeconfirm") {
    return (
      <div className="countainer">
        <DivImage /> <CodeConfirm />
      </div>
    );
  } else if (d === "codeconfirmforget") {
    return (
      <div className="countainer">
        <DivImage /> <Conirmcodepass />
      </div>
    );
  } else if (d === "newpass") {
    return (
      <div className="countainer">
        <DivImage /> <NewPass />
      </div>
    );
  } else if (d === "Contact") {
    return (
      <div className="countainer">
        <DivImage /> <ContactForm />
      </div>
    );
  } else if (d === "About") {
    return <About></About>;
  } else if (d === "Doctors") {
    return (
      <>
        <Header />
        <ListDoctors></ListDoctors>
        <button
          className="moveToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <GoMoveToTop />
        </button>
        <Footer />
      </>
    );
  } else if (d === "Clinical") {
    return (
      <>
        <Header />
        <ListClinic></ListClinic>
        <button
          className="moveToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <GoMoveToTop />
        </button>
        <Footer />
      </>
    );
  } else if (d === "Laboratories") {
    return (
      <>
        <Header />
        <ListLabo></ListLabo>
        <button
          className="moveToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <GoMoveToTop />
        </button>
        <Footer />
      </>
    );
  } else if (d === "doctor") {
    return (
      <>
        <Header></Header>
        <Doctorprofile id={id}></Doctorprofile>
        <Footer></Footer>
      </>
    );
  } else if (d === "clinic") {
    return (
      <>
        <Header></Header>
        <Clinicprofile id={id}></Clinicprofile>
        <Footer></Footer>
      </>
    );
  } else if (d === "laboratory") {
    return (
      <>
        <Header></Header>
        <Laboratoryprofile id={id}></Laboratoryprofile>
        <Footer></Footer>
      </>
    );
  } else if (d === "reservedoc") {
    return (
      <>
        <Header></Header>
        <DoctorReserve id={id}></DoctorReserve>
        <Footer></Footer>
      </>
    );
  } else if (d === "reserveclinic") {
    return (
      <>
        <Header></Header>
        <ClinicReserve id={id}></ClinicReserve>
        <Footer></Footer>
      </>
    );
  } else if (d === "reservelabo") {
    return (
      <>
        <Header></Header>
        <LaboratoryReserve id={id}></LaboratoryReserve>
        <Footer></Footer>
      </>
    );
  } else if (d === "Dashboard") {
    return <Dashboard />;
  } else if (d === "Activate") {
    return(
      <div className="countainer">
      <DivImage /> <Activate data={object} />
    </div>
    )
  }
}
