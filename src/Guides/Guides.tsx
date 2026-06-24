import Container from "react-bootstrap/Container";
import { guideData } from "./guide-data.ts";

export const Guides = () => {
  return (
    <Container className="vh-100">
      <h1>Guides</h1>

      <ul>
        {guideData.map((guide) => (
          <li>{guide.title}</li>
        ))}
      </ul>
    </Container>
  )
}