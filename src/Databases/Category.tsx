import Container from "react-bootstrap/Container"
import { NavLink, useParams } from "react-router"

export const Category = () => {
  const params = useParams()
  const gameTitle = String(params.game)

  return (
    <Container>
      <h1>Category</h1>
      <ul>
        <li><NavLink to={`/${gameTitle}/database/items`}>
          Items
        </NavLink></li>
        <li><NavLink to={`/${gameTitle}/database/mounts`}>
          Mounts
        </NavLink></li>
      </ul>
    </Container >
  )
}