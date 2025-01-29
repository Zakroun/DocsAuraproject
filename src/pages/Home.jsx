import Header from "../static/header";
import Footer from "../static/Footer";
import Divimage2 from "../static/dibimage2";
import DivService1 from "../static/divservice1";
import { GoMoveToTop } from "react-icons/go";
import Services from "../static/Services";
import CallToAction from "../static/CallToAction";
import Faq from "../static/Faq"; // Import Faq component

export default function Home() {
    return (
        <>
            <Header />
            <Divimage2 />
            <DivService1 />
            <CallToAction /> {/* ✅ قسم CallToAction */}
            <Faq /> {/* Add the FAQ Section here */}
            <button className="moveToTop" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <GoMoveToTop />
            </button>
            <Services />
            <Footer />
        </>
    );
}
