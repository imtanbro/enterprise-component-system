import React, { useContext, useRef, useEffect, useState, useCallback } from "react";
import "./Modal.css";
import { ModalContext } from "./ModalContext";

// Memoize the Modal component to avoid unnecessary re-renders
const Modal = React.memo(() => {
  console.log("Modal Rendered");
  
  const { modalContent, closeModal, isOpen } = useContext(ModalContext)!;

  const modalRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  // Memoize the keydown handler to avoid unnecessary re-creations
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal] // Dependency array to ensure the callback only updates when closeModal changes
  );

  // Register and clean up the keydown event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Initialize the modal resizer (only once)
  useEffect(() => {
    if (!modalRef.current) return;

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

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing || !modal) return;
      modal.style.width = `${e.clientX - modal.offsetLeft}px`;
      modal.style.height = `${e.clientY - modal.offsetTop}px`;
    };

    const onMouseUp = () => {
      setIsResizing(false);
    };

    resizer.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    // Cleanup event listeners
    return () => {
      resizer.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      resizer.remove();
    };
  }, [isResizing]);

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
});

export default Modal;
