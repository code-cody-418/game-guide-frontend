import Container from "react-bootstrap/Container";
import { databaseData } from "./database-data.ts";
import { NavLink } from "react-router";

export const Databases = () => {
  return (
    <Container className="vh-100">
      <h1>Databases</h1>

      <ul>
        {databaseData.map((database) => (
          <li>
            <NavLink to={`${database.title}/database`}>
              {database.title}
            </NavLink></li>
        ))}
      </ul>
    </Container>
  )
}