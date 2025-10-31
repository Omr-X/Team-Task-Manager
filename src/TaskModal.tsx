import React from "react";
import type { Task } from './types';
import "./TaskModal.css";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export function InputText(props:any) {
  return (
    <div>
      <h2 className="subtitle">{props.title}</h2>
      {props.multiline ?(<textarea value = {props.value} onChange={(e) => props.setValue(e.target.value)} className = {props.className} placeholder={props.placeholder}></textarea>)
      : (<input value = {props.value} onChange={(e) => props.setValue(e.target.value)} className = {props.className} placeholder={props.placeholder}></input>)}
    </div>
  );
}

export default function Modal({ isOpen, onClose }: ModalProps) {

  if (isOpen) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  if (!isOpen) return null;

  const [valueTitle, setValueTitle] = useState('');
  const [valueDescription,setValueDescription] = useState('');

    return (
    <>
      <div className="modal">
        <div onClick={onClose} className="overlay"></div>
        <div className="modal-content">
          <h1>Creer une tache</h1>
          <InputText title="Titre" value = {valueTitle} setValue = {setValueTitle} placeholder = "Titre de la tache" className = "input-text"/>
          <span><InputText title="Titre" value = {valueTitle} setValue = {setValueTitle} placeholder = "Titre de la tache" className = "input-text"/></span>
          <InputText title="Description" value = {valueDescription} setValue = {setValueDescription} placeholder = "Description de la tache" className = "description-text" textarea = {true}/>
          <button className="close-modal" onClick={onClose}>
          </button>
        </div>
      </div>
    </>
  );

  
}



