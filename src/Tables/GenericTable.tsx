import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import "./generic-table.css"
import { GenericRow } from "./GenericRow.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";
import { setPageOffSet, setSearch, setSortCol, setSortOrder } from "./genericTableQuerySlice.ts";
import type { GenericHeaderI, GenericTableParamsI } from "./WowQuery.interface.ts";

export const GenericTable = ({ data, isLoading, isSuccess, isError, error, tableHeaders }: GenericTableParamsI) => {
  const pagination = useSelector((state: RootState) => state.genericTableQuery.pageOffset)
  const itemLimit = useSelector((state: RootState) => state.genericTableQuery.itemLimit)

  const dispatch = useDispatch()

  let content: React.ReactNode
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess && data) {
    content =
      <Table striped>
        <thead>
          <tr>
            {
              tableHeaders.map((header: GenericHeaderI, i: number) => (
                <GenericTableHeader key={i} header={header} />
              ))}
          </tr>
        </thead>
        <tbody>
          {data.body.map((data: unknown, i: number) => (
            <GenericRow key={i} data={data} tableHeaders={tableHeaders} />
          ))}
        </tbody>
      </Table>
  } else if (isError) {
    console.error(error)
    content = <div>Error. Please try again later.</div>
  }
  return (
    <>
      <Row>
        <Form.Label>Item Search</Form.Label>
        <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setSearch(e.target?.value))
          dispatch(setPageOffSet(0))
        }
        } type="search" placeholder="Search Item" />
      </Row>
      <Row>
        {content}
      </Row>
      <Row>
        <Col>
          {
            pagination > 0 ? <Button onClick={() => dispatch(setPageOffSet(pagination - itemLimit))}>Previous</Button> : null
          }
        </Col>
        <Col>
          {
            data.body?.length > 0 ? <Button onClick={() => dispatch(setPageOffSet(pagination + itemLimit))}>Next</Button> : null
          }
        </Col>
      </Row>
    </>
  )
}

const GenericTableHeader = ({ header }: { header: GenericHeaderI }) => {
  const dispatch = useDispatch()
  const sortCol = useSelector((state: RootState) => state.genericTableQuery.sortCol)
  const sortOrder = useSelector((state: RootState) => state.genericTableQuery.sortOrder)

  const handleColSort = (col: string) => {
    dispatch(setSortCol(col))
    let order = sortOrder
    if (sortOrder === "ASC") {
      order = "DESC"
    } else if (sortOrder === "DESC") {
      order = "ASC"
    }
    dispatch(setSortOrder(order))
  }
  return (
    <>
      <th
        onClick={header.isSortable ? () => handleColSort(header.sortCol) : () => null}
        className={header.isSortable ? "table-header-sort" : ""}
      >
        {header.readableHeader}
        {
          sortCol === header.sortCol ? <SortArrow sortOrder={sortOrder} /> : null
        }
      </th>

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