//@ts-nocheck
import { useMemo, useState, Dispatch, SetStateAction } from "react"
import Icons from "../../assets/images"
import { useTable, useSortBy } from "react-table"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../../app/hooks"
import { setCurrentEditElementLink } from "../../counter/elementLinkSlice"
import { useDeleteSingleElementLinkMutation } from "../../counter/apiSlice"
import AlertModal from "../components/AlertModal/AlertMotal"
import SuccessModal from "../components/SuccessModal/SuccessModal"
import ConfirmModal from "../components/ConfirmModal/ConfirmModal"
import useDataLookup from "../../hooks/useDataLookup"
import { DataItem } from "../../hooks/useDataLookup"
import { ElementLink } from "../../../types"
// import { useFetchDepartmentsQuery } from "../../counter/apiSlice"

interface ElementsTableProps {
  suborganizationsData: DataItem[]
  setFormType: Dispatch<SetStateAction<"ADD" | "EDIT">>
  setShowElementModal: boolean
  elementLinks: ElementLink[]
  isTableSuccess: boolean
  employeeCategoryData: DataItem[]
}

const ElementLinkTable = ({
  setFormType,
  setShowElementModal,
  elementLinks,
  isTableSuccess,
  viewLinkDetails,
  suborganizationsData,
  employeeCategoryData,
}: //   getElementCategory,
ElementsTableProps) => {
  const dispatch = useAppDispatch()
  const [deleteElementLink, isSuccess] = useDeleteSingleElementLinkMutation()
  //   const [departmentData, setDepartmentData] = useState({})
  const [confirmModal, setConfirmModal] = useState(false)
  const [alertModal, setAlertModal] = useState(false)
  const [selectedElementLinkId, setSelectedElementLinkId] = useState("")
  const { id } = useParams() as { id: string }
  const { getDataName: getsuborganizations } =
    useDataLookup(suborganizationsData)

  //   console.log(suborganizationsData)
  //   console.log(useDataLookup(suborganizationsData))
  const { getDataName: getElementCategory } =
    useDataLookup(employeeCategoryData)

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Sub-Organization",
        accessor: "suborganizationId",
        Cell: ({ row }) => (
          <span className={`username ${row.original.status}`}>
            {isTableSuccess
              ? getsuborganizations(row.original.suborganizationId)
              : ""}
          </span>
        ),
      },
      {
        Header: "Department",
        accessor: "departmentId",
      },
      {
        Header: "Employee Category",
        accessor: "employeeCategoryId",
        Cell: ({ row }) => (
          <span className={`username ${row.original.status}`}>
            {isTableSuccess
              ? getElementCategory(row.original.employeeCategoryId)
              : ""}
          </span>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Details",
        // accessor: "id",
        Cell: ({ row }) => (
          <span
            role="button"
            className="modaldetails"
            onClick={() => viewLinkDetails(row.original.id)}
          >
            View Details
          </span>
        ),
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="elementLinkAction">
            <img
              src={Icons["Edit"]}
              alt=""
              onClick={() => {
                setFormType("EDIT")
                setShowElementModal(true)
                dispatch(setCurrentEditElementLink(row.original))
              }}
            />

            <img
              src={Icons["Delete"]}
              alt=""
              onClick={() => {
                setConfirmModal(true)
                setSelectedElementLinkId(row.original.id)
              }}
            />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const data = useMemo(() => elementLinks, [elementLinks])
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
                  <span style={{ marginLeft: "8px" }}>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <img src={Icons["Filter"]} alt="" />
                      ) : (
                        <img src={Icons["Filter"]} alt="" />
                      )
                    ) : (
                      <img src={Icons["Filter"]} alt="" />
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
      {alertModal && (
        <AlertModal>
          <SuccessModal
            text="Element Deleted successfully"
            closeSuccessModal={() => {
              setAlertModal(false)
            }}
          />
        </AlertModal>
      )}
      {confirmModal && (
        <AlertModal>
          <ConfirmModal
            text="Are you sure you want to 
          delete this Element Link?"
            closeConfirmModal={() => {
              setConfirmModal(false)
            }}
            triggerNextModal={() => {
              setConfirmModal(false)
              deleteElementLink({
                id: selectedElementLinkId,
                elementId: id,
              })
              if (isSuccess) {
                setAlertModal(true)
              }
            }}
          />
        </AlertModal>
      )}
    </div>
  )
}

export default ElementLinkTable
