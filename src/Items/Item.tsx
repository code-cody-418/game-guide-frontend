import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { useParams } from "react-router"

export const Item = () => {
  const params = useParams()
  console.log(params)
  return (
    <>
      <Container>
        <Row>
          <h1>Item Page</h1>
        </Row>
        <Row>
          <Col>
            Item Id: {params.itemId}
          </Col>
        </Row>
      </Container>
    </>
  )
}