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

  // Get user ID from localStorage
  // Update the useEffect that sets userId
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

  // Update the sendMessage function
  const sendMessage = async (messageData) => {
    if (!selectedConversation || !userId || !userType) return;

    try {
      setSendingMessage(true);
      const response = await axios.post(`${baseURL}/messages`, {
        user_id: userId,
        idcontact: selectedConversation.idcontact,
        type: selectedConversation.type,
        content: messageData.content,
        type_message: messageData.type,
        user_type: userType, // Add this
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
      // Show error to user
      alert(error.response?.data?.message || "Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  // Fetch contacts when userId is available
  useEffect(() => {
    if (userId) {
      fetchContacts();
    }
  }, [userId]);

  // API Functions
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL}/messages/contacts?id=${userId}`
      );
      console.log(response.data);
      const contacts = response.data.map((contact) => ({
        id: contact.id,
        name: contact.name,
        avatar: contact.avatar || null,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        messages: [],
        unread: 0,
        type: contact.type,
      }));
      setConversationList(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (contactId) => {
    try {
      const response = await axios.get(
        `${baseURL}/messages?user_id=${userId}&contact_id=${contactId}`
      );
      //console.log(response.data)
      return response.data.map((msg) => ({
        idMessage: msg.id,
        sender: msg.senderId === userId ? "You" : msg.sender?.name || "Unknown",
        content: msg.content,
        type: msg.type,
        time: new Date(msg.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: msg.read,
        fileName: msg.type === "document" ? msg.content.split("/").pop() : null,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  // const sendMessage = async (messageData) => {
  //   if (!selectedConversation || !userId) return;

  //   try {
  //     setSendingMessage(true);
  //     console.log(selectedConversation)
  //     const response = await axios.post(`${baseURL}/messages`, {
  //       user_id: userId,
  //       idcontact: selectedConversation.idcontact, // L'ID du contact
  //       type: selectedConversation.type, // 'doctor', 'clinic', 'lab' ou 'visiteur'
  //       content: messageData.content,
  //       type_message: messageData.type,
  //     });

  //     const newMessage = {
  //       idMessage: response.data.message.idMessage,
  //       sender: "You",
  //       content: response.data.message.content,
  //       type: response.data.message.type,
  //       time: response.data.message.time,
  //       read: response.data.message.read,
  //       fileName: messageData.fileName,
  //     };

  //     // Mettre à jour la conversation
  //     setSelectedConversation((prev) => ({
  //       ...prev,
  //       messages: [...prev.messages, newMessage],
  //     }));

  //     // Mettre à jour la liste des conversations
  //     setConversationList((prev) =>
  //       prev.map((conv) =>
  //         conv.id === selectedConversation.id
  //           ? {
  //               ...conv,
  //               messages: [...conv.messages, newMessage],
  //               time: newMessage.time,
  //             }
  //           : conv
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   } finally {
  //     setSendingMessage(false);
  //   }
  // };

  const markMessagesAsRead = async (contactId) => {
    try {
      await axios.post(`${baseURL}/messages/mark-as-read`, {
        user_id: userId,
        contact_id: contactId,
      });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`${baseURL}/messages/${messageId}`, {
        data: { user_id: userId },
      });

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

  const openConversation = async (conv) => {
    const messages = await fetchMessages(conv.id);
    await markMessagesAsRead(conv.id);

    const updatedConversation = {
      ...conv,
      idcontact: conv.idcontact || conv.id.split("_")[1],
      unread: 0,
      messages: messages,
    };

    setSelectedConversation(updatedConversation);
    setConversationList((prev) =>
      prev.map((c) => (c.id === conv.id ? updatedConversation : c))
    );
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
