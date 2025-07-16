import { BrowserRouter, Route, Routes } from "react-router"
import { App } from "../App"
import { Home } from "../Home/Home"
import { ItemList } from "../Items/ItemList"
import { Item } from "../Items/Item"

export const NavRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='/item-list' element={<ItemList />} />
            <Route path='/item/:itemId' element={<Item />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}