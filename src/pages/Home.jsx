import Header from "../static/header";
import Footer from "../static/Footer";
import Divimage2 from "../static/dibimage2";
import DivService1 from "../static/divservice1";
import { GoMoveToTop } from "react-icons/go";
import Services from "../static/Services";
import Faq from "../static/Faq";
import { SiChatbot } from "react-icons/si";
import ListDocCliLAbo from "../static/ListDocCliLAbo";
import CallToAction from "../static/CallToAction";
import { useState,useEffect ,useRef} from "react";
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setmessge] = useState("");
  const [Messgaes, setmessges] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const chatBodyRef = useRef(null);
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [Messgaes, isOpen]);
  const SendMsg = () => {
    if (message.trim() !== "") {
      setmessges([...Messgaes, { text: message, sender: "user" }]);
      setmessge("");
    }
  };
  return (
    <>
      <Header />
      <Divimage2 />
      <DivService1 />
      <button className="chatbot" onClick={() => setIsOpen(!isOpen)}>
        <SiChatbot />
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chatbot <SiChatbot /></h3>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {Messgaes?.map((message, index) => {
              return (
                <p key={index} className={message.sender}>
                  {message.text}
                </p>
              );
            })}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={message}
              placeholder="Type a message..."
              onChange={(e) => setmessge(e.target.value)}
            />
            <button onClick={SendMsg}>Send</button>
          </div>
        </div>
      )}
      <button
        className="moveToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <GoMoveToTop />
      </button>
      <CallToAction />
      <Services />
      <ListDocCliLAbo />
      <Faq />
      <Footer />
    </>
  );
}
