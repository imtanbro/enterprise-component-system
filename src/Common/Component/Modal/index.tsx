import React, { useContext, useRef, useEffect, useState } from "react";
import "./Modal.css";
import { ModalContext } from "./ModalContext";

export const Modal = () => {
  const { modalContent, closeModal, isOpen } = useContext(ModalContext)!;
  console.log("Modal Open:", isOpen);

  const modalRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        console.log("Key Pressed:", e.key);
        
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  useEffect(() => {
    if (!modalRef.current) return;
    let isResizing = false;
    const modal = modalRef.current;

    const resizer = document.createElement("div");
    resizer.className = "modal-resizer";
    resizer.style.position = "absolute";
    resizer.style.width = "10px";
    resizer.style.height = "10px";
    resizer.style.bottom = "0";
    resizer.style.right = "0";
    resizer.style.cursor = "nwse-resize";

    modal.appendChild(resizer);

    resizer.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isResizing = true;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isResizing || !modal) return;
      modal.style.width = `${e.clientX - modal.offsetLeft}px`;
      modal.style.height = `${e.clientY - modal.offsetTop}px`;
    });

    document.addEventListener("mouseup", () => {
      isResizing = false;
    });

    return () => {
      resizer.remove();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div ref={modalRef} className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="modal-close">
          ✖
        </button>
        {modalContent}
      </div>
    </div>
  );
};
