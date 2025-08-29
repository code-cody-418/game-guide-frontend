import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import { useParams } from "react-router"
import { useGetWowItemQuery } from "../api/apiSlice"
import { useEffect, useState } from "react"
import type { WowItemI } from "./WowItem.interface"

export const ItemDetail = () => {
  const params = useParams()
  const itemId = String(params.itemId)
  const [item, setItem] = useState<WowItemI>()
  const [mediaUrl, setMediaUrl] = useState<string>()

  const { data: wowItem = {
    code: null,
    message: '',
    body: []
  } } = useGetWowItemQuery(itemId)

  useEffect(() => {
    if (wowItem.body?.[0]) {
      setItem(wowItem.body?.[0])
    }
  }, [wowItem])

  useEffect(() => {
    if (item?.media_value && item?.media_value !== null) {
      setMediaUrl(`https://render.worldofwarcraft.com${item?.media_value}`)
    }
  }, [item])

  return (
    <>
      <Container>
        <Row>
          <h1>Item Detail</h1>
        </Row>
        <Row>
          <Col>
            Item Id: {item?.item_id}
          </Col>
          <Col>
            <img src={mediaUrl} alt="No Image Available" />
          </Col>
          <Col>
            Item Name: {item?.item_name}
          </Col>
        </Row>
        <Row>
          <Col>
            Inventory Type: {item?.inventory_type}
          </Col>
          <Col>
            Purchase Price: {item?.purchase_price}
          </Col>
          <Col>
            Quality: {item?.quality}
          </Col>
        </Row>
        <Row>
          <Col>
            Item Class: {item?.item_class}
          </Col>
          <Col>
            Sell Price: {item?.sell_price}
          </Col>
          <Col>
            Item Level: {item?.item_level}
          </Col>
        </Row>
      </Container>
    </>
  )
}