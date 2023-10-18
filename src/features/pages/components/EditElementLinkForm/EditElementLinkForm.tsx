//@ts-nocheck
import { useState } from "react"
import MultiProgressElement from "../elementLinkFormPage/MultiProgressElement"
import { useForm } from "react-hook-form"
import { useAppSelector } from "../../../../app/hooks"
import { ElementLink } from "../../../../types"
import "../addelementform/ElementForm.scss"
import "../elementLinkFormPage/ElementLinkForm.scss"
import ElementFormPageOne from "../elementLinkFormPage/ElementFormPageOne"
import ElementFormPageTwo from "../elementLinkFormPage/ElementFormPageTwo"
import ElementFormPageThree from "../elementLinkFormPage/ElementFormPageThree"
import { useUpdateElementLinkMutation } from "../../../counter/apiSlice"
import AlertModal from "../AlertModal/AlertMotal"
import SuccessModal from "../SuccessModal/SuccessModal"

const EditElementLinkForm = ({
  setShowElementModal,
  suborganizationsData,
  jobTitleData,
  locationData,
  employeeTypeData,
  employeeCategoryData,
  gradeData,
  unionData,
  housingData,
  wardrobeData,
  securityData,
}: {
  setShowElementModal: React.Dispatch<React.SetStateAction<boolean>>
  suborganizationsData
  jobTitleData
  locationData
  employeeTypeData
  employeeCategoryData
  gradeData
  unionData
  housingData
  wardrobeData
  securityData
}) => {
  const [page, setPage] = useState("pageone")
  const [updateElementLink, isSuccess] = useUpdateElementLinkMutation()
  const [alertModal, setAlertModal] = useState(false)
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
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    trigger,
  } = useForm<ElementLink>({
    defaultValues: elementLink || emptyState,
  })
  const nextPage = (page: string) => {
    setPage(page)
  }
  const closeModal = () => setShowElementModal(false)
  // const dispatch = useAppDispatch()
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

  const onSubmit = async (data: ElementLink, e?: Event) => {
    e.preventDefault()
    try {
      const output = await trigger()
      console.log(output)
      if (output === true) {
        await updateElementLink(data)
      } else {
        return
      }
    } catch (error) {
      console.error("An error occurred while processing the element:", error)
    }
    if (isSuccess) {
      setAlertModal(true)
    }
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
                trigger={trigger}
                errors={errors}
              />
            ),
            pagetwo: (
              <ElementFormPageTwo
                onButtonClick={nextPage}
                register={register}
                watch={watch}
                gradeData={gradeData}
                unionData={unionData}
                housingData={housingData}
                wardrobeData={wardrobeData}
                securityData={securityData}
              />
            ),
            pagethree: (
              <ElementFormPageThree
                onButtonClick={nextPage}
                register={register}
                closeModal={closeModal}
                watch={watch}
                errors={errors}
              />
            ),
          }[page]
        }
      </form>
      {alertModal && (
        <AlertModal>
          <SuccessModal
            text="Element Link Updated successfully"
            closeSuccessModal={() => {
              setAlertModal(false)
              setShowElementModal(false)
            }}
          />
        </AlertModal>
      )}
    </div>
  )
}

export default EditElementLinkForm
