import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Meet } from './components/Meet.tsx'

createRoot(document.getElementById('root')!).render(
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/meet" element={<Meet />} />
    </Routes>
  </BrowserRouter>
)
