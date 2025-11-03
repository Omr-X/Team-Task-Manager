import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import Modal from '../Modal/TaskModal';
import type { Task } from '../types';
import './App.css';

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
    id: tasks.length + 1,
    title: taskData?.title || "Nouvelle tâche à définir",
    assignee: taskData?.assignee || "Non assigné",
    priority: taskData?.priority || "MEDIUM",
    dueDate: (taskData?.dueDate && taskData.dueDate !== '')
      ? formatDateString(taskData.dueDate)
      : "Date non assignée",
    category: taskData?.category || "Général",
    description: taskData?.description || "Aucune description a ete donne pour cette tache",
    Responsable: taskData?.Responsable || "Aucune responsable a ete donne pour cette tache",
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
    return []; // ← Return empty array as default
  });

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="top-bar-content"></div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1 className="main-title">Suivi de Comm</h1>
          <p className="subtitle">Toutes les tâches seront données ici</p>
        </div>

        <button
          onClick={toggleModal}
          className="add-button"
        >
          <Plus size={20} />
          Ajouter une tâche
        </button>

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

        <Modal
          isOpen={modalOpen}
          onClose={toggleModal}
          task={null}
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
}