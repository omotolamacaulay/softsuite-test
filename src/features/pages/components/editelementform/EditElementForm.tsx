import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MultiStepProgressBar from "../formpage/progressBar/MultiStepProgressBar"
import EditFormPageOne from "./EditFormPageOne"
import EditFormPageTwo from "./EditFormPageTwo"
import { useForm } from "react-hook-form"
import { Element } from "../../../../types"
import "./EditElementForm.scss"
import { updateElement } from "../../../counter/elementSlice"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"

const ElementForm = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [page, setPage] = useState("pageone")
  const navigate = useNavigate()
  const element = useAppSelector(
    (state) => state.elements.currentEditElement,
  ) as Element

  const { handleSubmit, register } = useForm<Element>({
    defaultValues: element,
  })

  const nextPage = (page: string) => {
    setPage(page)
  }
  const closeModal = () => setShowModal(false)

  const dispatch = useAppDispatch()

  const nextPageNumber = (pageNumber: string) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone")
        break
      case "2":
        setPage("pagetwo")
        break
      default:
        setPage("1")
    }
  }

  const onSubmit = async (data: Element) => {
    let id: string = ""
    try {
      if (data.id) {
        const actionResult = await dispatch(updateElement(data))
        if (updateElement.fulfilled.match(actionResult)) {
          id = actionResult.payload.elementId
        }
      }
      setShowModal(false)
      navigate(`/elements/${id}`)
    } catch (error) {
      console.error("An error occurred while processing the element:", error)
    }
  }

  return (
    <div>
      <h1>Edit Element</h1>
      <div className="page-labels">
        <p>Element Details</p>
        <p>Aditional Details</p>
      </div>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      <form className="editElement-form" onSubmit={handleSubmit(onSubmit)}>
        {
          {
            pageone: (
              <EditFormPageOne
                closeModal={closeModal}
                onButtonClick={nextPage}
                register={register}
              />
            ),
            pagetwo: (
              <EditFormPageTwo
                onButtonClick={nextPage}
                register={register}
                // submitForm={onSubmit}
              />
            ),
          }[page]
        }
      </form>
    </div>
  )
}

export default ElementForm
