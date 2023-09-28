import "./Element.scss"
import { useParams, Link } from "react-router-dom"
import { useEffect, useMemo } from "react"
// import ElementsTable from "../components/ElementsTable"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { fetchSingleElement } from "../../counter/elementSlice"
import { Elements } from "../../../types"
import Icons from "../../assets/images"
import "../components/ElementsTable.scss"
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

interface ElementsTableProps {
  users: ElementDetail[]
  user: Elements
}
const Element: React.FC<ElementsTableProps> = ({ users }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [showModal, setShowModal] = useState(false)
  // const dispatch = useAppDispatch()
  // const element = useAppSelector((state) => state.elements.elementsDetail)
  // const { id } = useParams() as { id: string }
  // // const [user] = useUser(id);
  // useEffect(() => {
  //   dispatch(fetchSingleElement(id))
  //   console.log(element)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  //   const formatDate = (date: string) => {
  //     return moment(date).format("MMM DD YYYY, h:mm a")
  //   }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }
  const filterUsers = () => {
    toggleForm()
  }

  const resetFilter = () => {
    toggleForm()
  }
  const getRandomElement = (arr: string | any[]) =>
    arr[Math.floor(Math.random() * arr.length)]

  const getRandomDate = () => {
    const start = new Date(2010, 0, 1)
    const end = new Date()
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    )
  }

  const names = [
    "ABC Corporation",
    "XYZ Inc",
    "LMN Co.",
    "PQR Enterprises",
    "Object E",
  ]
  const subOrganizations = [
    "Solutions Delivery",
    "Management",
    "Office Administration",
  ]
  const department = [
    "Software Development",
    "Human Resources",
    "Software Development",
    "Cleaning",
  ]
  const employeeCategory = ["Junior Staff", "Senior Staff", "Consultant"]
  const ammount = [
    "10,000.00",
    "30,000.00",
    "70,000.00",
    "80,000.00",
    "100,000.00",
  ]

  const statusOptions = ["Active", "Inactive"]

  const elements = []

  for (let i = 0; i < 20; i++) {
    const randomObject = {
      name: getRandomElement(names),
      subOrganization: getRandomElement(subOrganizations),
      department: getRandomElement(department),
      employeeCategory: getRandomElement(employeeCategory),
      ammount: getRandomElement(ammount),
      // employeeCategory: getRandomElement(employeeCategory),
      status: getRandomElement(statusOptions),
    }

    elements.push(randomObject)
  }
  return (
    <div className="elements">
      <div className="element">
        <div className="page__header">
          <h2>Element Detail</h2>
          <div className="element__detail">
            <div className="single__detail">
              <p className="element__label">Element Name</p>
              <p className="element__text">fff</p>
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
          <button className="add-btn" onClick={() => setShowModal(true)}>
            Create Element Link
            <img src={Icons["Plus"]} alt="SVG logo" />
          </button>
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
          <table>
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
                    <Link to={`/elements/${index}/elementlinks/${index}`}>
                      {user.name}
                    </Link>
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
                    <Link to={`/elements/${index}/elementlinks/${index}`}>
                      View Details
                    </Link>
                  </td>

                  <td data-name="action" className="elementLinkAction">
                    <img src={Icons["Edit"]} alt="" />
                    <img src={Icons["Delete"]} alt="" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Element
