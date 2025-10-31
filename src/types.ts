export interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  category: string;
}