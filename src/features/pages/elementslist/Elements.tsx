//@ts-nocheck
import ElementsTable from "../components/table/ElementsTable"
import "./Elements.scss"
import Icons from "../../assets/images"
import { ChangeEvent, useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import ElementForm from "../components/addelementform/ElementForm"
import DefaultModal from "../components/DefaultModal/DefaultModal"
import EditElementForm from "../components/editelementform/EditElementForm"
import EmptyState from "../components/EmptyState/EmptyState"
import Spinner from "../components/spinner/Spinner"
import useGetElementCategory from "../../hooks/useGetElementCategory"
import useGetElementClassification from "../../hooks/useGetElementClassification"
import {
  useFetchElementsQuery,
  useFetchPayrunQuery,
} from "../../counter/apiSlice"

function Elements() {
  const [showModal, setShowModal] = useState(false)
  const [formType, setFormType] = useState<"ADD" | "EDIT">("EDIT")
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { data, isSuccess, isLoading } = useFetchElementsQuery()
  const { data: payrunData } = useFetchPayrunQuery()
  const { elementCategoryData } = useGetElementCategory()
  const { elementClassificationData } = useGetElementClassification()

  useEffect(() => {
    if (isSuccess) {
      // const endOffset = itemOffset + itemsPerPage
      setPageCount(Math.ceil(data.length / itemsPerPage))
    }
  }, [itemOffset, itemsPerPage, data, isSuccess])

  const handlePageClick = (event: { selected: number }) => {
    if (isSuccess) {
      const newOffset = (event.selected * itemsPerPage) % data.length
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
          <button
            className="add-btn"
            onClick={() => {
              setFormType("ADD")
              setShowModal(true)
            }}
          >
            Create Element
            <img src={Icons["Plus"]} alt="SVG logo" />
          </button>
        </div>
      </div>
      {showModal ? (
        <DefaultModal>
          {formType === "ADD" ? (
            <ElementForm
              setShowModal={setShowModal}
              elementClassificationData={elementClassificationData}
              elementCategoryData={elementCategoryData}
              payrunData={payrunData}
            />
          ) : (
            <EditElementForm
              setShowModal={setShowModal}
              elementClassificationData={elementClassificationData}
              elementCategoryData={elementCategoryData}
              payrunData={payrunData}
            />
          )}
        </DefaultModal>
      ) : null}
      {isSuccess && data.length > 0 ? (
        <div className="elements__body">
          <ElementsTable
            elements={data.slice(itemOffset, itemOffset + itemsPerPage)}
            setShowModal={setShowModal}
            setFormType={setFormType}
            elementClassificationData={elementClassificationData}
            elementCategoryData={elementCategoryData}
            isSuccess={isSuccess}
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

            {isSuccess && data.length > 0 && (
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
                  of {data.length}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyState text="Elements" />
      )}
    </div>
  )
}

export default Elements
