import { ListGroup } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedThread } from "../reducers/messageSlice";

const Threads = () => {
  const dispatch = useDispatch();

  const threads = useSelector((state) => state.messages.threads);
  const selectedThread = useSelector((state) => state.messages.selectedThread);
  const userId = useSelector((state) => state.login.userId);
  // Lets filter out threads with out any answers
  const filteredThreads = threads.filter((thread) =>
    thread.userIds.some((id) => id !== userId)
  );

  return (
    <ListGroup className="w-screen rounded-none max-w-xl">
      {filteredThreads.map((thread, index) => {
        return (
          <ListGroup.Item
            key={index}
            as="div"
            className={`relative text-zinc-500 flex items-center space-x-4`}
            onClick={() => dispatch(setSelectedThread(thread.threadId))}
            active={thread.threadId === selectedThread}
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[url(https://i.pravatar.cc/100)] bg-cover rounded-full"></div>
            </div>

            <div className="flex ml-5 flex-col justify-center text-left">
              <p className="font-bold">Chat with { thread.threadMembers.filter(member => member.id !== userId).map(member => member.username).join(", ")}</p>
              <p className="font-normal">{thread.messages[0].message}</p>
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Threads;
