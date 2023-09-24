// import useUsers from '../../../common/hooks/useUsers';
import ElementsTable from "../components/ElementsTable"
// import UsersHeader from './components/UsersHeader';
import "./Elements.scss"
import Icons from "../../assets/images"

// import '../../../common/UIElements/pagination/Pagination.scss';
import { ChangeEvent, useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
// import { User } from '../../../types';

function Elements() {
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [users, setUsers] = useState([]) // State to store users data

  useEffect(() => {
    // Generate your 100 random objects and set them in the state here
    const getRandomElement = (arr: string | any[]) =>
      arr[Math.floor(Math.random() * arr.length)]
    const getRandomDate = () => {
      const start = new Date(2010, 0, 1)
      const end = new Date()
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
      )
    }

    const names = ["Object A", "Object B", "Object C", "Object D", "Object E"]
    const elementCategories = ["Category 1", "Category 2", "Category 3"]
    const elementClassifications = [
      "Classification X",
      "Classification Y",
      "Classification Z",
    ]
    const modifiedBy = ["User 1", "User 2", "User 3"]
    const statusOptions = ["Active", "Inactive"]

    const elements = []

    for (let i = 0; i < 100; i++) {
      const randomObject = {
        name: getRandomElement(names),
        elementCategory: getRandomElement(elementCategories),
        elementClassification: getRandomElement(elementClassifications),
        dateModified: getRandomDate().toLocaleDateString(),
        timeModified: getRandomDate().toLocaleTimeString(),
        modifiedBy: getRandomElement(modifiedBy),
        status: getRandomElement(statusOptions),
      }

      elements.push(randomObject)
    }

    setUsers(elements)
  }, []) // Empty dependency array to run only once

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setPageCount(Math.ceil(users.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, users]) // Include users in the dependency array

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % users.length
    setItemOffset(newOffset)
  }

  const selectPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.currentTarget.value)
  }

  return (
    <div className="elements">
      <div className="page__header">
        <h2>Elements</h2>
        <div className="searchGroup">
          <div className="searchArea">
            <div className="elements__search">
              <div className="elements__search-group">
                <input
                  type="search"
                  className="form-input"
                  placeholder="Search for anything"
                />
                <span className="icon">
                  <img src={Icons["Search"]} alt="SVG logo" />
                </span>
              </div>
            </div>
            <button className="filterBtn">
              <img src={Icons["FilterBtn"]} alt="SVG logo" />
            </button>
          </div>
          <button className="add-btn">
            Create Element
            <img src={Icons["Plus"]} alt="SVG logo" />
          </button>
        </div>
      </div>

      <div className="elements__body">
        {/* <UsersHeader users={users} /> */}
        <ElementsTable
          users={users.slice(itemOffset, itemOffset + itemsPerPage)}
        />

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
        </div>
      </div>
    </div>
  )
}

export default Elements
