import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopAppBar from "../lib/TopAppBar";
import BottomNavbar from "../lib/BottomNavbar";
import Conversation from "../components/Conversation";
import Threads from "../components/Threads";
import { getThreads } from "../reducers/messageSlice";



const view = "conversatio";
const Messages = () => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getThreads());
  }, []);

  const threads = useSelector((state) => state.messages.threads);
  const selectedThread = useSelector((state) => state.messages.selectedThread);
  
  console.log("Threads", threads)

  return (
    <div className="flex flex-col h-screen">
        <TopAppBar>Your messages</TopAppBar>
        <div className="flex-grow">  
          <div className="flex flex-col md:flex-row w-full h-full">
              <div className={`flex-none md:flex bg-white ${selectedThread ? 'hidden md:block' : ''}`}>
                  <Threads />
              </div>
              <div className={`flex-grow bg-gray-100 ${selectedThread ? '' : 'hidden md:block'}`}>
                  <Conversation />
              </div>
          </div>
        </div>
        <BottomNavbar />
    </div>
  )
}

export default Messages;