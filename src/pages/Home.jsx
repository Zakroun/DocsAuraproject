import Header from "../static/header";
import Footer from "../static/Footer";
import Divimage2 from "../static/dibimage2";
import DivService1 from "../static/divservice1";
import { GoMoveToTop } from "react-icons/go";
import Services from "../static/Services";
export default function Home() {
    return(<>
        <Header></Header>
        <Divimage2></Divimage2>
        <DivService1></DivService1>
        <button className="moveToTop" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}><GoMoveToTop></GoMoveToTop></button>
        <Services></Services>
        <Footer></Footer>
        </>
    )
}