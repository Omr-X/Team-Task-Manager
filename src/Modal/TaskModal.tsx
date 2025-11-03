import type { Task } from '../types.ts';
import "./TaskModal.css";
import { useState, type ReactElement } from "react";
import { CircleCheck, X } from 'lucide-react';
import {addNewTask} from '../Main Page/App.tsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
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

export function DateInput(props: any) {
  const formatDate = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Add slashes at appropriate positions
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2);
    } else {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4) + '/' + numbers.slice(4, 8);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    props.setValue(formatted);
  };

  return (
    <div>
      <h2 className="subtitle">{props.title}</h2>
      <input 
        value={props.value} 
        onChange={handleChange}
        className={props.className} 
        placeholder="DD/MM/YYYY"
        maxLength={10}
      />
    </div>
  );
}

export function DropDown(props: any) {
  const { title, items, value, setValue } = props;

  return (
    <div>
      <label>
        <div className='row'>
          <h2 className='subtitle'>{title}</h2>
          <select name={title} className='dropDown' value ={value} onChange={(e) => setValue(e.target.value)}>
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

export default function Modal({ isOpen, onClose, tasks, setTasks }: ModalProps) {

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
  const [valuePriority, setPriority] = useState('LOW');
  const [valueCategory, setCategory] = useState('Autre');

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
                <DateInput
                  title="Due Date"
                  value={valDueDate}
                  setValue={setDueDate}
                  className="input-text"
                />
                  <br></br>
                <DropDown 
                title="Priorité" 
                items={['HIGH', 'MEDIUM', 'LOW']}
                value = {valuePriority}
                setValue = {setPriority}
                />
                <DropDown
                title="Categorie" 
                items={['Impact', 'Media', 'Sponsor', 'Rencontre', 'Autre']}
                value = {valueCategory}
                setValue = {setCategory}
                />
              </div>
            </div>
          </div>
          <button className="close-modal" onClick={onClose}>
            <X size={20} />
          </button>
          <button className="done-modal" onClick={() => {addNewTask(tasks, setTasks, {
            title: valueTitle,
            assignee: valueResponsable,
            priority: valuePriority,
            category: valueCategory,
            dueDate: valDueDate,
            description: valueDescription,
            Responsable: valueResponsable,
            Team: valueTeam,
            date: new Date().toLocaleString('fr-FR')

          }); onClose();}}>
            Publier
          </button>
        </div>
      </div>
    </>
  );


}



