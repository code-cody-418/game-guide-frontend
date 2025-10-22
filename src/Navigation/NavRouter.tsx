import { BrowserRouter, Route, Routes } from "react-router"
import { App } from "../App"
import { Home } from "../Home/Home"
import { ItemDetail } from "../Items/ItemDetail"
import { ItemList } from "../Items/ItemList.tsx"
import { MountList } from "../Mounts/MountList.tsx"

export const NavRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='/item-list' element={<ItemList />} />
            <Route path='/item/:itemId' element={<ItemDetail />} />
            <Route path='/mount-list' element={<MountList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}