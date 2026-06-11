import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ToDoForm from './Components/ToDoForm.jsx'
import EditToDoForm from './Components/EditToDoForm.jsx' 
import './index.css'
import App from './App.jsx'

import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<ToDoForm />} />
        <Route path="/edit/:id" element={<EditToDoForm />} />
       </Routes>
    </BrowserRouter>
   
  </StrictMode>,
)
