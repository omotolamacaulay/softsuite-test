import ElementsTable from "../components/ElementsTable"
import "./Elements.scss"
import Icons from "../../assets/images"
import { ChangeEvent, useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useAppSelector, useAppDispatch } from "../../../app/hooks"
import { fetchElements } from "../../counter/elementSlice"
import Modal from "../components/Modal"
import ElementForm from "../components/ElementForm"

function Elements() {
  const [showModal, setShowModal] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const dispatch = useAppDispatch()
  const elements = useAppSelector((state) => state.elements)

  useEffect(() => {
    dispatch(fetchElements())
    console.log(elements.elements)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // const endOffset = itemOffset + itemsPerPage
    setPageCount(Math.ceil(elements.elements.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, elements.elements])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % elements.elements.length
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
          <button className="add-btn" onClick={() => setShowModal(true)}>
            Create Element
            <img src={Icons["Plus"]} alt="SVG logo" />
          </button>
        </div>
      </div>
      {showModal ? (
        <Modal>
          <div>
            <h1>Create Element</h1>
            <ElementForm />
          </div>
        </Modal>
      ) : null}
      <div className="elements__body">
        <ElementsTable
          users={elements.elements.slice(itemOffset, itemOffset + itemsPerPage)}
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

          {elements.elements.length > 0 && (
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
                of {elements.elements.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Elements

// import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchElements } from "../../counter/elementSlice"
// import ReactPaginate from "react-paginate"
// import ElementsTable from "../components/ElementsTable"
// import Modal from "../components/Modal"
// import ElementForm from "../components/ElementForm"
// import Icons from "../../assets/images"

// function Elements() {
//   const [showModal, setShowModal] = useState(false)
//   const [itemOffset, setItemOffset] = useState(0)
//   const [itemsPerPage, setItemsPerPage] = useState(10)

//   const dispatch = useDispatch()
//   const elements = useSelector((state) => state.elements) || []

//   useEffect(() => {
//     dispatch(fetchElements())
//   }, [dispatch])

//   const pageCount = Math.ceil(elements.length / itemsPerPage)

//   const handlePageClick = (selected) => {
//     const newOffset = selected.selected * itemsPerPage
//     setItemOffset(newOffset)
//   }

//   const selectPageCount = (e) => {
//     setItemsPerPage(+e.currentTarget.value)
//   }

//   return (
//     <div className="elements">
//       <div className="page__header">
//         <h2>Elements</h2>
//         <div className="searchGroup">
//           <div className="searchArea">
//             <div className="elements__search">
//               <div className="elements__search-group">
//                 <input
//                   type="search"
//                   className="form-input"
//                   placeholder="Search for anything"
//                 />
//                 <span className="icon">
//                   <img src={Icons["Search"]} alt="SVG logo" />
//                 </span>
//               </div>
//             </div>
//             <button className="filterBtn">
//               <img src={Icons["FilterBtn"]} alt="SVG logo" />
//             </button>
//           </div>
//           <button className="add-btn" onClick={() => setShowModal(true)}>
//             Create Element
//             <img src={Icons["Plus"]} alt="SVG logo" />
//           </button>
//         </div>
//       </div>
//       {showModal ? (
//         <Modal>
//           <div>
//             <h1>Create Element</h1>
//             <ElementForm />
//           </div>
//         </Modal>
//       ) : null}
//       <div className="elements__body">
//         <ElementsTable
//           elements={elements}
//           itemOffset={itemOffset}
//           itemsPerPage={itemsPerPage}
//         />
//         <div className="pagination_wrapper">
//           <ReactPaginate
//             nextLabel=">"
//             onPageChange={handlePageClick}
//             pageRangeDisplayed={3}
//             marginPagesDisplayed={2}
//             pageCount={pageCount}
//             previousLabel="<"
//             pageClassName="page-item"
//             pageLinkClassName="page-link"
//             previousClassName="page-item prev"
//             previousLinkClassName="page-link"
//             nextClassName="page-item next"
//             nextLinkClassName="page-link"
//             breakLabel="..."
//             breakClassName="page-item"
//             breakLinkClassName="page-link"
//             containerClassName="pagination"
//             activeClassName="active"
//             renderOnZeroPageCount={null}
//           />
//           {elements.length > 0 && (
//             <div className="select-box">
//               <span>
//                 Showing out
//                 <span>
//                   <label htmlFor="pageitems" hidden></label>
//                   <select
//                     className="pageitems"
//                     name="page Items"
//                     id="pageitems"
//                     onChange={selectPageCount}
//                   >
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                     <option value="50">50</option>
//                     <option value="100">100</option>
//                   </select>
//                 </span>
//                 of {elements.length}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Elements
