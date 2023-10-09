//@ts-nocheck
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MultiStepProgressBar from "../formpage/progressBar/MultiStepProgressBar"
import FormpageOne from "../formpage/FormpageOne"
import FormPageTwo from "../formpage/FormPageTwo"
import { useForm } from "react-hook-form"
import { Element } from "../../../../types"
import "./ElementForm.scss"
import { addSingleElement, updateElement } from "../../../counter/elementSlice"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import AlertModal from "../AlertModal/AlertMotal"
import SuccessModal from "../SuccessModal/SuccessModal"

const ElementForm = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [page, setPage] = useState("pageone")
  const [alertModal, setAlertModal] = useState(false)
  const navigate = useNavigate()
  const element = useAppSelector((state) => state.elements.currentEditElement)
  const emptyState = {
    name: "",
    description: "",
    payRunId: 0,
    payRunValueId: 0,
    classificationId: 0,
    classificationValueId: 0,
    categoryId: 0,
    categoryValueId: 0,
    reportingName: "",
    processingType: "",
    status: "",
    prorate: "",
    effectiveStartDate: "",
    effectiveEndDate: "",
    selectedMonths: [],
    payFrequency: "",
    modifiedBy: ",",
  }

  const { handleSubmit, register } = useForm<Element>({
    defaultValues: element || emptyState,
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

  const onSubmit = async (data: Element, e?: Event) => {
    e.preventDefault()
    data.modifiedBy = "Omotola Macaulay"
    let id: string = ""
    try {
      // setAlertModal(true)
      if (data.id) {
        id = data.id
        dispatch(updateElement(data))
      } else {
        const actionResult = await dispatch(addSingleElement(data))

        if (addSingleElement.fulfilled.match(actionResult)) {
          console.log("Element updated successfully:", actionResult.payload)
          id = actionResult.payload.id
        }
        setShowModal(false)
        navigate(`/elements/${id}`)
        setAlertModal(true)
      }
    } catch (error) {
      console.error("An error occurred while processing the element:", error)
    }
    setAlertModal(true)
  }

  return (
    <div>
      <h1>Create Element</h1>
      <div className="page-labels">
        <p>Element Details</p>
        <p>Aditional Details</p>
      </div>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      <form className="element-form" onSubmit={handleSubmit(onSubmit)}>
        {
          {
            pageone: (
              <FormpageOne
                closeModal={closeModal}
                onButtonClick={nextPage}
                register={register}
              />
            ),
            pagetwo: (
              <FormPageTwo onButtonClick={nextPage} register={register} />
            ),
          }[page]
        }
      </form>
      {alertModal && (
        <AlertModal>
          <SuccessModal
            text="Element Added successfully"
            closeSuccessModal={() => setAlertModal(false)}
          />
        </AlertModal>
      )}
    </div>
  )
}

export default ElementForm
