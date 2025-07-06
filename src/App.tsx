import './App.css'
import { Outlet } from 'react-router'
import { NavigationBar } from './Navigation/NavigationBar'

export const App = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}