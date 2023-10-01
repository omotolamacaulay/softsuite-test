import { Dispatch, SetStateAction, useMemo } from "react"
import { useTable, useSortBy } from "react-table"
import { Link } from "react-router-dom"
import Icons from "../../../assets/images"
import "./ElementsTable.scss"
import { Element } from "../../../../types"
import HamburgerButton from "../hamburger/Hamburger"

interface ElementProps {
  name: string
  categoryValueId: number
  classificationValueId: number
  elementClassification: string
  effectiveEndDate: string
  modifiedBy: string
  status: string
  effectiveStartDate: string
}

interface ElementsTableProps {
  elements: Element[]
  setShowModal: Dispatch<SetStateAction<boolean>>
  setFormType: Dispatch<SetStateAction<"ADD" | "EDIT">>
}

const ElementsTable: React.FC<ElementsTableProps> = ({
  elements,
  setShowModal,
  setFormType,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <span className={`username ${row.original.status}`}>
            <Link to={`/elements/${row.original.id}`}>{row.original.name}</Link>
            <span className={`status-span mobile ${row.original.status}`}>
              {row.original.status}
            </span>
          </span>
        ),
      },
      {
        Header: "Element Category",
        accessor: "categoryValueId",
      },
      {
        Header: "Element Classification",
        accessor: "classificationValueId",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }) => (
          <span className={`status-span ${cell.row.original.status}`}>
            {cell.value}
          </span>
        ),
      },
      {
        Header: "Date & Time Modified",
        accessor: "effectiveStartDate",
        Cell: ({ row }) => (
          <span className="date">
            {row.original.effectiveStartDate} || {row.original.effectiveEndDate}
          </span>
        ),
      },
      {
        Header: "Modified By",
        accessor: "modifiedBy",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <span className="action">
            <HamburgerButton
              user={row.original}
              setShowModal={setShowModal}
              setFormType={setFormType}
            />
          </span>
        ),
      },
    ],
    [],
  )

  const data = useMemo(() => elements, [elements])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
    )

  return (
    <div className="users__tabBody">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <img src={Icons["Filter"]} alt="" />
                      ) : (
                        <img src={Icons["Filter"]} alt="" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ElementsTable
