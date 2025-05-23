import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaArrowRight } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import MessageInput from "./Messageinput";
import Messages from "./MessagesList";
import axios from "axios";

export default function ChatApp() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [search, setSearch] = useState("");
  const [conversationList, setConversationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [sendingMessage, setSendingMessage] = useState(false);
  const baseURL = "http://localhost:8000/api";
  const chatBodyRef = useRef(null);

  // Get user ID and type from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.id_doctor) {
        setUserId(user.id_doctor);
        setUserType("doctor");
      } else if (user.id_clinic) {
        setUserId(user.id_clinic);
        setUserType("clinic");
      } else if (user.id_labo) {
        setUserId(user.id_labo);
        setUserType("lab");
      } else if (user.id) {
        setUserId(user.id);
        setUserType("visiteur");
      }
    }
  }, []);

  const sendMessage = async (messageData) => {
    if (!selectedConversation || !userId || !userType) return;

    try {
      setSendingMessage(true);
      console.log("UserType:", userType);
      const backendType =
        selectedConversation.type === "labo"
          ? "lab"
          : selectedConversation.type === "laboratory"
          ? "lab"
          : selectedConversation.type;

      const response = await axios.post(`${baseURL}/messages`, {
        user_id: userId,
        idcontact: selectedConversation.idcontact,
        type: backendType, // Use the normalized type
        content: messageData.content,
        type_message: messageData.type,
        user_type: userType,
      });

      const newMessage = {
        idMessage: response.data.message.idMessage,
        sender: "You",
        content: response.data.message.content,
        type: response.data.message.type,
        time: response.data.message.time,
        read: response.data.message.read,
        fileName: messageData.fileName,
      };

      // Update conversation state
      setSelectedConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      // Update conversation list
      setConversationList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                time: newMessage.time,
              }
            : conv
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      alert(error.response?.data?.message || "Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  // Fetch contacts when userId is available
  useEffect(() => {
    if (userId && userType) {
      fetchContacts();
    }
  }, [userId, userType]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL}/messages/contacts?id=${userId}`
      );

      // First get all contacts
      const contacts = await Promise.all(
        response.data.map(async (contact) => {
          // Fetch messages for each contact to get the last message time
          const messages = await fetchMessages(
            contact.idcontact,
            contact.type === "laboratory" ? "lab" : contact.type
          );
          const lastMessage = messages[messages.length - 1];

          return {
            id: contact.id,
            name: contact.name,
            avatar: contact.avatar || null,
            time: lastMessage
              ? formatTime(lastMessage.created_at)
              : new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            messages: messages,
            unread: 0,
            type: contact.type === "laboratory" ? "lab" : contact.type,
            idcontact: contact.idcontact,
          };
        })
      );

      // Sort conversations by last message time (newest first)
      const sortedContacts = contacts.sort((a, b) => {
        const timeA =
          a.messages.length > 0
            ? new Date(a.messages[a.messages.length - 1].created_at)
            : new Date(0);
        const timeB =
          b.messages.length > 0
            ? new Date(b.messages[b.messages.length - 1].created_at)
            : new Date(0);
        return timeB - timeA;
      });

      setConversationList(sortedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (contactId, contactType) => {
    try {
      const response = await axios.get(`${baseURL}/messages`, {
        params: {
          user_id: userId,
          contact_id: `${contactType}_${contactId}`,
          user_type: userType,
        },
      });

      return response.data.map((msg) => ({
        ...msg,
        time: formatTime(msg.created_at),
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openConversation = async (conv) => {
    // If we already have messages, use them
    if (conv.messages && conv.messages.length > 0) {
      const updatedConversation = {
        ...conv,
        unread: 0,
      };
      setSelectedConversation(updatedConversation);
      setConversationList((prev) =>
        prev.map((c) => (c.id === conv.id ? updatedConversation : c))
      );
    } else {
      // Otherwise fetch messages
      const messages = await fetchMessages(conv.idcontact, conv.type);
      const updatedConversation = {
        ...conv,
        messages: messages.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        ),
        unread: 0,
      };
      setSelectedConversation(updatedConversation);
      setConversationList((prev) =>
        prev.map((c) => (c.id === conv.id ? updatedConversation : c))
      );
    }
  };

  const deleteMessage = async (messageId) => {
    //console.log('hhhhhhhhhhhhhhh')
    try {
      // Only send the message ID in the URL (no request body)
      await axios.delete(`${baseURL}/messages/${messageId}`);
      console.log(messageId)
      // Update local state
      setSelectedConversation((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg.idMessage !== messageId),
      }));

      setConversationList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? {
                ...conv,
                messages: conv.messages.filter(
                  (msg) => msg.idMessage !== messageId
                ),
              }
            : conv
        )
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const filteredConversations = search
    ? conversationList.filter((conv) =>
        conv.name.toLowerCase().includes(search.toLowerCase())
      )
    : conversationList;

  const getLastMessagePreview = (messages) => {
    if (!messages || messages.length === 0) return "No messages yet";

    const lastMsg = messages[messages.length - 1];
    if (lastMsg.type === "audio") return "Sent an audio";
    if (lastMsg.type === "document") return "Sent a file";

    return lastMsg.content.length > 20
      ? `${lastMsg.content.substring(0, 20)}...`
      : lastMsg.content;
  };

  if (loading) {
    return <div className="chat-app loading">Loading conversations...</div>;
  }

  return (
    <div className="chat-app">
      <div className="conversation-list">
        <h2>Messages</h2>
        <input
          type="text"
          className="search-input-messages"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="conversation-items">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${
                selectedConversation?.id === conv.id ? "active" : ""
              }`}
              onClick={() => openConversation(conv)}
            >
              {conv.avatar ? (
                <img
                  src={`http://localhost:8000/storage/${conv.avatar}`}
                  alt={conv.name}
                  className="avatar"
                />
              ) : (
                <FaUserCircle className="avatar-icon" size={40} />
              )}
              <div className="details">
                <p className="name">{conv.name}</p>
                <p className="message">
                  {getLastMessagePreview(conv.messages)}
                </p>
              </div>
              <div className="meta">
                <p className="timestamp">{conv.time}</p>
                {conv.unread > 0 && (
                  <div className="unread-badge">
                    <MdNotifications size={18} className="notify" />
                    {conv.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="coversation">
        {selectedConversation ? (
          <div className="conversation-container">
            <div className="conversation-header">
              {selectedConversation.avatar ? (
                <img
                  src={`http://localhost:8000/storage/${selectedConversation.avatar}`}
                  alt={selectedConversation.name}
                  className="avatar"
                />
              ) : (
                <FaUserCircle className="avataricon" size={40} />
              )}
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
              <Messages
                selectedConversation={selectedConversation}
                idconv={selectedConversation.id}
                onDeleteMessage={deleteMessage}
              />
            </div>
            <MessageInput
              Conversationusers={selectedConversation.name}
              onSendMessage={sendMessage}
              isSending={sendingMessage}
            />
          </div>
        ) : (
          <p className="p-select-message">
            Select a conversation to view messages...
          </p>
        )}
      </div>
    </div>
  );
}
