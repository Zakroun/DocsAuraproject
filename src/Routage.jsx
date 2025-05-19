import { useParams, useNavigate } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { GoMoveToTop } from "react-icons/go";

// Authentication Components
import Login from "./authentication/Login";
import Register from "./authentication/Signup";
import CodeConfirm from "./authentication/Confirmcode";
import NewPass from "./authentication/Newpass";
import ConfirmEmail from "./authentication/ConifrmEmail";
import ConfirmCodePass from "./authentication/conirmcodepass";
import Activate from "./authentication/Activate";
import ContactForm from "./authentication/contact";

// Static Components
import DivImage from "./static/divimage";
import Header from "./static/header";
import Footer from "./static/Footer";

// Pages
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

// Clinic Components
import ListClinic from "./clinicpages/ListClinic";
import Clinicprofile from "./clinicpages/clinicprofile";
import ClinicReserve from "./clinicpages/ClinicReserve";

// Doctor Components
import ListDoctors from "./Doctorpages/ListDoctors";
import Doctorprofile from "./Doctorpages/Doctorprofile";
import DoctorReserve from "./Doctorpages/ReserveDoctor";

// Laboratory Components
import ListLabo from "./laboratorypages/ListLabo";
import Laboratoryprofile from "./laboratorypages/laboratorypeofile";
import LaboratoryReserve from "./laboratorypages/Reservelaboratory";

export default function Routage() {
  const { d } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get authentication state
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  
  const isAuthenticated = !!token;
  const isVerified = userData?.verified === 1;
  const userRole = userData?.role;

  // Route parameters
  const id = location.state?.id;
  const role = location.state?.role;
  const object = location.state?.object;

  // Pages that require authentication
  const protectedPages = [
    "Dashboard",
    "reservedoc",
    "reserveclinic",
    "reservelabo"
  ];

  // Authentication pages that logged-in users shouldn't access
  const authPages = [
    "Login", 
    "register", 
    "forgetpass", 
    "codeconfirm", 
    "codeconfirmforget", 
    "newpass"
  ];

  useEffect(() => {
    // Redirect authenticated users away from auth pages
    if (isAuthenticated && authPages.includes(d)) {
      navigate('/');
    }

    // Redirect unauthenticated users from protected pages
    if (!isAuthenticated && protectedPages.includes(d)) {
      navigate('/pages/login', { state: { from: location.pathname } });
    }

    // Redirect verified users away from activation
    if (isAuthenticated && isVerified && d === "Activate") {
      navigate('/');
    }

    // Role-based redirection
    if (isAuthenticated && d === "Dashboard" && userRole) {
      // Add any role-specific redirection logic here
    }
  }, [d, isAuthenticated, isVerified, navigate, location, userRole]);

  // Immediate redirects
  if (!isAuthenticated && protectedPages.includes(d)) {
    return <Navigate to="/Login" state={{ from: location.pathname }} replace />;
  }

  if (isAuthenticated && authPages.includes(d)) {
    return <Navigate to="/Dashboard" replace />;
  }

  if (isAuthenticated && isVerified && d === "Activate") {
    return <Navigate to="/Dashboard" replace />;
  }

  // Render components based on route
  switch(d) {
    // Authentication pages
    case "Login":
      return (
        <div className="countainer">
          <DivImage />
          <Login />
        </div>
      );
    case "register":
      return (
        <div className="countainer">
          <DivImage />
          <Register />
        </div>
      );
    case "forgetpass":
      return (
        <div className="countainer">
          <DivImage />
          <ConfirmEmail />
        </div>
      );
    case "codeconfirm":
      return (
        <div className="countainer">
          <DivImage />
          <CodeConfirm />
        </div>
      );
    case "codeconfirmforget":
      return (
        <div className="countainer">
          <DivImage />
          <ConfirmCodePass />
        </div>
      );
    case "newpass":
      return (
        <div className="countainer">
          <DivImage />
          <NewPass />
        </div>
      );
    case "Activate":
      return (
        <div className="countainer">
          <DivImage />
          <Activate data={object} />
        </div>
      );
    case "Contact":
      return (
        <div className="countainer">
          <DivImage />
          <ContactForm />
        </div>
      );

    // Public pages
    case "About":
      return <About />;

    // List pages
    case "Doctors":
      return (
        <>
          <Header />
          <ListDoctors />
          <ScrollToTopButton />
          <Footer />
        </>
      );
    case "clinics":
      return (
        <>
          <Header />
          <ListClinic />
          <ScrollToTopButton />
          <Footer />
        </>
      );
    case "Laboratories":
      return (
        <>
          <Header />
          <ListLabo />
          <ScrollToTopButton />
          <Footer />
        </>
      );

    // Profile pages
    case "doctor":
      return (
        <>
          <Header />
          <Doctorprofile id={id} />
          <Footer />
        </>
      );
    case "clinic":
      return (
        <>
          <Header />
          <Clinicprofile id={id} />
          <Footer />
        </>
      );
    case "laboratory":
      return (
        <>
          <Header />
          <Laboratoryprofile id={id} />
          <Footer />
        </>
      );

    // Reservation pages
    case "reservedoc":
      return (
        <>
          <Header />
          <DoctorReserve id={id} role={role} />
          <Footer />
        </>
      );
    case "reserveclinic":
      return (
        <>
          <Header />
          <ClinicReserve id={id} role={role} />
          <Footer />
        </>
      );
    case "reservelabo":
      return (
        <>
          <Header />
          <LaboratoryReserve id={id} role={role} />
          <Footer />
        </>
      );

    // Dashboard
    case "Dashboard":
      return <Dashboard />;

    default:
      return <Navigate to="/" replace />;
  }
}

// Reusable component for scroll to top button
function ScrollToTopButton() {
  return (
    <button
      className="moveToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <GoMoveToTop />
    </button>
  );
}