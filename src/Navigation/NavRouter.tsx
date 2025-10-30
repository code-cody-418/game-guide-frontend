import { BrowserRouter, Route, Routes } from "react-router"
import { App } from "../App"
import { Home } from "../Home/Home"
import { ItemDetail } from "../Items/ItemDetail"
import { ItemList } from "../Items/ItemList.tsx"
import { MountList } from "../Mounts/MountList.tsx"
import { MountDetail } from "../Mounts/MountDetail.tsx"

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
            <Route path='/mount/:mountId' element={<MountDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}