import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function Messages({ selectedConversation }) {
  const [showOptions, setShowOptions] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "pm" && hours !== 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const sortedMessages = [...selectedConversation.messages].sort(
    (a, b) => parseTime(a.time) - parseTime(b.time)
  );

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
          <p>{msg.text}</p>
          <span className="time">{msg.time}</span>

          {showOptions === index && (
            <div className="message-options">
              <div className="options-menu">
                <button>Delete</button>
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
