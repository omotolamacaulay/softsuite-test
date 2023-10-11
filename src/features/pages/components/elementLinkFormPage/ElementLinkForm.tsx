//@ts-nocheck
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ElementFormPageOne from "./ElementFormPageOne"
import ElementFormPageTwo from "./ElementFormPageTwo"
import ElementFormPageThree from "./ElementFormPageThree"
import MultiProgressElement from "./MultiProgressElement"
import { useForm } from "react-hook-form"
import { useAppSelector, useAppDispatch } from "../../../../app/hooks"
import { ElementLink } from "../../../../types"
import "../addelementform/ElementForm.scss"
import "./ElementLinkForm.scss"
import { addSingleElementLink } from "../../../counter/elementLinkSlice"

const ElementLinkForm = ({
  setShowElementModal,
  suborganizationsData,
  jobTitleData,
  locationData,
  employeeTypeData,
  employeeCategoryData,
}: {
  setShowElementModal: React.Dispatch<React.SetStateAction<boolean>>
  suborganizationsData
  jobTitleData
  locationData
  employeeTypeData
  employeeCategoryData
}) => {
  const [page, setPage] = useState("pageone")
  const navigate = useNavigate()

  const elementLink = useAppSelector(
    (state) => state.elementlinks.currentEditElementLink,
  )
  const element = useAppSelector((state) => state.elements.element)
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
  const { handleSubmit, register, watch } = useForm<ElementLink>({
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
    const elementId = element.id
    data.elementId = elementId
    const actionResult = await dispatch(addSingleElementLink(data))
    if (addSingleElementLink.fulfilled.match(actionResult)) {
      console.log("Element updated successfully:", actionResult.payload)
    }
    setShowElementModal(false)
    navigate(0)
  }

  return (
    <div>
      <h1>Create Element Link</h1>
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
              <ElementFormPageOne
                closeModal={closeModal}
                onButtonClick={nextPage}
                register={register}
                watch={watch}
                suborganizationsData={suborganizationsData}
                jobTitleData={jobTitleData}
                locationData={locationData}
                employeeTypeData={employeeTypeData}
                employeeCategoryData={employeeCategoryData}
              />
            ),
            pagetwo: (
              <ElementFormPageTwo
                onButtonClick={nextPage}
                register={register}
              />
            ),
            pagethree: (
              <ElementFormPageThree
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

export default ElementLinkForm
