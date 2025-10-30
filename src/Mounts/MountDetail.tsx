import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useGetWowMountQuery } from "../api/apiSlice.ts"
import type { WowMountI } from "./WowMount.interface.ts"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import "./mount.css"

export const MountDetail = () => {
  const params = useParams()
  const mountId = String(params.mountId)
  const [mount, setMount] = useState<WowMountI>()
  const [mediaUrl, setMediaUrl] = useState<string>()

  const { data: wowMount = {
    code: null,
    message: '',
    body: []
  }, isLoading, isSuccess, isError, error } = useGetWowMountQuery(mountId)

  useEffect(() => {
    if (wowMount.body?.[0]) {
      setMount(wowMount.body?.[0])
    }
  }, [wowMount])

  useEffect(() => {
    if (mount?.creature_display_id && mount?.creature_display_id !== null) {
      setMediaUrl(`https://render.worldofwarcraft.com/us/npcs/zoom/creature-display-${mount?.creature_display_id}.jpg`)
    }
  }, [mount])

  let content: React.ReactNode

  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess && mount) {
    content =
      <>
        <Row>
          <Col>Mount Id: {mount?.mount_id}</Col>
          <Col>Mount Name: {mount?.mount_name}</Col>
        </Row>
        <Row>
          <Col>
            <Image className="mount-img-container" src={mediaUrl} alt="No Image Available" fluid />
          </Col>
        </Row>
        <Row>
          <Col>Description: {mount?.description}</Col>
          <Col>Source Name: {mount.source_name}</Col>
          <Col>Faction Name: {mount.faction_name}</Col>
        </Row>
        <Row>
          <Col>Requirements: {JSON.stringify(mount.requirements)}</Col>
        </Row>
      </>
  } else if (isError) {
    console.error(error)
    content = <div>Error. Please try again later.</div>
  }


  return (
    <>
      <Container>
        <Row>
          <h1>Mount Detail</h1>
        </Row>
        {content}
      </Container>
    </>
  )
}