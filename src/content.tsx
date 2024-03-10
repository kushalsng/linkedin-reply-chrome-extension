import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoGetOverlayAnchorList, PlasmoMountShadowHost } from "plasmo"
import { FC, useEffect, useState } from "react"
import { CountButton } from "~features/Button"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getInlineAnchorList: PlasmoGetOverlayAnchorList = async () =>
  document.querySelectorAll(".msg-form__msg-content-container.msg-form__msg-content-container--is-active .msg-form__contenteditable")

export const mountShadowHost: PlasmoMountShadowHost = ({ shadowHost, anchor }) => {
  const anchorParent = anchor.element.parentNode;
  const container = document.createElement('div');
  container.appendChild(anchor.element);
  container.appendChild(shadowHost);
  anchorParent.appendChild(container);
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}


const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
  const [reply, setReply] = useState("");
  const [insert, setInsert] = useState(false);

  // This useEffect is executed when Insert Button is clicked
  useEffect(() => {
    // Inserting the latest reply (if there is any) into the input box.
    if(insert && reply && reply.length) {
      const messageBox = document.querySelector(".msg-form__contenteditable");
      const messageBoxPlaceholder = document.querySelector(".msg-form__placeholder");
      const sendButton = document.querySelector(".msg-form__send-button");
      const contentContainer = document.querySelector(".msg-form__msg-content-container");


      // Removing placeholder and enabling send button
      contentContainer.classList.add('msg-form__msg-content-container--is-active');
      if(messageBoxPlaceholder) {
        messageBoxPlaceholder.classList.remove('msg-form__placeholder');
      }
      sendButton.removeAttribute("disabled");

      // updating content of the input box.
      messageBox.innerHTML = `<p>${reply}</p>`;
      setReply("");
      setInsert(false);
    }
  }, [insert])

  return (
    <div className="z-50 flex absolute" style={{ bottom: "1rem", right: "5.5rem"}}>
      <CountButton
        setInsert={setInsert}
        reply={reply}
        setReply={setReply}
      />
    </div>
  )
}

export default PlasmoOverlay
