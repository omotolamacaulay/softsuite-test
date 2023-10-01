import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MultiStepProgressBar from "../formpage/progressBar/MultiStepProgressBar"
import FormpageOne from "../formpage/FormpageOne"
import FormPageTwo from "../formpage/FormPageTwo"
import { useForm } from "react-hook-form"
import { Element } from "../../../../types"
import "./ElementForm.scss"
import {
  addSingleElement,
  updateElement,
  fetchSingleElement,
} from "../../../counter/elementSlice"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"

const ElementForm = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [page, setPage] = useState("pageone")
  const navigate = useNavigate()
  const element = useAppSelector((state) => state.elements.currentEditElement)
  // const isLoading = useAppSelector((state) => state.elements.loading)
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

  const { handleSubmit, control } = useForm<Element>({
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
      //   case "3":
      //     setPage("pagethree")
      //     break
      //   case "4":
      //     alert("Ooops! Seems like you did not fill the form.")
      //     break
      default:
        setPage("1")
    }
  }

  // const onSubmit = (data: Elements) => {
  //   console.log(data)
  // }
  const onSubmit = async (data: Element) => {
    data.modifiedBy = "Omotola Macaulay"
    let id: string = ""
    try {
      if (data.id) {
        id = data.id
        dispatch(updateElement(data))
      } else {
        const actionResult = await dispatch(addSingleElement(data))

        if (addSingleElement.fulfilled.match(actionResult)) {
          console.log("Element updated successfully:", actionResult.payload)
          id = actionResult.payload.id
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
      <h1>Create Element</h1>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      <form className="element-form" onSubmit={handleSubmit(onSubmit)}>
        {
          {
            pageone: (
              <FormpageOne
                closeModal={closeModal}
                onButtonClick={nextPage}
                control={control}
              />
            ),
            pagetwo: (
              <FormPageTwo
                onButtonClick={handleSubmit(onSubmit)}
                control={control}
              />
            ),
          }[page]
        }
      </form>
    </div>
  )
}

export default ElementForm
