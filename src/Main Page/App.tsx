import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import Modal from '../Modal/TaskModal';
import type { Task } from '../types';
import './App.css';
import { Link } from 'react-router-dom';

const fullMonths = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

const formatDateString = (dateString: string): string => {
  const months = fullMonths;
  const [day, month, year] = dateString.split('/');
  const monthIndex = parseInt(month) - 1; // Convert to 0-indexed

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
    category: taskData?.category || "Général"
  };

  setTasks([...tasks, newTask]);
  return newTask;
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

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