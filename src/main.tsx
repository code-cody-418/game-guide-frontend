import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavRouter } from './Navigation/NavRouter.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavRouter />
  </StrictMode>,
)
