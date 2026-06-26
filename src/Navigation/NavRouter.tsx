import { BrowserRouter, Route, Routes } from "react-router"
import { App } from "../App"
import { Home } from "../Home/Home"
import { ItemDetail } from "../Items/ItemDetail"
import { ItemList } from "../Items/ItemList.tsx"
import { MountList } from "../Mounts/MountList.tsx"
import { MountDetail } from "../Mounts/MountDetail.tsx"
import { Guides } from "../Guides/Guides.tsx"
import { News } from "../News/News.tsx"
import { Databases } from "../Databases/Databases.tsx"
import { Category } from "../Databases/Category.tsx"
import { SubCategory } from "../Databases/SubCategory.tsx"

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
            <Route path='/guides' element={<Guides />} />
            <Route path='/databases' element={<Databases />} />
            <Route path='/news' element={<News />} />
            <Route path='/:game/database' element={<Category />} />
            <Route path='/:game/database/:category' element={<SubCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}