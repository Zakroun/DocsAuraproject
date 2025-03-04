import { FiSend, FiMic } from "react-icons/fi";
import { RiStickyNoteAddFill } from "react-icons/ri";

export default function MessageInput() {
  return (
    <div className="message_input">
      <input type="text" placeholder="Type a message..." />
      <div className="icons">
        <FiSend className="icon_input" size={30} />
        <FiMic className="icon_input" size={30} />
        <RiStickyNoteAddFill className="icon_input" size={30} />
      </div>
    </div>
  );
}
