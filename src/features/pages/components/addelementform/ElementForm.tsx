//@ts-nocheck
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MultiStepProgressBar from "../formpage/progressBar/MultiStepProgressBar"
import FormpageOne from "../formpage/FormpageOne"
import FormPageTwo from "../formpage/FormPageTwo"
import { useForm } from "react-hook-form"
import { Element } from "../../../../types"
import "./ElementForm.scss"
// import { addSingleElement, updateElement } from "../../../counter/elementSlice"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import AlertModal from "../AlertModal/AlertMotal"
import SuccessModal from "../SuccessModal/SuccessModal"
import { useAddSingleElementMutation } from "../../../counter/apiSlice"

const ElementForm = ({
  setShowModal,
  elementClassificationData,
  payrunData,
  elementCategoryData,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  elementCategoryData
  payrunData
  elementClassificationData
}) => {
  const [page, setPage] = useState("pageone")
  const [alertModal, setAlertModal] = useState(false)
  const navigate = useNavigate()
  const element = useAppSelector((state) => state.elements.currentEditElement)

  const dispatch = useAppDispatch()
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

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Element>({
    defaultValues: element || emptyState,
  })
  const nextPage = (page: string) => {
    setPage(page)
  }
  const closeModal = () => setShowModal(false)
  const [addElement, isSuccess] = useAddSingleElementMutation()
  console.log(errors)
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
      await addElement(data)
      // if (addSingleElement.fulfilled.match(actionResult)) {
      //   console.log("Element updated successfully:", actionResult.payload)
      // id = actionResult.data.id
      // }
      // setShowModal(false)
      // setAlertModal(true)
      // navigate(`/elements/${id}`)
    } catch (error) {
      console.error("An error occurred while processing the element:", error)
    }
    if (isSuccess) {
      setAlertModal(true)
    }
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
                watch={watch}
                formStateErrors={errors}
                elementClassificationData={elementClassificationData}
                payrunData={payrunData}
                elementCategoryData={elementCategoryData}
              />
            ),
            pagetwo: (
              <FormPageTwo
                onButtonClick={nextPage}
                register={register}
                watch={watch}
              />
            ),
          }[page]
        }
      </form>
      {alertModal && (
        <AlertModal>
          <SuccessModal
            text="Element Added successfully"
            closeSuccessModal={() => {
              setAlertModal(false)
              setShowModal(false)
            }}
          />
        </AlertModal>
      )}
    </div>
  )
}

export default ElementForm
