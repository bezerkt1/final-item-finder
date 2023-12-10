import { useSelector } from "react-redux";
import SendMessageForm from "./SendMessageForm";

const Conversation = () => {

  const threads = useSelector((state) => state.messages.threads);
  const selectedThread = useSelector((state) => state.messages.selectedThread);
  const userId = useSelector((state) => state.login.userId);

  if (threads.length === 0) {
    return <div>Loading...</div>;
  }
  const thread = threads.find(thread => thread.threadId === selectedThread)
  console.log(thread)
  if (thread && thread.length !== 0) {
    return (
        <div className="flex flex-col space-y-4 p-4">
        <SendMessageForm userId={thread.userIds.find(id => id !== userId)} threadId={thread.threadId} />
        { [...thread.messages].reverse().map((message, index) => {
          console.log(message)
          return (
            <div key={index} className={`flex items-center space-x-2 ${message.user_id === userId  ? "" : "justify-end"}`}>
              <div className={`p-2 rounded-lg max-w-xs ${message.user_id === userId ? "bg-gray-300" : "bg-gray-200"}`}>
                {message.message}
              </div>
            </div>
          )
        })}
        </div>
    )
  }
}

export default Conversation;