import { Outlet } from 'react-router'
import { NavigationBar } from './Navigation/NavigationBar'

export const Navigation = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}