import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { GenericTable } from "../Tables/GenericTable.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetQuery } from "../Tables/genericTableQuerySlice.ts";
import type { RootState } from "../store/store.ts";
import { useGetWowMountsQuery } from "../api/apiSlice.ts";

export const MountList = () => {
  const searchString = useSelector((state: RootState) => state.genericTableQuery.search)
  const pagination = useSelector((state: RootState) => state.genericTableQuery.pageOffset)
  const itemLimit = useSelector((state: RootState) => state.genericTableQuery.itemLimit)
  const sortCol = useSelector((state: RootState) => state.genericTableQuery.sortCol)
  const sortOrder = useSelector((state: RootState) => state.genericTableQuery.sortOrder)
  const validSortCols = ["mount_name"]

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetQuery("mount_name"))
  }, [dispatch])

  const { data: wowMounts = {
    code: null,
    message: '',
    body: [],
  },
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetWowMountsQuery({
    search: searchString,
    itemLimit: itemLimit,
    pageOffset: pagination,
    sortCol: validSortCols.includes(sortCol) ? sortCol : "mount_name",
    sortOrder
  })

  const tableHeaders = [
    {
      readableHeader: "ID",
      sortCol: "",
      isSortable: false,
      dataPropertyName: "mount_id"
    },
    {
      readableHeader: "Name",
      sortCol: "",
      isSortable: false,
      dataPropertyName: "mount_name"
    },
  ]
  return (
    <>
      <Container>
        <Row>
          <h1>Mount List Page</h1>
        </Row>
        <GenericTable
          data={wowMounts}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          tableHeaders={tableHeaders}
        />
      </Container>
    </>
  )
}