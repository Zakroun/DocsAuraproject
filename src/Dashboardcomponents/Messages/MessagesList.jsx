import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function Messages({ selectedConversation, onDeleteMessage }) {
  console.log(selectedConversation)
  const [showOptions, setShowOptions] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [dateKeys, setDateKeys] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Function to format datetime to 24-hour format
  const formatTime = (datetime) => {
    if (!datetime) return '';
    
    const date = new Date(datetime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  };

  // Function to format date as "YYYY-MM-DD"
  const formatDateKey = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  // Function to format date for display (e.g., "May 20, 2025")
  const formatDateDisplay = (dateKey) => {
    const [year, month, day] = dateKey.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncateFileName = (fileName) => {
    const words = fileName.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : fileName;
  };

  // Group messages by date when selectedConversation.messages changes
  useEffect(() => {
    if (selectedConversation?.messages) {
      const grouped = {};
      const sortedMessages = [...selectedConversation.messages]
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      
      sortedMessages.forEach(msg => {
        const dateKey = formatDateKey(msg.created_at);
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(msg);
      });
      
      setGroupedMessages(grouped);
      setDateKeys(Object.keys(grouped).sort());
    }
  }, [selectedConversation?.messages]);  

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [groupedMessages]);

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
    
    setGroupedMessages(prevGroups => {
      const newGroups = { ...prevGroups };
      for (const dateKey in newGroups) {
        newGroups[dateKey] = newGroups[dateKey].filter(msg => msg.idMessage !== idmessage);
        if (newGroups[dateKey].length === 0) {
          delete newGroups[dateKey];
        }
      }
      return newGroups;
    });
    
    setDateKeys(prevKeys => prevKeys.filter(key => groupedMessages[key]?.length > 0));
    
  };

  // Function to handle manual scroll to bottom
  const handleScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="messages-container" ref={messagesContainerRef}>
      <div className="messages2">
        {dateKeys.map(dateKey => (
          <React.Fragment key={dateKey}>
            <div className="date-separator">
              <span>{formatDateDisplay(dateKey)}</span>
            </div>
            {groupedMessages[dateKey].map((msg, index) => {
              const time = formatTime(msg.created_at);
              return (
                <div
                  key={`${msg.idMessage}-${index}`}
                  className={`message2 ${msg.sender === "You" ? "sent2" : "received2"}`}
                  onMouseEnter={() => setShowOptions(`${dateKey}-${index}`)}
                  onMouseLeave={() => setShowOptions(null)}
                  onClick={() => setShowOptions(`${dateKey}-${index}`)}
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

                  <div className="time-container">
                    <span className="time">{time}</span>
                  </div>

                  {/* Message options */}
                  {showOptions === `${dateKey}-${index}` && (
                    <div className="message-options">
                      <div className="options-menu">
                        <button onClick={() => handleDeleteMessage(msg.idMessage)}>
                          Delete
                        </button>
                        <button onClick={() => setShowDetails(`${dateKey}-${index}`)}>
                          Details
                        </button>

                        {showDetails === `${dateKey}-${index}` && (
                          <div className="message-details">
                            <p>Sent: {new Date(msg.created_at).toLocaleString()}</p>
                            <button onClick={() => setShowDetails(null)}>
                              <IoClose size={20} style={{ marginLeft: "10px" }} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
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