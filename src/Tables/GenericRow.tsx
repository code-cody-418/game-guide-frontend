import { NavLink } from "react-router"
import type { GenericHeaderI } from "./WowQuery.interface.ts"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GenericRow = ({ data, tableHeaders }: { data: any, tableHeaders: Array<GenericHeaderI> }) => {
  return (
    <>
      <tr>
        {
          tableHeaders.map((header: GenericHeaderI, i) => (
            <td key={i} className={header?.rowStyling}>
              <RowContent header={header} data={data} />
            </td>
          ))}
      </tr >
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RowContent = ({ header, data }: { header: GenericHeaderI, data: any }) => {
  let mediaUrl: string | undefined = undefined
  if (header.isImg && data[header.dataPropertyName] !== null) {
    mediaUrl = `https://render.worldofwarcraft.com${data[header.dataPropertyName]}`
  }

  let content
  if (header.isImg === true) {
    content = <img className="item-list-image" src={mediaUrl} alt="No Image Available" />
  } else if (header.isNav && header.navLink && header.navLinkId) {
    content = <NavLink to={header.navLink + data[header.navLinkId]}>
      {data[header.dataPropertyName]}
    </NavLink>
  } else {
    content = data[header.dataPropertyName]
  }

  return (
    <>
      {content}
    </>
  )
}