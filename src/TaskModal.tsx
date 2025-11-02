import type { Task } from './types';
import "./TaskModal.css";
import { useState, type ReactElement } from "react";
import { CircleCheck, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export function InputText(props: any) {
  return (
    <div>
      <h2 className="subtitle">{props.title}</h2>
      {props.multiline ? (<textarea value={props.value} onChange={(e) => props.setValue(e.target.value)} className={props.className} placeholder={props.placeholder}></textarea>)
        : (<input value={props.value} onChange={(e) => props.setValue(e.target.value)} className={props.className} placeholder={props.placeholder}></input>)}
    </div>
  );
}

export function DropDown(props: any) {
  const { title, items } = props;

  return (
    <div>
      <label>
        <div className='row'>
          <h2 className='subtitle'>{title}</h2>
          <select name={title} className='dropDown'>
            {items.map((item: string, index: number) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </label>
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
  const [valueDescription, setValueDescription] = useState('');
  const [valDueDate, setDueDate] = useState('');
  const [valueResponsable, setResponsable] = useState('');
  const [valueTeam, setTeam] = useState('');

  return (
    <>
      <div className="modal">
        <div onClick={onClose} className="overlay"></div>
        <div className="modal-content">
          <h1>
            <CircleCheck size={26} />
            &nbsp;
            Creer une tache
          </h1>
          <div className="row">
            <InputText
              title="Titre"
              value={valueTitle}
              setValue={setValueTitle}
              placeholder="Titre de la tache"
              className="input-text" />
            <InputText
              title="Personne responsable pour la tache"
              value={valueResponsable}
              setValue={setResponsable}
              placeholder="Recherche la personne responsable"
              className="input-text" />
          </div>
          <div className="row">
            <InputText title="Description"
              value={valueDescription}
              setValue={setValueDescription}
              placeholder="Description de la tache"
              className="description-text"
              multiline={true} />
            <div className="row">
              <InputText title="Equipe attitre a la tache"
                value={valueTeam}
                setValue={setTeam}
                placeholder="Recherche les membres de l'equipe"
                className="find-team"
                multiline={true} />
              <div>
                <InputText
                  title="Due Date"
                  value={valDueDate}
                  setValue={setDueDate}
                  placeholder="Titre de la tache"
                  className="input-text" />
                  <br></br>
                <DropDown 
                title="Priorité" 
                items={['Haute', 'Moyenne', 'Basse', 'Aucune']}/>
                <DropDown 
                title="Categorie" 
                items={['Impact', 'Media', 'Sponsor', 'Rencontre', 'Autre']}/>
              </div>
            </div>
          </div>
          <button className="close-modal" onClick={onClose}>
            <X size={20} />
          </button>
          <button className="done-modal" onClick={onClose}>
            Publier
          </button>
        </div>
      </div>
    </>
  );


}



