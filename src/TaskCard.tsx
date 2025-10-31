import React from 'react';
import { User, Calendar, AlertCircle } from 'lucide-react';
import { Badge } from './Badge';
import type { Task } from './types';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <button className="task-card" onClick={onClick}>
      <h3 className="task-title">
        {task.title}
      </h3>
      
      <div className="badge-container">
        <Badge variant={task.priority}>
          <AlertCircle size={14} className="icon" />
          {task.priority}
        </Badge>
        
        <Badge variant="default">
          <User size={14} className="icon" />
          {task.assignee}
        </Badge>
        
        <Badge variant="default">
          <Calendar size={14} className="icon" />
          {task.dueDate}
        </Badge>
        
        <Badge variant="category">
          {task.category}
        </Badge>
      </div>
    </button>
  );
};