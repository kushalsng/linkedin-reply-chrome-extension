import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useRef } from "react"

import { CountButton } from "~features/CountButton"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}


const PlasmoOverlay = () => {
  const msgBoxRef = useRef();
  return (
    <div className="z-50 flex fixed bottom-32 right-8">
      <CountButton />
    </div>
  )
}

export default PlasmoOverlay