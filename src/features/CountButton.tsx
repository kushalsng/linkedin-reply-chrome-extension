import { useReducer, useState } from "react"
import { Modal } from "./Modal";

export const CountButton = () => {
  const [count, increase] = useReducer((c) => c + 1, 0)
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // return (
  //   <button
  //     onClick={() => increase()}
  //     type="button"
  //     className="flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none
  //     shadow-lg hover:shadow-md
  //     active:scale-105 bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900">
  //     Count:
  //     <span className="inline-flex items-center justify-center w-8 h-4 ml-2 text-xs font-semibold rounded-full">
  //       {count}
  //     </span>
  //   </button>
  // )
  return (
    <>
    <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
      Open Modal
    </button>
    {isOpen && (
      <Modal closeModal={closeModal} />
    )}
    </>
  )
}
