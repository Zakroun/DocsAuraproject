import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function Messages({ selectedConversation, onDeleteMessage }) {
  const [showOptions, setShowOptions] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [sortedMessages, setSortedMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Function to parse time correctly
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

  // Update sortedMessages when selectedConversation.messages changes
  useEffect(() => {
    if (selectedConversation?.messages) {
      const sorted = [...selectedConversation.messages]
        .sort((a, b) => parseTime(a.time) - parseTime(b.time));
      setSortedMessages(sorted);
    }
  }, [selectedConversation?.messages]);  

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [sortedMessages]);

  const scrollToBottom = () => {
    // Only scroll if we're not already at the bottom (within 100px)
    const container = messagesContainerRef.current;
    if (container) {
      const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Function to delete a message
  const handleDeleteMessage = (idmessage) => {
    onDeleteMessage(idmessage);
    
    setSortedMessages(prevMessages =>
      prevMessages.filter(msg => msg.idMessage !== idmessage)
    );
  };

  // Function to handle manual scroll to bottom
  const handleScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="messages-container" ref={messagesContainerRef}>
      <div className="messages2">
        {sortedMessages.map((msg, index) => (
          <div
            key={`${msg.idMessage}-${index}`}
            className={`message2 ${msg.sender === "You" ? "sent2" : "received2"}`}
            onMouseEnter={() => setShowOptions(index)}
            onMouseLeave={() => setShowOptions(null)}
            onClick={() => setShowOptions(index)}
          >
            {/* Text message */}
            {msg.type === "text" && <p>{msg.content}</p>}

            {/* Audio message */}
            {msg.type === "audio" && (
              <audio className="audio" controls>
                <source src={msg.content} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            )}

            {/* Document/File message */}
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

            {/* Message options */}
            {showOptions === index && (
              <div className="message-options">
                <div className="options-menu">
                  <button onClick={() => handleDeleteMessage(msg.idMessage)}>
                    Delete
                  </button>
                  <button onClick={() => setShowDetails(index)}>Details</button>

                  {showDetails === index && (
                    <div className="message-details">
                      <p>Time: {msg.time}</p>
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
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button (only shows when not at bottom) */}
      <button 
        className="scroll-to-bottom-btn" 
        onClick={handleScrollToBottom}
      >
        ↓
      </button>
    </div>
  );
}