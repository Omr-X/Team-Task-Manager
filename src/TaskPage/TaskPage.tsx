import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import type { Task } from '../types';
import { Badge } from '../Main Page/Badge';
import './TaskPage.css'

export default function TaskPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state?.task as Task;

    const deleteTask = () => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            const tasks: Task[] = JSON.parse(saved);
            const updatedTasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            navigate('/');
        }
    };

    if (!task) {
        return <div><h1>No task found</h1></div>;
    }
    return (
        <div className="app-container">
            <div className="top-bar">
                <div className="top-bar-content">
                    <button className='add-button-black' onClick={() => navigate('/')}>
                        <div className='row'>
                            <ArrowLeft size={35} />
                            <h1>
                                RETOUR
                            </h1>
                        </div>
                    </button>
                </div>
            </div>

            <div className="main-content">
                <div className="header">
                    <h1 className="main-title">{task.title}</h1>

                    <div className="badge-container">
                        <div className="badge-item">
                            <span className="small-text">Priority:</span>
                            <Badge variant={task.priority}>{task.priority}</Badge>
                        </div>
                        <div className="badge-item">
                            <span className="small-text">Category:</span>
                            <Badge variant={task.category}>{task.category}</Badge>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h2 className="subtitle">Description</h2>
                    <p className="text">{task.description}</p>
                </div>

                <div className="section">
                    <h2 className="subtitle">Responsible</h2>
                    <p className="title">{task.Responsable}</p>
                </div>

                <div className="section">
                    <h2 className="subtitle">Team</h2>
                    <p className="text">{task.Team}</p>
                </div>

                <div className="creation-info">
                    <span className="creation-text">Created by idk on {task.date}</span>
                </div>

                <div className="comments-section">
                    <h2 className="subtitle">Comments</h2>
                    <div className="comment-input-container">
                        <input
                            type="text"
                            className="comment-input"
                            placeholder="Add a comment..."
                        />
                    </div>
                </div>
                <div className="actions-container">
                    <button className="delete-btn" onClick={deleteTask}>Delete Task</button>
                </div>
            </div>
        </div>
    );
}