import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './Main Page/App'
import TaskPage from './TaskPage/TaskPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/TaskPage" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)