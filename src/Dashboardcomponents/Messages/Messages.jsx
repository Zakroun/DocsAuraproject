import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaArrowRight } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
// import { IoCall } from "react-icons/io5";
import MessageInput from "./Messageinput";
import Messages from "./MessagesList";

export default function ChatApp({ conversations }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [search, setSearch] = useState("");
  const [conversationList, setConversationList] = useState(conversations);
  useEffect(() => {
    setConversationList(conversations);
  }, [conversations]);

  const chatBodyRef = useRef(null);
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [selectedConversation]);
  useEffect(()=>{
    setConversationList(conversations)
  },[conversations])
  const openConversation = (conv) => {
    const updatedConversations = conversationList.map((c) =>
      c.id === conv.id
        ? {
            ...c,
            unread: 0,
            messages: c.messages.map((m) => ({ ...m, read: true })),
          }
        : c
    );
    setConversationList(updatedConversations);
    setSelectedConversation({
      ...conv,
      unread: 0,
      messages: conv.messages.map((m) => ({ ...m, read: true })),
    });
  };

  const filteredConversations = search
    ? conversationList.filter((conv) =>
        conv.name.toLowerCase().includes(search.toLowerCase())
      )
    : conversationList;

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
          {filteredConversations.map((conv) => {
            // Récupérer le dernier message
            const lastMessage =
              conv.messages.length > 0
                ? conv.messages[conv.messages.length - 1]
                : null;

            // Fonction pour tronquer le message à 10 caractères
            const truncateMessage = (text) => {
              return text.length > 10 ? text.slice(0, 10) + "..." : text;
            };

            // Déterminer le texte à afficher
            let displayMessage = lastMessage
              ? lastMessage.type === "audio"
                ? "Sent an Audio"
                : lastMessage.type === "document"
                ? "Sent a File"
                : truncateMessage(lastMessage.content)
              : "No messages yet";

            return (
              <div
                key={conv.id}
                className="conversation-item"
                onClick={() => openConversation(conv)}
              >
                <FaUserCircle className="avatar-icon" size={40} />
                <div className="details">
                  <p className="name">{conv.name}</p>
                  <p className="message">{displayMessage}</p>
                </div>
                <div className="meta">
                  <p className="timestamp">{conv.time}</p>
                  {conv.messages.reduce(
                    (t, a) => (a.read === false ? t + 1 : t),
                    0
                  ) > 0 && (
                    <div className="unread-badge">
                      <MdNotifications size={18} className="notify"/>
                      {conv.messages.reduce(
                        (t, a) => (a.read === false ? t + 1 : t),
                        0
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="coversation">
        {selectedConversation ? (
          <div>
            <div className="conversation-header">
              <FaUserCircle className="avataricon" size={40} />
              <span>{selectedConversation.name}</span>
              <div className="callopr">
                <FaArrowRight
                  size={27}
                  className="close-button iconcall"
                  onClick={() => setSelectedConversation(null)}
                />
              </div>
            </div>
            <div className="chat_window" ref={chatBodyRef}>
              <Messages selectedConversation={selectedConversation} idconv= {selectedConversation.id} />
            </div>
            <MessageInput Conversationusers={selectedConversation.name} />
          </div>
        ) : (
          <p>Select a conversation to view messages ...</p>
        )}
      </div>
    </div>
  );
}
