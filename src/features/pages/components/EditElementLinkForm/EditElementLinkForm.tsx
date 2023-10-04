//@ts-nocheck
import { useState } from "react"
import EditElementLinkFormPageOne from "./EditElementLinkFormPageOne"
import EditElementLinkFormPageTwo from "./EditElementLinkFormPageTwo"
import EditElementLinkFormPageThree from "./EditElementLinkFormPageThree"
import MultiProgressElement from "../elementLinkFormPage/MultiProgressElement"
import { useForm } from "react-hook-form"
import { useAppSelector, useAppDispatch } from "../../../../app/hooks"
import { ElementLink } from "../../../../types"
import "../addelementform/ElementForm.scss"
import "../elementLinkFormPage/ElementLinkForm.scss"
import { updateElementLink } from "../../../counter/elementLinkSlice"

const EditElementLinkForm = ({
  setShowElementModal,
}: {
  setShowElementModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [page, setPage] = useState("pageone")
  const elementLink = useAppSelector(
    (state) => state.elementlinks.currentEditElementLink,
  )
  const emptyState = {
    elementId: 0,
    suborganizationId: 0,
    name: "",
    locationId: 0,
    departmentId: 0,
    employeeCategoryId: 0,
    employeeCategoryValueId: 0,
    employeeTypeId: 0,
    employeeTypeValueId: 0,
    jobTitleId: 0,
    grade: 0,
    gradeStep: 0,
    unionId: 0,
    amountType: "",
    amount: 0,
    rate: 0,
    effectiveStartDate: "",
    effectiveEndDate: "",
    status: "",
    automate: "",
    additionalInfo: [
      {
        lookupId: 0,
        lookupValueId: 0,
      },
    ],
  }
  const { handleSubmit, register } = useForm<ElementLink>({
    defaultValues: elementLink || emptyState,
  })
  const nextPage = (page: string) => {
    setPage(page)
  }
  const closeModal = () => setShowElementModal(false)
  const dispatch = useAppDispatch()
  const nextPageNumber = (pageNumber: string) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone")
        break
      case "2":
        setPage("pagetwo")
        break
      case "3":
        setPage("pagethree")
        break

      default:
        setPage("1")
    }
  }

  const onSubmit = async (data: ElementLink) => {
    const actionResult = await dispatch(updateElementLink(data))
    if (updateElementLink.fulfilled.match(actionResult)) {
      console.log("Element updated successfully:", actionResult.payload)
    }
    setShowElementModal(false)
  }

  return (
    <div>
      <h1>Edit Element Link</h1>
      <div className="page-link-labels">
        <p>Staff Information</p>
        <p>Additional Information</p>
        <p>Processing Information</p>
      </div>
      <MultiProgressElement page={page} onPageNumberClick={nextPageNumber} />
      <form className="element-form" onSubmit={handleSubmit(onSubmit)}>
        {
          {
            pageone: (
              <EditElementLinkFormPageOne
                closeModal={closeModal}
                onButtonClick={nextPage}
                register={register}
              />
            ),
            pagetwo: (
              <EditElementLinkFormPageTwo
                onButtonClick={nextPage}
                register={register}
              />
            ),
            pagethree: (
              <EditElementLinkFormPageThree
                onButtonClick={nextPage}
                register={register}
                closeModal={closeModal}
              />
            ),
          }[page]
        }
      </form>
    </div>
  )
}

export default EditElementLinkForm
