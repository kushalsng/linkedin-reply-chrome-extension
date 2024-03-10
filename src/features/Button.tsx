import { useState } from "react"
import ChatModal from "./ChatModal";
import { MessageBoxIcon } from "~svgComponents/MessageBoxIcon";


// This button will show bottom right of input box when it is focused. 
export const CountButton = ({reply, setReply, setInsert }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="bg-white hover:bg-gray-400 rounded-full"
        onClick={onOpen}
        style={{ padding: "0.5rem" }}
      >
        <MessageBoxIcon />
      </button>
      {isOpen
        ? <ChatModal
            setInsert={setInsert}
            reply={reply}
            setReply={setReply}
            isOpen={isOpen}
            onClose={onClose}
          />
        : <></>
      }
    </>
  )
}
