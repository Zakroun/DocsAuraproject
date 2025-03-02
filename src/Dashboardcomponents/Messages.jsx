import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { FiSend, FiMic } from "react-icons/fi";
const conversations = [
  {
    id: 1,
    name: "Diane Cooper",
    message: "Hey! How are you?",
    time: "12:08 pm",
    unread: 2,
    messages: [
      { text: "Hey! How are you?", sender: "Diane", time: "12:05 pm" },
      { text: "I'm good, thanks!", sender: "You", time: "12:06 pm" },
      { text: "Glad to hear!", sender: "Diane", time: "12:07 pm" },
    ],
  },
  {
    id: 2,
    name: "Aubrey Fisher",
    message: "Let’s catch up!",
    time: "11:45 am",
    unread: 0,
    messages: [
      { text: "Let’s catch up!", sender: "Aubrey", time: "11:40 am" },
      { text: "Sure! When are you free?", sender: "You", time: "11:42 am" },
    ],
  },
];

export default function ChatApp() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chat-app">
      <div className="conversation-list">
        <h2>Messages</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="conversation-items">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className="conversation-item"
              onClick={() => setSelectedConversation(conv)}
            >
              <FaUserCircle className="avatar-icon" size={40} />
              <div className="details">
                <p className="name">{conv.name}</p>
                <p className="message">{conv.message}</p>
              </div>
              <div className="meta">
                <p className="timestamp">{conv.time}</p>
                {conv.unread > 0 && (
                  <div className="unread-badge">
                    <MdNotifications size={18} /> {conv.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="coversation">
        <div className="chat_window">
          <h2>
            {selectedConversation ? (
              <div>
                <h3>{selectedConversation.name}</h3>
                <div className="messages2">
                  {selectedConversation.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message2 ${
                        msg.sender === "You" ? "sent2" : "received2"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="time">{msg.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Select a conversation to view messages ...</p>
            )}{" "}
          </h2>
        </div>
        <div className="message_input">
          <input type="text" placeholder="Type a message..." />
          <div className="iconsmessage">
            <FiMic className="iconmessage" />
            <FiSend className="iconmessage" />
          </div>
        </div>
      </div>
    </div>
  );
}
