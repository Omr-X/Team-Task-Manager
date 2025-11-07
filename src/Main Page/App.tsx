import React, { useState } from 'react';
import { Plus, House, ChartColumn, Settings, Sun} from 'lucide-react';
import { TaskCard } from './TaskCard';
import Modal from '../Modal/TaskModal';
import type { Task } from '../types';
import './App.css';
import { useNavigate } from 'react-router-dom';

const fullMonths = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

const formatDateString = (dateString: string): string => {
  const months = fullMonths;
  const [day, month, year] = dateString.split('/');
  const monthIndex = parseInt(month) - 1;
  return `${day} ${months[monthIndex]} ${year}`;
};

export const addNewTask = (
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  taskData?: Partial<Task>
): Task => {
  const newTask: Task = {
    id: Date.now(),
    title: taskData?.title || "Nouvelle tâche à définir",
    priority: taskData?.priority || "MEDIUM",
    dueDate: (taskData?.dueDate && taskData.dueDate !== '')
      ? formatDateString(taskData.dueDate)
      : "Date non assignée",
    category: taskData?.category || "Général",
    description: taskData?.description || "Aucune description a ete donne pour cette tache",
    Responsable: taskData?.Responsable || "Aucun responsable",
    Team: taskData?.Team || "Aucune equipe pour cette tache",
    date: taskData?.date || ""
  };

  const updatedTasks = [...tasks, newTask];
  setTasks(updatedTasks);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  return newTask;
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="app-container">
      <div className="side-bar">
        <div className="top-bar-content">
          <div className='side-bar-content' style={{ margin: 'auto', width: '50%', padding: '10px' }}>
            <button className='add-button-black-icon'><House size={30} /></button>
            <button onClick={() => navigate('/DashBoard')} className='add-button-black-icon'><ChartColumn size={30} /></button>
            <button className='add-button-black-icon-setting'><Settings size={30} /></button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="header-app">
          <h1 className="main-title-page">Suivi de Comm</h1>
          <p className="description-page">Toutes les tâches seront données ici</p>
        </div>

        <div className="filter-sort-container">
          <div className="filter-section">
            <label>Filtrer par:</label>
            <select className="filter-select">
              <option value="">Toutes les catégories</option>
              <option value="Finance">Finance</option>
              <option value="Tech">Tech</option>
              <option value="RH">RH</option>
              <option value="Général">Général</option>
            </select>

            <select className="filter-select">
              <option value="">Tous les responsables</option>
            </select>

            <select className="filter-select">
              <option value="">Toutes les priorités</option>
              <option value="HIGH">Haute</option>
              <option value="MEDIUM">Moyenne</option>
              <option value="LOW">Basse</option>
            </select>
          </div>

          <div className="sort-section">
            <label>Trier par:</label>
            <select className="sort-select">
              <option value="dueDate">Date d'échéance</option>
              <option value="priority">Priorité</option>
              <option value="category">Catégorie</option>
            </select>
          </div>
        </div>

        <div className="tasks-list">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="empty-state">
            <p>Aucune tâche pour le moment</p>
            <p>Cliquez sur le bouton ci-dessus pour en ajouter une</p>
          </div>
        )}


        <button className='plus-button' onClick={toggleModal}>
          <Plus size={20} />
        </button>


        <Modal
          isOpen={modalOpen}
          onClose={toggleModal}
          task={null}
          tasks={tasks}
          setTasks={setTasks}
          editingTask={null}
        />
      </div>
    </div>
  );
}