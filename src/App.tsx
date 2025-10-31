import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import Modal from './TaskModal';
import type { Task } from './types';
import './App.css';

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Faire le site pour Ismail",
      assignee: "Omar",
      priority: "HIGH",
      dueDate: "1 Nov 2025",
      category: "Développement"
    },
    {
      id: 2,
      title: "Révision du budget Q4",
      assignee: "Sarah",
      priority: "MEDIUM",
      dueDate: "5 Nov 2025",
      category: "Finance"
    },
    {
      id: 3,
      title: "Réunion client TechCorp",
      assignee: "Alex",
      priority: "HIGH",
      dueDate: "3 Nov 2025",
      category: "Client"
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const addNewTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: "Nouvelle tâche à définir",
      assignee: "Non assigné",
      priority: "MEDIUM",
      dueDate: new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      category: "Général"
    };
    
    setTasks([...tasks, newTask]);
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

        <button onClick={addNewTask} className="add-button">
          <Plus size={20} />
          Ajouter une tâche
        </button>

        <div className="tasks-list">
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onClick={() => handleTaskClick(task)}
            />
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
          task={selectedTask}
        />
      </div>
    </div>
  );
}