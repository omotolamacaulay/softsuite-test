//@ts-nocheck
import { useState } from "react"
import MultiStepProgressBar from "../formpage/progressBar/MultiStepProgressBar"
import EditFormPageOne from "./EditFormPageOne"
import EditFormPageTwo from "./EditFormPageTwo"
import { useForm } from "react-hook-form"
import { Element } from "../../../../types"
import "./EditElementForm.scss"
import { useAppSelector } from "../../../../app/hooks"
import { useUpdateElementMutation } from "../../../counter/apiSlice"
import AlertModal from "../AlertModal/AlertMotal"
import SuccessModal from "../SuccessModal/SuccessModal"

const EditElementForm = ({
  setShowModal,
  elementClassificationData,
  payrunData,
  elementCategoryData,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  elementClassificationData
  payrunData
  elementCategoryData
}) => {
  const [page, setPage] = useState("pageone")
  const [alertModal, setAlertModal] = useState(false)
  const element = useAppSelector(
    (state) => state.elements.currentEditElement,
  ) as Element

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    trigger,
  } = useForm<Element>({
    defaultValues: element,
  })

  const nextPage = (page: string) => {
    setPage(page)
  }
  const closeModal = () => setShowModal(false)
  const [updateElement, isSuccess] = useUpdateElementMutation()

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
    // let id: string = ""
    try {
      if (output === true) {
        const output = await trigger()
        console.log(output)
        if (data.id) {
          await updateElement(data)
        } else {
          return
        }

        // if (updateElement.fulfilled.match(actionResult)) {
        //   id = actionResult.payload.elementId
        // }
      }
      // setShowModal(false)
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
                watch={watch}
                errors={errors}
                elementClassificationData={elementClassificationData}
                payrunData={payrunData}
                elementCategoryData={elementCategoryData}
                trigger={trigger}
              />
            ),
            pagetwo: (
              <EditFormPageTwo
                onButtonClick={nextPage}
                register={register}
                watch={watch}
                errors={errors}
                trigger={trigger}
              />
            ),
          }[page]
        }
      </form>
      {alertModal && (
        <AlertModal>
          <SuccessModal
            text="Element Updated successfully"
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

export default EditElementForm
