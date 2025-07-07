import axios from "axios"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import { type WowItem } from "./WowItem.interface";

const Item = ({ item }: { item: WowItem }) => {
  return (
    <>
      <tr>
        <td>{item.item_id}</td>
        <td>{item.item_name}</td>
      </tr>
    </>
  )
}

export const ItemList = () => {
  const [itemData, setItemData] = useState([])
  const [pagination, setPagination] = useState(0)

  const getItemData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axios.get("http://localhost:4202/wow/get-wow-items/", {
        params: {
          search: e.target.value
        }
      })
      setItemData(response.data.body)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(itemData)
  }, [itemData])

  useEffect(() => {
    console.log(pagination)
  }, [pagination])

  return (
    <>
      <Container>
        <Row>
          <h1>Item List Page</h1>
        </Row>
        <Row>
          <Form.Label>Item Search</Form.Label>
          <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => getItemData(e)} type="search" placeholder="Search Item" />
        </Row>
        <Row>
          <Table striped>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
              </tr>
            </thead>
            <tbody>
              {
                itemData ?
                  itemData.slice(pagination, pagination + 5).map((item: WowItem) => (
                    <Item key={item.item_id} item={item} />
                  ))
                  : null
              }
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col>
            {
              pagination > 0 ? <Button onClick={() => setPagination(pagination - 5)}>Previous</Button> : null
            }
          </Col>
          <Col>
            {
              itemData?.length > 0 ? <Button onClick={() => setPagination(pagination + 5)}>Next</Button> : null
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}