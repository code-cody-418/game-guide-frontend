import axios from "axios"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import { type WowItem } from "./WowItem.interface";
import { NavLink } from "react-router";

const ItemRow = ({ item }: { item: WowItem }) => {
  return (
    <>

      <tr>
        <td>{item.item_id}</td>
        <td><img src={item.media_value} alt={item.item_name} /></td>
        <td>
          <NavLink to={`/item/${item.item_id}`}>
            {item.item_name}
          </NavLink>
        </td>
      </tr >
    </>
  )
}

export const ItemList = () => {
  const [itemData, setItemData] = useState([])
  const [searchString, setSearchString] = useState("")
  const [pagination, setPagination] = useState(0)
  const [itemLimit] = useState(10)



  useEffect(() => {
    const getItemData = async () => {
      try {
        const response = await axios.get("http://localhost:4202/wow/get-wow-items/", {
          params: {
            search: searchString,
            itemLimit: itemLimit,
            pageOffset: pagination
          }
        })
        setItemData(response.data?.body)
      } catch (error) {
        console.error(error)
      }
    }
    getItemData()
  }, [searchString, itemLimit, pagination])

  return (
    <>
      <Container>
        <Row>
          <h1>Item List Page</h1>
        </Row>
        <Row>
          <Form.Label>Item Search</Form.Label>
          <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(e.target?.value)
            setPagination(0)
          }
          } type="search" placeholder="Search Item" />
        </Row>
        <Row>
          <Table striped>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Image</th>
                <th>Item Name</th>
              </tr>
            </thead>
            <tbody>
              {
                itemData ?
                  itemData.map((item: WowItem) => (
                    <ItemRow key={item.item_id} item={item} />
                  ))
                  : null
              }
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col>
            {
              pagination > 0 ? <Button onClick={() => setPagination(pagination - itemLimit)}>Previous</Button> : null
            }
          </Col>
          <Col>
            {
              itemData?.length > 0 ? <Button onClick={() => setPagination(pagination + itemLimit)}>Next</Button> : null
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}