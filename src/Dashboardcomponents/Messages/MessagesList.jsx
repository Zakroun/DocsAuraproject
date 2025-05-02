import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { deletemessage } from "../../data/DocsauraSlice";
import { useDispatch } from "react-redux";

export default function Messages({ selectedConversation, idconv }) {
  const [showOptions, setShowOptions] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [sortedMessages, setSortedMessages] = useState([]);
  const dispatch = useDispatch();

  // Fonction pour parser l'heure correctement
  const parseTime = (timeString) => {
    if (!timeString) return 0;
  
    const date = new Date(`1970-01-01T${convertTo24HourFormat(timeString)}`);
    return date.getTime();
  };
  
  const convertTo24HourFormat = (time) => {
    let [hoursMinutes, modifier] = time.split(/(am|pm)/i);
    let [hours, minutes] = hoursMinutes.trim().split(':');
  
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
  
    if (modifier.toLowerCase() === 'pm' && hours !== 12) {
      hours += 12;
    }
    if (modifier.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  };
  

  const truncateFileName = (fileName) => {
    const words = fileName.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : fileName;
  };

  // Mettre à jour sortedMessages quand selectedConversation.messages change
  useEffect(() => {
    if (selectedConversation?.messages) {
      const sorted = [...selectedConversation.messages]
        .sort((a, b) => parseTime(a.time) - parseTime(b.time)) // <== ADD THIS
      setSortedMessages(sorted);
    }
  }, [selectedConversation?.messages]);  

  // Fonction pour supprimer un message
  const handleDeleteMessage = (idmessage) => {
    dispatch(deletemessage({ idconv, idmessage }));

    // Mettre à jour localement sortedMessages après suppression
    setSortedMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.idMessage !== idmessage)
    );
  };

  return (
    <div className="messages2">
      {sortedMessages.map((msg, index) => (
        <div
          key={index}
          className={`message2 ${msg.sender === "You" ? "sent2" : "received2"}`}
          onMouseEnter={() => setShowOptions(index)}
          onMouseLeave={() => setShowOptions(null)}
          onClick={() => setShowOptions(index)}
        >
          {/* Texte */}
          {msg.type === "text" && <p>{msg.content}</p>}

          {/* Audio */}
          {msg.type === "audio" && (
            <audio className="audio" controls>
              <source src={msg.content} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}

          {/* Fichier Document / PDF / Image */}
          {msg.type === "document" && (
            <div className="linkfile">
              <a
                href={msg.content}
                target="_blank"
                rel="noopener noreferrer"
                className="file-link"
              >
                📄 {truncateFileName(msg.fileName)}
              </a>
            </div>
          )}

          <span className="time">{msg.time}</span>

          {/* Options du message */}
          {showOptions === index && (
            <div className="message-options">
              <div className="options-menu">
                <button onClick={() => handleDeleteMessage(msg.idMessage)}>
                  Delete
                </button>
                <button onClick={() => setShowDetails(index)}>Details</button>

                {showDetails === index && (
                  <div className="message-details">
                    <p>Date & Time: {msg.time}</p>
                    <p>Status: {msg.read ? "Read" : "Unread"}</p>
                    <button onClick={() => setShowDetails(null)}>
                      <IoClose size={20} style={{ marginLeft: "10px" }} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
