import { FiSend, FiMic } from "react-icons/fi";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { Sent } from "../../data/DocsauraSlice";

export default function MessageInput({ Conversationusers }) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [file, setFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const dispatch = useDispatch();

  const SentMessage = () => {
    if (message.trim() !== "") {
      dispatch(Sent({message: message, name: Conversationusers }));
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
      dispatch(Sent({ type: "audio", content: URL.createObjectURL(audioBlob), name: Conversationusers }));
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
      dispatch(Sent({ type: "document", content: URL.createObjectURL(file), name: Conversationusers, fileName: file.name }));
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
      />
      <div className="icons">
        <FiSend className="icon_input send-icon" size={30} onClick={SentMessage} />

        {isRecording ? (
          <div className="recording-indicator">
            <div className="recording-dot"></div>
            <span>Recording...</span>
            <FiMic className="icon_input recording-active" size={30} onClick={stopRecording} />
          </div>
        ) : (
          <FiMic className="icon_input" size={30} onClick={startRecording} />
        )}

        {audioBlob && (
          <button className="send-button" onClick={sendAudio}>
            Send Audio
          </button>
        )}

        <input type="file" id="fileInput" hidden onChange={handleFileUpload} />
        <RiStickyNoteAddFill
          className="icon_input"
          size={30}
          onClick={() => document.getElementById("fileInput").click()}
        />

        {file && (
          <button className="send-button" onClick={sendFile}>
            Send File
          </button>
        )}
      </div>
    </div>
  );
}
