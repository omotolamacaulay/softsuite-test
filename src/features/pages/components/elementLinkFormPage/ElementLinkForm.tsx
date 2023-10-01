import { useState } from "react"

// import ReactDOM from "react-dom"
import ElementFormPageOne from "./ElementFormPageOne"
import ElementFormPageTwo from "./ElementFormPageTwo"
import ElementFormPageThree from "./ElementFormPageThree"
import MultiProgressElement from "./MultiProgressElement"
import { useForm } from "react-hook-form"

import { Element } from "../../../../types"
// import "./ElementForm.scss"
import Modal from "../Modal"

const ElementLinkForm = () => {
  const [page, setPage] = useState("pageone")
  const [showModal, setShowModal] = useState(false)
  const { handleSubmit, control } = useForm<Element>({
    defaultValues: {
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
    },
  })
  const nextPage = (page: string) => {
    setPage(page)
  }
  // const { control, handleSubmit } = useForm({
  //   defaultValues: {
  //     firstName: '',
  //     select: {}
  //   }
  // });
  // const onSubmit = (data) => console.log(data)

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

  const onSubmit = (data: Elements) => {
    console.log(data)
  }

  return (
    <div>
      <h1>Create Element</h1>
      <MultiProgressElement page={page} onPageNumberClick={nextPageNumber} />
      <form className="element-form" onSubmit={handleSubmit(onSubmit)}>
        {
          {
            pageone: (
              <ElementFormPageOne onButtonClick={nextPage} control={control} />
            ),
            pagetwo: (
              <ElementFormPageTwo onButtonClick={nextPage} control={control} />
            ),
            pagethree: (
              <ElementFormPageThree
                onButtonClick={nextPage}
                control={control}
              />
            ),
          }[page]
        }
      </form>
    </div>
  )
}

export default ElementLinkForm
