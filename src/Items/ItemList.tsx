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
import "./item.css"

export const ItemList = () => {
  const [searchString, setSearchString] = useState("")
  const [pagination, setPagination] = useState(0)
  const [itemLimit] = useState(10)
  const [sortCol, setSortCol] = useState("item_name")
  const [sortOrder, setSortOrder] = useState("ASC")

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
    pageOffset: pagination,
    sortCol,
    sortOrder
  })

  let content: React.ReactNode
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess && wowItems) {
    content =
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th
              onClick={() => handleColSort("item_name")}
              className="table-header-sort">
              Name
              {
                sortCol === "item_name" ? <SortArrow sortOrder={sortOrder} /> : null
              }
            </th>
            <th
              onClick={() => handleColSort("item_level")}
              className="table-header-sort">
              Level
              {
                sortCol === "item_level" ? <SortArrow sortOrder={sortOrder} /> : null
              }
            </th>
            <th>Quality</th>
            <th>Subclass</th>
            <th
              onClick={() => handleColSort("sell_price")}
              className="table-header-sort">
              Sell Price
              {
                sortCol === "sell_price" ? <SortArrow sortOrder={sortOrder} /> : null
              }
            </th>
          </tr>
        </thead>
        <tbody>
          {wowItems.body.map((item: WowItemI) => (
            <ItemRow key={item.item_id} item={item} />
          ))}
        </tbody>
      </Table>
  } else if (isError) {
    console.error(error)
    content = <div>Error. Please try again later.</div>
  }

  const handleColSort = (col: string) => {
    setSortCol(col)
    setSortOrder(() => {
      let order = sortOrder
      if (sortOrder === "ASC") {
        order = "DESC"
      } else if (sortOrder === "DESC") {
        order = "ASC"
      }
      return order
    })
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
        <td>{item.item_level}</td>
        <td>{item.quality}</td>
        <td>{item.item_subclass}</td>
        <td>{item.sell_price}</td>
      </tr >
    </>
  )
}

const SortArrow = ({ sortOrder }: { sortOrder: string }) => {
  if (sortOrder === "ASC") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
      </svg>
    )
  } else if (sortOrder === "DESC") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
      </svg>
    )
  } else return null
}