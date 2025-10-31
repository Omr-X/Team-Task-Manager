import React from "react";
import type { Task } from './types';
import "./TaskModal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  
  if (!isOpen) return null;

  if (isOpen) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <>
      <div className="modal">
        <div onClick={onClose} className="overlay"></div>
        <div className="modal-content">
          <h2>Hello Modal</h2>
          <p>allo</p>
          <button className="close-modal" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}