import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { sendMessage } from "../reducers/messageSlice";
import { Textarea, Button, Label } from "flowbite-react";


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
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Your message" />
          </div>
          <Textarea
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="mb-2"
            // Add any additional styles or props you need
          />
        </div>
        <Button type="submit" className="">
          Send Message
        </Button>
      </form>
    );
  };
  
  export default SendMessageForm;
  