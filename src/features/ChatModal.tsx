import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { messageType } from '~types/messageType';
import { RegenerateIcon } from "~svgComponents/RegenerateIcon";
import { ArrowDownIcon } from "~svgComponents/ArrowDownIcon";
import { SendIcon } from '~svgComponents/SendIcon';


const ChatModal = ({ onClose, isOpen, reply, setReply, setInsert}) => {
  const [isFirstMsg, setIsFirstMsg] = useState(true);
  const [fetchingReply, setFetchingReply] = useState(false);
  const [fetchingReplyFailed, setFetchingReplyFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<messageType[]>([]);

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    if(!message.length) return;
    setMessages(prevMessages => [...prevMessages, {isReply: false, content: message}])
    setMessage("");
    setIsFirstMsg(false);

    // API call
    try {
      setFetchingReplyFailed(false);
      setFetchingReply(true);
      const response = await axios.get("https://dummyapi.online/api/blogposts/" + (Math.floor(Math.random() * 50) + 1));
      const generatedReply = response.data.title;

      setReply(generatedReply);
      setFetchingReply(false);
    } catch (error) {
      setFetchingReply(false);
      setFetchingReplyFailed(true)
      console.error('Error:', error);
    }
  }

  const handleInsert = () => {
    setInsert(true);
    onClose();
  }

  // This useEffect is pushing the reply came back from the API into messages.
  useEffect(() => {
    if(reply && reply.length) {
      setMessages(prevMessages => [...prevMessages, {
        isReply: true,
        content: reply
      }])
    }
  }, [reply])

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen sm:min-h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose} />
        <span className="hidden sm:inline-block sm:align-middle h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white dark:bg-[#1b1f23] max-h-[70vh] overflow-y-auto px-4 pt-4 pb-4">
            <div className="flex flex-col items-start justify-start">
            {
              messages.length ? messages.map((msg, index) => (
                <div key={index} className={`max-w-[70%] text-gray-800 rounded-lg p-3 mb-2 ${msg.isReply ? "bg-blue-100 dark:bg-blue-700" : "self-end bg-gray-200 dark:bg-gray-600"}`}>
                    <p className='dark:text-white'>{msg.content}</p>
                </div>
              )) : <></>
            }
            </div>
          </div>
          <form onSubmit={handleGenerate}>
          <div className='px-6 dark:bg-[#1b1f23]'>
            <p className={fetchingReplyFailed ? "text-red-600 dark:text-red-500" : "dark:text-gray-300"}>
              {fetchingReply? "Generating..." : fetchingReplyFailed ? "Something went wrong!" : ""}
            </p>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Prompt" className="dark:bg-[#1b1f23] dark:text-white w-full bg-white border border-gray-300 rounded-md px-4 py-3" />
            </div>
            <div className="bg-gray-50 dark:bg-[#1b1f23] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type='submit' disabled={fetchingReply || !message.length} className="flex items-center bg-blue-500 text-white rounded-lg py-1 px-4 hover:bg-blue-600 ml-4">
              {isFirstMsg || fetchingReply
                ? <SendIcon />
                : <RegenerateIcon />
              }
              {fetchingReply ? "Generating..." : isFirstMsg || !reply || !reply.length ? "Generate" : "Regenerate"}
              </button>
              {reply && reply.length && 
                <button disabled={fetchingReply} onClick={handleInsert} className="flex items-center bg-white border-2 border-gray-400 text-gray-700 rounded-lg py-1 px-4 hover:bg-gray-100">
                  <ArrowDownIcon />
                  Insert
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
