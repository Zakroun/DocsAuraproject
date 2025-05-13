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
import { useState, useEffect, useRef } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
//import { useSelector } from "react-redux";
export default function Home() {
  const doctors = useSelector(state => state.Docsaura.doctors);
  const clinics = useSelector(state => state.Docsaura.clinics);
  const laboratories = useSelector(state => state.Docsaura.laboratories);
  console.log('Doctors:', doctors);
  console.log('Clinics:', clinics);
  console.log('laboratories:', laboratories);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const chatBodyRef = useRef(null);

  // const userData = localStorage.getItem('user');
  // const parsedUser = JSON.parse(userData);
  // console.log(parsedUser)

  useEffect(() => {
    // Check for token on component mount
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newMessages = [...messages, { text: message, sender: "user" }];
    setMessages(newMessages);
    setMessage("");

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      } else {
        console.error("API error:", data);
        if (response.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              text: "You have exceeded your request quota. Please try again later.",
              sender: "bot",
            },
          ]);
          await delay(60000);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: "Error: could not get a response from the bot.",
              sender: "bot",
            },
          ]);
        }
      }
    } catch (error) {
      console.error("Network or server error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Server error. Please try again later.", sender: "bot" },
      ]);
    }
  };

  return (
    <>
      <Header />
      <Divimage2 profile={isAuthenticated} />
      <DivService1 />

      {/* Chatbot Button */}
      <button className="chatbot" onClick={() => setIsOpen(!isOpen)}>
        <SiChatbot />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>
              Chatbot <SiChatbot />
            </h3>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender}>
                <div className="message-icon">
                  {msg.sender === "bot" ? (
                    <SiChatbot className="msgiconn" />
                  ) : (
                    <FaUserAlt className="msgiconn" />
                  )}
                </div>
                <div>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={message}
              placeholder="Type a message..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      {/* Scroll to Top */}
      <button
        className="moveToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <GoMoveToTop />
      </button>

      {/* Conditional CTA - only show if not authenticated */}
      {!isAuthenticated && <CallToAction />}

      {/* Main Sections */}
      <Services />
      <ListDocCliLAbo />
      <Faq />
      <Footer />
    </>
  );
}
