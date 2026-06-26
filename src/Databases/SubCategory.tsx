import Container from "react-bootstrap/Container";
import { useParams } from "react-router";

export const SubCategory = () => {
  const params = useParams()
  const subCategoryName = params.category

  return (
    <Container>
      <h1>SubCategory</h1>
      <h2>{subCategoryName}</h2>
    </Container>
  )
}