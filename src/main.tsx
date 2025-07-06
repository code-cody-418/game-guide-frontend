import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './Home/Home.tsx'
import { ItemList } from './Items/ItemList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='/item-list' element={<ItemList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
