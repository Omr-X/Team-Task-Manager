import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PencilLine } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import type { Task } from '../types';
import { Badge } from '../Main Page/Badge';
import Modal from '../Modal/TaskModal';
import './TaskPage.css'

interface Comment {
  id: number;
  text: string;
  date: string;
}

export default function TaskPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task as Task;

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    const savedComments = localStorage.getItem(`task-comments-${task.id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [task.id]);

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`task-comments-${task.id}`, JSON.stringify(comments));
    }
  }, [comments, task.id]);

  const deleteTask = () => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      const tasks: Task[] = JSON.parse(saved);
      const updatedTasks = tasks.filter(t => t.id !== task.id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      navigate('/');
    }
  };

  const commentSubmit = (e: any) => {
    if (e.key === 'Enter' && commentInput.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentInput,
        date: new Date().toLocaleDateString()
      };
      setComments([...comments, newComment]);
      setCommentInput('');
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="main-title">{task.title}</h1>
            <button style={{
              background: '#fff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
              onClick={toggleModal}
            >
              <PencilLine size={20} />
            </button>
          </div>
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
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={commentSubmit}
            />
          </div>

          {comments.length > 0 && (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-date">{comment.date}</span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="actions-container">
          <button className="delete-btn" onClick={deleteTask}>Delete Task</button>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          navigate('/');  
        }}
        task={null}
        tasks={tasks}
        setTasks={setTasks}
        editingTask={task}
      />
    </div >
  );
}