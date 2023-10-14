//@ts-nocheck
import "./Element.scss"
import { useParams, Link } from "react-router-dom"
import { useMemo, useEffect, useState, ChangeEvent } from "react"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import {
  fetchElementLink,
  setCurrentEditElementLink,
  deleteSingleElementLink,
} from "../../counter/elementLinkSlice"
import { ElementLink } from "../../../types"
import Icons from "../../assets/images"
import { useTable, useSortBy } from "react-table"
import ElementLinkForm from "../components/elementLinkFormPage/ElementLinkForm"
import EditElementLinkForm from "../components/EditElementLinkForm/EditElementLinkForm"
import "../components/table/ElementsTable.scss"
import ReactPaginate from "react-paginate"
import ElementLinkModal from "../components/ElementLinkModal/ElementLinkModal"
import SideModal from "../components/sideModal/SideModal"
import Spinner from "../components/spinner/Spinner"
import useDataLookup from "../../hooks/useDataLookup"
import {
  useFetchSingleElementQuery,
  useFetchPayrunQuery,
  useFetchElementCategoryQuery,
  useFetchElementClassificationQuery,
  useFetchSuborganizationsQuery,
  useFetchJobTitleQuery,
  useFetchLocationQuery,
  useFetchEmployeeTypeQuery,
  useFetchEmployeeCategoryQuery,
  useFetchGradesQuery,
  useFetchUnionQuery,
  useFetchHousingQuery,
  useFetchWardrobeQuery,
  useFetchSecurityQuery,
} from "../../counter/apiSlice"

