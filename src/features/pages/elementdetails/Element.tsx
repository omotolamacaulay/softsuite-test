import "./Element.scss"
import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { fetchSingleElement } from "../../counter/elementSlice"
import { ElementLink, Element } from "../../../types"
import Icons from "../../assets/images"
import ElementLinkForm from "../components/elementLinkFormPage/ElementLinkForm"
import "../components/table/ElementsTable.scss"
import ReactPaginate from "react-paginate"
import { useState } from "react"
import Modal from "../components/Modal"

// interface ElementDetail {
//   name: string
//   categoryValueId: number
//   classificationValueId: number
//   elementClassification: string
//   effectiveEndDate: string
//   modifiedBy: string
//   status: string
//   effectiveStartDate: string
// }

const ElementDetail = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [showModal, setShowModal] = useState(false)
  const [showElementModal, setShowElementModal] = useState(false)

  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const dispatch = useAppDispatch()
  const { id } = useParams() as { id: string }
  // dispatch(fetchSingleElement(id))
  const element = useAppSelector((state) => state.elements.element)
  const loading = useAppSelector((state) => state.elements.loading)

  useEffect(() => {
    dispatch(fetchSingleElement(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  //   const formatDate = (date: string) => {
  //     return moment(date).format("MMM DD YYYY, h:mm a")
  //   }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }
  // useEffect(() => {
  //   // const endOffset = itemOffset + itemsPerPage
  //   setPageCount(Math.ceil(users.length / itemsPerPage))
  // }, [itemOffset, itemsPerPage, users])

  // const handlePageClick = (event: { selected: number }) => {
  //   const newOffset = (event.selected * itemsPerPage) % users.length
  //   setItemOffset(newOffset)
  // }

  // const selectPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setItemsPerPage(+e.currentTarget.value)
  // }
  // const filterUsers = () => {
  //   toggleForm()
  // }

  // const resetFilter = () => {
  //   toggleForm()
  // }
  const getRandomElement = (arr: string | any[]) =>
    arr[Math.floor(Math.random() * arr.length)]

  const getRandomDate = () => {
    const start = new Date(2010, 0, 1)
    const end = new Date()
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    )
  }

  // const names = [
  //   "ABC Corporation",
  //   "XYZ Inc",
  //   "LMN Co.",
  //   "PQR Enterprises",
  //   "Object E",
  // ]
  // const subOrganizations = [
  //   "Solutions Delivery",
  //   "Management",
  //   "Office Administration",
  // ]
  // const department = [
  //   "Software Development",
  //   "Human Resources",
  //   "Software Development",
  //   "Cleaning",
  // ]
  // const employeeCategory = ["Junior Staff", "Senior Staff", "Consultant"]
  // const ammount = [
  //   "10,000.00",
  //   "30,000.00",
  //   "70,000.00",
  //   "80,000.00",
  //   "100,000.00",
  // ]

  // const statusOptions = ["Active", "Inactive"]

  // const elements = []

  // for (let i = 0; i < 20; i++) {
  //   const randomObject = {
  //     name: getRandomElement(names),
  //     subOrganization: getRandomElement(subOrganizations),
  //     department: getRandomElement(department),
  //     employeeCategory: getRandomElement(employeeCategory),
  //     ammount: getRandomElement(ammount),
  //     // employeeCategory: getRandomElement(employeeCategory),
  //     status: getRandomElement(statusOptions),
  //   }

  //   elements.push(randomObject)
  // }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="elements">
      <div className="element">
        <div className="page__header">
          <div className="element__back">
            <Link to="/elements">
              <img src={Icons["Back"]} alt="SVG logo" />
            </Link>
          </div>
          <h2>Element Details</h2>
          <div className="element__detail">
            <div className="single__detail">
              <p className="element__label">Element Name</p>
              <p className="element__text">{element?.name}</p>
            </div>
            <div className="single__detail">
              <p className="element__label">Element Classification</p>
              <p className="element__text">Deduction</p>
            </div>
            <div className="single__detail">
              <p className="element__label">ELEMENT category</p>
              <p className="element__text">Pre-Tax Deduction</p>
            </div>
            <div className="single__detail">
              <p className="element__label">payrun</p>
              <p className="element__text">Monthly Run</p>
            </div>
            <div className="single__detail">
              <p className="element__label">Effective Start Date</p>
              <p className="element__text">18-09-2023</p>
            </div>
            <div className="single__detail">
              <p className="element__label">Effective END Date</p>
              <p className="element__text">22-09-2023</p>
            </div>
            <div className="single__detail">
              <p className="element__label">PROCESSING TYPE</p>
              <p className="element__text">Open</p>
            </div>
            <div className="single__detail">
              <p className="element__label">PAY frequency</p>
              <p className="element__text">Selected Months</p>
            </div>
            <div className="single__detail">
              <p className="element__label">Pay Months</p>
              <p className="element__text">January, February, March, April</p>
            </div>
            <div className="single__detail">
              <p className="element__label">Prorate</p>
              <p className="element__text">Yes</p>
            </div>
            <div className="single__detail">
              <p className="element__label">Status</p>
              <p className="element__text">Active</p>
            </div>
            <div className="single__detail">
              <p className="element__label">Prorate</p>
              <p className="element__text">Yes</p>
            </div>
          </div>
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
          <button className="add-btn" onClick={() => setShowElementModal(true)}>
            Create Element Link
            <img src={Icons["Plus"]} alt="SVG logo" />
          </button>
          {showElementModal ? (
            <Modal>
              <div className="createElement__modal">
                <ElementLinkForm />
              </div>
            </Modal>
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
          {/* <table>
            <thead>
              <tr>
                <th>
                  Name{" "}
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
                </th>
                <th>
                  Sub-Organization{" "}
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
                </th>
                <th>
                  Department{" "}
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
                </th>
                <th>
                  Employee Category{" "}
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
                </th>
                <th className="date">
                  Amount{" "}
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
                </th>
                <th>
                  Details{" "}
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
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {elements.map((user, index: number) => (
                <tr key={index}>
                  <td data-name="usename" className="username">
                    {user.name}
                    <span className={`status-span mobile ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td data-name="email">{user.subOrganization}</td>
                  <td data-name="phoneumber">{user.department}</td>

                  <td className="status">
                    <span className="">{user.employeeCategory}</span>
                  </td>
                  <td data-name="date joined" className="date">
                    NGN {user.ammount}
                  </td>
                  <td data-name="organization">
                    <Link to={() => {}} onClick={() => setShowModal(true)}>
                      View Details
                    </Link>
                  </td>
                  {showModal ? (
                    <Modal>
                      <div className="elementLinkDetails">
                        <div
                          className="page__header"
                          style={{ padding: "32px" }}
                        >
                          <button
                            // type="button"
                            className="closeElementLink"
                            onClick={() => setShowModal(false)}
                          >
                            <img src={Icons["CloseModal"]} alt="" />
                          </button>
                          <h2>Element Detail</h2>
                          <div className="element__detail">
                            <div className="single__detail">
                              <p className="element__label">NAME</p>
                              <p className="element__text">{user.name}</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">sub organization</p>
                              <p className="elementLinkDetails__text">
                                {user.subOrganization}
                              </p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">Department</p>
                              <p className="element__text">{user.department}</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">Location</p>
                              <p className="element__text">Monthly Run</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">Employee Type</p>
                              <p className="element__text">18-09-2023</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">
                                Employee Category
                              </p>
                              <p className="element__text">
                                {user.employeeCategory}
                              </p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">Effective Date</p>
                              <p className="element__text">Open</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">Status</p>
                              <p className="element__text">{user.status}</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">GRADE</p>
                              <p className="element__text">
                                January, February, March, April
                              </p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">Grade Step</p>
                              <p className="element__text">Yes</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">Amount Type</p>
                              <p className="element__text">Active</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">Amount</p>
                              <p className="element__text">
                                NGN {user.ammount}
                              </p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">PENSION</p>
                              <p className="element__text">Yes</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">Housing</p>
                              <p className="element__text">Yes</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">
                                Effective Start Date
                              </p>
                              <p className="element__text">Yes</p>
                            </div>
                            <div className="single__detail">
                              <p className="element__label">
                                Effective End Date
                              </p>
                              <p className="element__text">Yes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  ) : null}
                  <td data-name="action" className="elementLinkAction">
                    <img src={Icons["Edit"]} alt="" />
                    <img src={Icons["Delete"]} alt="" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          {/* <div className="pagination_wrapper">
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

            {users.length > 0 && (
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
                  of {users.length}
                </span>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ElementDetail
