import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaArrowRight } from "react-icons/fa";
import { MdNotifications, MdMissedVideoCall } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import MessageInput from "./Messageinput";
import Messages from "./MessagesList";

const conversations = [
  {
    id: 1,
    name: "Diane Cooper",
    message: "Hey! How are you?",
    time: "12:08 pm",
    unread: 2,
    messages: [
      {
        text: "Hey! How are you?",
        sender: "Diane",
        time: "12:05 pm",
        read: true,
      },
      {
        text: "I'm good, thanks!",
        sender: "You",
        time: "12:06 pm",
        read: true,
      },
      { text: "Glad to hear!", sender: "Diane", time: "12:07 pm", read: false },
    ],
  },
  {
    id: 2,
    name: "Aubrey Fisher",
    message: "Let’s catch up!",
    time: "11:45 am",
    unread: 0,
    messages: [
      {
        text: "Let’s catch up!",
        sender: "Aubrey",
        time: "11:40 am",
        read: true,
      },
      {
        text: "Sure! When are you free?",
        sender: "You",
        time: "11:42 am",
        read: true,
      },
    ],
  },
];

export default function ChatApp() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [search, setSearch] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [selectedConversation]);

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
        {selectedConversation ? (
          <div>
            <div className="conversation-header">
              <FaUserCircle className="avataricon" size={40} />
              <span>{selectedConversation.name}</span>
              <div className="callopr">
                <IoCall className="call-icon iconcall" size={27} />
                <MdMissedVideoCall className="video-icon iconcall" size={32} />
                <FaArrowRight
                size={27}
                  className="close-button iconcall"
                  onClick={() => setSelectedConversation(null)}
                />
              </div>
            </div>
            <div className="chat_window" ref={chatBodyRef}>
              <Messages selectedConversation={selectedConversation} />
            </div>
            <MessageInput />
          </div>
        ) : (
          <p>Select a conversation to view messages ...</p>
        )}
      </div>
    </div>
  );
}
