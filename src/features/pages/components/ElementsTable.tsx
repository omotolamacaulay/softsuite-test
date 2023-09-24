import { Link } from "react-router-dom"
import Icons from "../../assets/images"
// import { User } from '../../../../types';
import "./ElementsTable.scss"
// import DropdownBtn from './Dropdown';
// import FilterForm from './FilterForm';
import { useState } from "react"
// import moment from "moment"

function ElementsTable({ users }) {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

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
  //   const getRandomElement = (arr: string | any[]) =>
  //     arr[Math.floor(Math.random() * arr.length)]

  //   const getRandomDate = () => {
  //     const start = new Date(2010, 0, 1)
  //     const end = new Date()
  //     return new Date(
  //       start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  //     )
  //   }

  //   const names = ["Object A", "Object B", "Object C", "Object D", "Object E"]
  //   const elementCategories = ["Category 1", "Category 2", "Category 3"]
  //   const elementClassifications = [
  //     "Classification X",
  //     "Classification Y",
  //     "Classification Z",
  //   ]
  //   const modifiedBy = ["User 1", "User 2", "User 3"]
  //   const statusOptions = ["Active", "Inactive"]

  //   const elements = []

  //   for (let i = 0; i < 100; i++) {
  //     const randomObject = {
  //       name: getRandomElement(names),
  //       elementCategory: getRandomElement(elementCategories),
  //       elementClassification: getRandomElement(elementClassifications),
  //       dateModified: getRandomDate().toLocaleDateString(),
  //       timeModified: getRandomDate().toLocaleTimeString(),
  //       modifiedBy: getRandomElement(modifiedBy),
  //       status: getRandomElement(statusOptions),
  //     }

  //     elements.push(randomObject)
  //   }

  return (
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
              Element Category{" "}
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
              Element Classification{" "}
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
              Status{" "}
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
              Date & Time Modified{" "}
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
              Modified By{" "}
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
          {users.map((user, index: number) => (
            <tr key={index}>
              <td data-name="usename" className="username">
                <Link to={`/users/${index}`}>{user.name}</Link>
                <span className={`status-span mobile ${user.status}`}>
                  {user.status}
                </span>
              </td>
              <td data-name="email">{user.elementCategory}</td>
              <td data-name="phoneumber">{user.elementClassification}</td>

              <td className="status">
                <span className={`status-span ${user.status}`}>
                  {user.status}
                </span>
              </td>
              <td data-name="date joined" className="date">
                {user.dateModified} || {user.timeModified}
              </td>
              <td data-name="organization">{user.modifiedBy}</td>

              <td data-name="action" className="action">
                <img src={Icons["More"]} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default ElementsTable
