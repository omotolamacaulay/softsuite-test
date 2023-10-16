//@ts-nocheck
import "./Element.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState, ChangeEvent } from "react"
import { ElementLink } from "../../../types"
import Icons from "../../assets/images"
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
  useFetchElementLinkQuery,
} from "../../counter/apiSlice"
import ElementDetails from "./ElementDetails"
import ElementLinkTable from "./ElementLinkTable"

const ElementDetail = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [showSideModal, setShowSideModal] = useState<boolean>(false)
  const [showElementModal, setShowElementModal] = useState<boolean>(false)
  const [formType, setFormType] = useState<"ADD" | "EDIT">("EDIT")
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentLinkDetails, setCurrentLinkDetails] = useState<ElementLink>()
  const { id } = useParams() as { id: string }
  const { data: payrunData } = useFetchPayrunQuery()
  const { data: elementCategoryData } = useFetchElementCategoryQuery()
  const { data: elementClassificationData } =
    useFetchElementClassificationQuery()
  const { data: suborganizationsData, isSuccess: isTableSuccess } =
    useFetchSuborganizationsQuery()
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
  const {
    data: elementLinks,
    isLoading: isLinksLoading,
    isSuccess: isLinksSuccess,
  } = useFetchElementLinkQuery(id)
  const viewLinkDetails = (id: any) => {
    if (isLinksSuccess) {
      const index = elementLinks.findIndex((link) => link.id === id)
      setCurrentLinkDetails(elementLinks[index])
      setShowSideModal(true)
    }
  }
  console.log(gradeData)
  const { getDataName: getCategoryName } = useDataLookup(elementCategoryData)
  const { getDataName: getClassificationData } = useDataLookup(
    elementClassificationData,
  )
  const { getDataName: getPayrun } = useDataLookup(payrunData)

  const { getDataName: getEmployeeCategory } =
    useDataLookup(employeeCategoryData)
  const { getDataName: getsuborganizations } =
    useDataLookup(suborganizationsData)
  const { getDataName: getLocation } = useDataLookup(locationData)
  useDataLookup(suborganizationsData)
  const { getDataName: getEmployeeType } = useDataLookup(employeeTypeData)
  const { getDataName: getGrade } = useDataLookup(gradeData)
  const { getDataName: getHousing } = useDataLookup(housingData)
  const { getDataName: getWardrobe } = useDataLookup(wardrobeData)
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }
  useEffect(() => {
    if (isLinksSuccess) {
      // const endOffset = itemOffset + itemsPerPage
      setPageCount(Math.ceil(elementLinks.length / itemsPerPage))
    }
  }, [itemOffset, itemsPerPage, elementLinks, isLinksSuccess])

  const handlePageClick = (event: { selected: number }) => {
    if (isSuccess) {
      const newOffset = (event.selected * itemsPerPage) % elementLinks.length
      setItemOffset(newOffset)
    }
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
        {isSuccess && (
          <ElementDetails
            singleElement={singleElement}
            isSuccess={isSuccess}
            getCategoryName={getCategoryName}
            getClassificationData={getClassificationData}
            getPayrun={getPayrun}
          />
        )}

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
                  suborganizationsData={suborganizationsData}
                  jobTitleData={jobTitleData}
                  locationData={locationData}
                  employeeTypeData={employeeTypeData}
                  employeeCategoryData={employeeCategoryData}
                  gradeData={gradeData}
                  unionData={unionData}
                  housingData={housingData}
                  wardrobeData={wardrobeData}
                  securityData={securityData}
                />
              ) : (
                <EditElementLinkForm
                  setShowElementModal={setShowElementModal}
                  suborganizationsData={suborganizationsData}
                  jobTitleData={jobTitleData}
                  locationData={locationData}
                  employeeTypeData={employeeTypeData}
                  employeeCategoryData={employeeCategoryData}
                  gradeData={gradeData}
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
          {isLinksSuccess && elementLinks.length > 0 && isTableSuccess ? (
            <ElementLinkTable
              elementLinks={elementLinks.slice(
                itemOffset,
                itemOffset + itemsPerPage,
              )}
              setFormType={setFormType}
              setShowElementModal={setShowElementModal}
              viewLinkDetails={viewLinkDetails}
              suborganizationsData={suborganizationsData}
              isTableSuccess={isTableSuccess}
              employeeCategoryData={employeeCategoryData}
            />
          ) : (
            ""
          )}
          {showSideModal ? (
            <SideModal>
              {isLinksSuccess ? (
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
                        <p className="element__text">
                          {getsuborganizations(
                            currentLinkDetails?.suborganizationId,
                          )}
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
                          {getLocation(currentLinkDetails?.locationId)}
                        </p>
                      </div>
                      <div className="single__detail">
                        <p className="element__label">Employee Type</p>
                        <p className="element__text">
                          {getEmployeeType(currentLinkDetails?.employeeTypeId)}
                        </p>
                      </div>
                      <div className="single__detail">
                        <p className="element__label">Employee Category</p>
                        <p className="element__text">
                          {getEmployeeCategory(
                            currentLinkDetails?.employeeCategoryId,
                          )}
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
                          {currentLinkDetails?.status === true ||
                          currentLinkDetails?.status === "active" ||
                          currentLinkDetails?.status === "Active"
                            ? "Active"
                            : currentLinkDetails?.status === false ||
                              currentLinkDetails?.status === "inactive" ||
                              currentLinkDetails?.status === "Inactive" ||
                              currentLinkDetails?.status === ""
                            ? "Inactive"
                            : "Unknown"}
                        </p>
                      </div>
                      <div className="single__detail">
                        <p className="element__label">GRADE</p>
                        <p className="element__text">
                          {getGrade(currentLinkDetails?.grade)}
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
                        <p className="element__label">Amount/Rate</p>
                        <p className="element__text">
                          {currentLinkDetails?.amount
                            ? `NGN ${currentLinkDetails?.amount}`
                            : `${currentLinkDetails?.rate}%`}
                        </p>
                      </div>
                      <div className="single__detail">
                        <p className="element__label">Wardrobe</p>
                        <p className="element__text">
                          {getWardrobe(
                            currentLinkDetails?.additionalInfo[0].lookupValueId,
                          )}
                        </p>
                      </div>
                      <div className="single__detail">
                        <p className="element__label">Housing</p>
                        <p className="element__text">
                          {getHousing(
                            currentLinkDetails?.additionalInfo[1].lookupValueId,
                          )}
                        </p>
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
              ) : null}
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

            {isLinksSuccess && elementLinks.length > 0 && (
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
