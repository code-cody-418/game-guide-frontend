import { useState } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import { type WowItemI } from "./WowItem.interface";
import { NavLink } from "react-router";
import { useGetWowItemsQuery } from "../api/apiSlice";

export const ItemList = () => {
  const [searchString, setSearchString] = useState("")
  const [pagination, setPagination] = useState(0)
  const [itemLimit] = useState(10)

  const { data: wowItems = {
    code: null,
    message: '',
    body: [],
  },
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetWowItemsQuery({
    search: searchString,
    itemLimit: itemLimit,
    pageOffset: pagination
  })

  let content: React.ReactNode
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess && wowItems) {
    content =
      <Table striped>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Image</th>
            <th>Item Name</th>
          </tr>
        </thead>
        <tbody>
          {wowItems.body.map((item: WowItemI) => (
            <ItemRow key={item.item_id} item={item} />
          ))}
        </tbody>
      </Table>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

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
          {content}
        </Row>
        <Row>
          <Col>
            {
              pagination > 0 ? <Button onClick={() => setPagination(pagination - itemLimit)}>Previous</Button> : null
            }
          </Col>
          <Col>
            {
              wowItems.body?.length > 0 ? <Button onClick={() => setPagination(pagination + itemLimit)}>Next</Button> : null
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}

const ItemRow = ({ item }: { item: WowItemI }) => {
  let mediaUrl: string | undefined = undefined
  if (item?.media_value && item?.media_value !== null) {
    mediaUrl = `https://render.worldofwarcraft.com${item?.media_value}`
  }
  return (
    <>
      <tr>
        <td>{item.item_id}</td>
        <td><img src={mediaUrl} alt="No Image Available" /></td>
        <td>
          <NavLink to={`/item/${item.item_id}`}>
            {item.item_name}
          </NavLink>
        </td>
      </tr >
    </>
  )
}