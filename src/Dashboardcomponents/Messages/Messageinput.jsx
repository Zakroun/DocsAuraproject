import { FiSend, FiMic } from "react-icons/fi";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { useState, useRef } from "react";

export default function MessageInput({ Conversationusers, onSendMessage, isSending }) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [file, setFile] = useState(null);
  const mediaRecorderRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage({
        type: "text",
        content: message,
        fileName: null
      });
      setMessage("");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        setAudioBlob(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      onSendMessage({
        type: "audio",
        content: audioUrl,
        fileName: "audio_message.mp3"
      });
      setAudioBlob(null);
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const sendFile = () => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      onSendMessage({
        type: "document",
        content: fileUrl,
        fileName: file.name
      });
      setFile(null);
    }
  };

  return (
    <div className="message_input">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <div className="icons">
        <FiSend
          className="icon_input send-icon"
          size={30}
          onClick={handleSendMessage}
          disabled={isSending}
        />

        {isRecording ? (
          <div className="recording-indicator" onClick={stopRecording}>
            <div className="recording-dot"></div>
            <span>Recording...</span>
            <FiMic
              className="icon_input recording-active"
              size={30}
            />
          </div>
        ) : (
          <FiMic 
            className="icon_input icon_input2" 
            size={30} 
            onClick={startRecording} 
            disabled={isSending}
          />
        )}

        {audioBlob && (
          <button className="send-button" onClick={sendAudio} disabled={isSending}>
            Send
          </button>
        )}

        <input
          type="file"
          id="fileInput"
          hidden
          accept="image/*, application/pdf"
          onChange={handleFileUpload}
          disabled={isSending}
        />
        <RiStickyNoteAddFill
          className="icon_input icon_input2"
          size={30}
          onClick={() => document.getElementById("fileInput").click()}
          disabled={isSending}
        />

        {file && (
          <button className="send-button" onClick={sendFile} disabled={isSending}>
            Send
          </button>
        )}
      </div>
    </div>
  );
}