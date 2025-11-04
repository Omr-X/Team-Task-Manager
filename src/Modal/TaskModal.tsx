import type { Task } from '../types.ts';
import "./TaskModal.css";
import { useEffect, useState, type ReactElement } from "react";
import { CircleCheck, X } from 'lucide-react';
import { addNewTask } from '../Main Page/App.tsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  editingTask?: Task | null;
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

    const numbers = value.replace(/\D/g, '');

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
          <select name={title} className='dropDown' value={value} onChange={(e) => setValue(e.target.value)}>
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

export default function Modal({ isOpen, onClose, tasks, setTasks, editingTask }: ModalProps) {

  if (isOpen) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  if (!isOpen) return null;

  const [valueTitle, setValueTitle] = useState(editingTask?.title || '');
  const [valueDescription, setValueDescription] = useState(editingTask?.description || '');
  const [valDueDate, setDueDate] = useState(editingTask?.dueDate || '');
  const [valueResponsable, setResponsable] = useState(editingTask?.Responsable || '');
  const [valueTeam, setTeam] = useState(editingTask?.Team || '');
  const [valuePriority, setPriority] = useState(editingTask?.priority || 'LOW');
  const [valueCategory, setCategory] = useState(editingTask?.category || 'Autre');

  // Add this helper function at the top of the component (around line 95, before useEffect)
  const parseFormattedDate = (formattedDate: string): string => {
    // If it's already in DD/MM/YYYY format, return as is
    if (formattedDate.includes('/')) return formattedDate;

    // If it's "Date non assignée" or similar, return empty
    if (!formattedDate || formattedDate.includes('non')) return '';

    // Parse "01 Jan 2025" format back to "01/01/2025"
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    const parts = formattedDate.split(' ');
    if (parts.length === 3) {
      const day = parts[0];
      const monthIndex = months.indexOf(parts[1]) + 1;
      const year = parts[2];
      return `${day}/${monthIndex.toString().padStart(2, '0')}/${year}`;
    }
    return '';
  };

  useEffect(() => {
    if (editingTask) {
      setValueTitle(editingTask.title);
      setValueDescription(editingTask.description);
      setDueDate(parseFormattedDate(editingTask.dueDate));
      setResponsable(editingTask.Responsable);
      setTeam(editingTask.Team);
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
    } else {
      setValueTitle('');
      setValueDescription('');
      setDueDate('');
      setResponsable('');
      setTeam('');
      setPriority('LOW');
      setCategory('Autre');
    }
  }, [editingTask]);

  const handleSave = () => {
    if (editingTask) {
      // Editing existing task
      const updatedTasks = tasks.map((t) =>
        t.id === editingTask.id
          ? {
            ...t,
            title: valueTitle.trim() || editingTask.title,
            description: valueDescription.trim() || editingTask.description,
            dueDate: valDueDate.trim() || editingTask.dueDate,
            Responsable: valueResponsable.trim() || editingTask.Responsable,
            Team: valueTeam.trim() || editingTask.Team,
            priority: valuePriority,
            category: valueCategory,
          }
          : t
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {
      const newTask = {
        id: Date.now(),
        title: valueTitle.trim() || "Nouvelle tâche à définir",
        description: valueDescription.trim() || "Aucune description a ete donne pour cette tache",
        dueDate: valDueDate.trim() || "Date non assignée",
        Responsable: valueResponsable.trim() || "Aucun responsable",
        Team: valueTeam.trim() || "Aucune equipe pour cette tache",
        priority: valuePriority,
        category: valueCategory,
        date: new Date().toLocaleString('fr-FR')
      };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
    onClose();
  };
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
                  value={valuePriority}
                  setValue={setPriority}
                />
                <DropDown
                  title="Categorie"
                  items={['Impact', 'Media', 'Sponsor', 'Rencontre', 'Autre']}
                  value={valueCategory}
                  setValue={setCategory}
                />
              </div>
            </div>
          </div>
          <button className="close-modal" onClick={onClose}>
            <X size={20} />
          </button>
          <button className="done-modal" onClick={handleSave} >
            Publier
          </button>
        </div>
      </div>
    </>
  );


}

