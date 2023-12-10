import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { sendMessage } from "../reducers/messageSlice";

const SendMessageForm = ({ userId, threadId = null }) => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const senderUserId = useSelector((state) => state.login.userId);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Dispatch the sendMessage action
      dispatch(sendMessage({ userId, message, threadId, senderUserId }));
      setMessage(''); // Clear the input field after sending
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="border-2 border-gray-200 rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">
          Send Message
        </button>
      </form>
    );
  };
  
  export default SendMessageForm;
  