const ElementDetail = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [showSideModal, setShowSideModal] = useState<boolean>(false)
  const [showElementModal, setShowElementModal] = useState<boolean>(false)
  const [formType, setFormType] = useState<"ADD" | "EDIT">("EDIT")
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentLinkDetails, setCurrentLinkDetails] = useState<ElementLink>()
  const dispatch = useAppDispatch()
  const { id } = useParams() as { id: string }
  const elementLinks = useAppSelector(
    (state) => state.elementlinks.elementLinks,
  )
  const { data: payrunData } = useFetchPayrunQuery()
  const { data: elementCategoryData } = useFetchElementCategoryQuery()
  const { data: elementClassificationData } =
    useFetchElementClassificationQuery()
  const { data: suborganizationsData } = useFetchSuborganizationsQuery()
  const { data: jobTitleData } = useFetchJobTitleQuery()
  const { data: locationData } = useFetchLocationQuery()
  const { data: employeeTypeData } = useFetchEmployeeTypeQuery()
  const { data: employeeCategoryData } = useFetchEmployeeCategoryQuery()
  const { data: gradeData } = useFetchGradesQuery()
  const { data: unionData } = useFetchUnionQuery()
  const { data: housingData } = useFetchHousingQuery()
  const { data: wardrobeData } = useFetchWardrobeQuery()

  const { data: securityData } = useFetchSecurityQuery()
  const {
    data: singleElement,
    isLoading,
    isSuccess,
  } = useFetchSingleElementQuery(id)

  useEffect(() => {
    dispatch(fetchElementLink(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const viewLinkDetails = (id: any) => {
    const index = elementLinks.findIndex((link) => link.id === id)
    setCurrentLinkDetails(elementLinks[index])
    setShowSideModal(true)
  }
  const { getDataName: getCategoryName } = useDataLookup(elementCategoryData)
  const { getDataName: getClassificationData } = useDataLookup(
    elementClassificationData,
  )
  const { getDataName: getPayrun } = useDataLookup(payrunData)
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Sub-Organization",
        accessor: "suborganizationId",
      },
      {
        Header: "Department",
        accessor: "departmentId",
      },
      {
        Header: "Employee Category",
        accessor: "employeeCategoryId",
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
                dispatch(
                  deleteSingleElementLink({
                    id: row.original.id,
                    elementId: row.original.elementId,
                  }),
                )
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
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }
  useEffect(() => {
    // const endOffset = itemOffset + itemsPerPage
    setPageCount(Math.ceil(elementLinks.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, elementLinks])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % elementLinks.length
    setItemOffset(newOffset)
  }

  const selectPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.currentTarget.value)
  }

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }
  return (
    <div className="elements">
      <div className="element">
        <div className="page__header">
          <div className="element__back">
            <Link to="/">
              <img src={Icons["Back"]} alt="SVG logo" />
            </Link>
          </div>
          <h2>Element Details</h2>
          {isSuccess && (
            <div className="element__detail">
              <div className="single__detail">
                <p className="element__label">Element Name</p>
                <p className="element__text">{singleElement?.data?.name}</p>
              </div>
              <div className="single__detail">
                <p className="element__label">Element Classification</p>
                <p className="element__text">
                  {getClassificationData(singleElement?.data?.classificationId)}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label">ELEMENT category</p>
                <p className="element__text">
                  {getCategoryName(singleElement?.data?.categoryValueId)}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label">payrun</p>
                <p className="element__text">
                  {getPayrun(singleElement?.data?.payRunId)}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label">Effective Start Date</p>
                <p className="element__text">
                  {singleElement?.data?.effectiveStartDate}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label">Effective END Date</p>
                <p className="element__text">
                  {singleElement?.data?.effectiveEndDate}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label">PROCESSING TYPE</p>
                <p className="element__text">
                  {singleElement?.data?.processingType === "1"
                    ? "Open"
                    : singleElement?.data?.processingType === "2"
                    ? "Closed"
                    : ""}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label">PAY frequency</p>
                <p className="element__text">
                  {singleElement?.data?.payFrequency === "1"
                    ? "Monthly"
                    : singleElement?.data?.payFrequency === "2"
                    ? "Selected Months"
                    : ""}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label">Pay Months</p>
                <p className="element__text">
                  {singleElement?.data?.selectedMonths}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label">Prorate</p>
                <p className="element__text">
                  {singleElement?.data?.prorate === "1"
                    ? "Yes"
                    : singleElement?.data?.prorate === "2"
                    ? "No"
                    : ""}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label">Status</p>
                <p className="element__text">
                  {singleElement?.data?.status === true ||
                  singleElement?.data?.status === "active" ||
                  singleElement?.data?.status === "Active"
                    ? "Active"
                    : singleElement?.data?.status === false ||
                      singleElement?.data?.status === "inactive" ||
                      singleElement?.data?.status === "Inactive" ||
                      singleElement?.data?.status === ""
                    ? "Inactive"
                    : "Unknown"}
                </p>
              </div>
              <div className="single__detail">
                <p className="element__label" style={{ display: "none" }}>
                  Prorate
                </p>
                <p className="element__text" style={{ display: "none" }}>
                  Yes
                </p>
              </div>
            </div>
          )}
        </div>
        <h2 className="links__header">Elements Links</h2>
        <div className="searchGroup" style={{ marginBottom: "24px" }}>
          <div className="searchArea">
            <div className="elements__search">
              <div className="elements__search-group">
                <input
                  type="search"
                  className="form-input"
                  placeholder="Search for element links"
                />
                <span className="icon">
                  <img src={Icons["Search"]} alt="SVG logo" />
                </span>
              </div>
            </div>
          </div>
          <button
            className="add-btn"
            onClick={() => {
              setShowElementModal(true)
              setFormType("ADD")
            }}
          >
            Create Element Link
            <img src={Icons["Plus"]} alt="SVG logo" />
          </button>
          {showElementModal ? (
            <ElementLinkModal>
              {formType === "ADD" ? (
                <ElementLinkForm
                  setShowElementModal={setShowElementModal}
                  suborganizationsData={suborganizationsData.data}
                  jobTitleData={jobTitleData}
                  locationData={locationData}
                  employeeTypeData={employeeTypeData}
                  employeeCategoryData={employeeCategoryData}
                  gradeData={gradeData.data}
                  unionData={unionData}
                  housingData={housingData}
                  wardrobeData={wardrobeData}
                  securityData={securityData}
                />
              ) : (
                <EditElementLinkForm
                  setShowElementModal={setShowElementModal}
                  suborganizationsData={suborganizationsData.data}
                  jobTitleData={jobTitleData}
                  locationData={locationData}
                  employeeTypeData={employeeTypeData}
                  employeeCategoryData={employeeCategoryData}
                  gradeData={gradeData.data}
                  unionData={unionData}
                  housingData={housingData}
                  wardrobeData={wardrobeData}
                  securityData={securityData}
                />
              )}
            </ElementLinkModal>
          ) : null}
        </div>
        <div className="users__tabBody" onClick={() => setIsFormOpen(false)}>
          <div className="mobile-header">
            <p>Elements</p>
            <span
              role="button"
              className="open-filter"
              onClick={(e) => {
                e.stopPropagation()
                toggleForm()
              }}
            >
              <img src={Icons["Filter"]} alt="" />
            </span>
          </div>
          <div className="users__tabBody">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                      >
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
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {showSideModal ? (
            <SideModal>
              <div className="elementLinkDetails">
                <div className="page__header" style={{ padding: "32px" }}>
                  <button
                    // type="button"
                    className="closeElementLink"
                    onClick={() => setShowSideModal(false)}
                  >
                    <img src={Icons["CloseModal"]} alt="" />
                  </button>
                  <h2>Element Detail</h2>
                  <div className="element__detail">
                    <div className="single__detail">
                      <p className="element__label">NAME</p>
                      <p className="element__text">
                        {currentLinkDetails?.name}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">sub organization</p>
                      <p className="elementLinkDetails__text">
                        {currentLinkDetails?.suborganizationId}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Department</p>
                      <p className="element__text">
                        {currentLinkDetails?.departmentId}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Location</p>
                      <p className="element__text">
                        {currentLinkDetails?.locationId}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Employee Type</p>
                      <p className="element__text">
                        {currentLinkDetails?.employeeTypeId}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Employee Category</p>
                      <p className="element__text">
                        {currentLinkDetails?.employeeCategoryId}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Effective Date</p>
                      <p className="element__text">
                        {currentLinkDetails?.effectiveStartDate}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Status</p>
                      <p className="element__text">
                        {currentLinkDetails?.status}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">GRADE</p>
                      <p className="element__text">
                        {currentLinkDetails?.grade}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Grade Step</p>
                      <p className="element__text">
                        {currentLinkDetails?.gradeStep}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Amount Type</p>
                      <p className="element__text">
                        {currentLinkDetails?.amountType}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Amount</p>
                      <p className="element__text">
                        NGN {currentLinkDetails?.amount}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">PENSION</p>
                      <p className="element__text">p</p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Housing</p>
                      <p className="element__text">Yes</p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Effective Start Date</p>
                      <p className="element__text">
                        {currentLinkDetails?.effectiveStartDate}
                      </p>
                    </div>
                    <div className="single__detail">
                      <p className="element__label">Effective End Date</p>
                      <p className="element__text">
                        {currentLinkDetails?.effectiveEndDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SideModal>
          ) : null}
          <div className="pagination_wrapper">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item prev"
              previousLinkClassName="page-link"
              nextClassName="page-item next"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />

            {elementLinks.length > 0 && (
              <div className="select-box">
                <span>
                  Showing out
                  <span>
                    <label htmlFor="pageitems" hidden></label>
                    <select
                      className="pageitems"
                      name="page Items"
                      id="pageitems"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        selectPageCount(e)
                      }
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </span>
                  of {elementLinks.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElementDetail
