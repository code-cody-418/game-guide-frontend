import Container from "react-bootstrap/Container";
import { databaseData } from "./database-data.ts";

export const Databases = () => {
  return (
    <Container className="vh-100">
      <h1>Databases</h1>

      {databaseData.map((database) => (
        <li>{database.title}</li>
      ))}
    </Container>
  )
}