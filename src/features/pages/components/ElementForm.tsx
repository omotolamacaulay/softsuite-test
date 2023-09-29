import { useState } from "react"
import MultiStepProgressBar from "./progressBar/MultiStepProgressBar"
// import ReactDOM from "react-dom"
import FormpageOne from "./formpage/FormpageOne"
import FormPageTwo from "./formpage/FormPageTwo"
import { useForm } from "react-hook-form"

import { Elements } from "../../../types"
import "./ElementForm.scss"
import Modal from "../components/Modal"

const ElementForm = () => {
  const [page, setPage] = useState("pageone")
  const [showModal, setShowModal] = useState(false)
  const { handleSubmit, control } = useForm<Elements>({
    defaultValues: {
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

  const onSubmit = (data: Elements) => {
    console.log(data)
  }

  return (
    <div>
      <h1>Create Element</h1>
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      <form className="element-form" onSubmit={handleSubmit(onSubmit)}>
        {
          {
            pageone: <FormpageOne onButtonClick={nextPage} control={control} />,
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
