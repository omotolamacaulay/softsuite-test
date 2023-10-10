//@ts-nocheck
import { UseFormRegister } from "react-hook-form"
// import { Select, ConfigProvider, Space, Input } from "antd"
import { Element } from "../../../../types"
import "./EditFormPageOne.scss"
import Input from "../../../layout/components/common/Input"
import TextArea from "../../../layout/components/common/TextArea"
import SelectInput from "../../../layout/components/common/SelectInput"

interface FormPageOneProps {
  onButtonClick: (arg: string) => void
  closeModal: () => void
  register: UseFormRegister<Element>
  watch: (arg: string) => void
  elementClassificationData: {
    id: number
    name: string
  }[]
  payrunData: {
    id: number
    name: string
  }[]
  elementCategoryData: {
    id: number
    name: string
  }[]
}
const EditFormPageOne = ({
  onButtonClick,
  closeModal,
  register,
  watch,
  elementClassificationData,
  payrunData,
  elementCategoryData,
}: FormPageOneProps) => {
  // const {
  // trigger,
  // formState: { errors },
  // } = useForm<Element>()
  const selectedClassificationId = watch("classificationId")
  const selectedClassification = elementClassificationData.find(
    (classification) => classification.id === selectedClassificationId,
  )
  const selectedClassificationName = selectedClassification
    ? selectedClassification.name
    : ""
  return (
    <div className="pg-1">
      <div className="form-group">
        <div className="input-group">
          <Input
            id="name"
            label="Name"
            register={{ ...register("name", { required: true }) }}
            required
            placeholder="Name"
          />
        </div>
        <div className="input-group">
          <SelectInput
            id="classificationId"
            label="Element Classification"
            required
            register={{ ...register("classificationId", { required: true }) }}
          >
            <>
              <option value="">Select Element Classification</option>
              {elementClassificationData.map((classification) => (
                <option key={classification.id} value={classification.id}>
                  {classification.name}
                </option>
              ))}
            </>
          </SelectInput>
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <SelectInput
            id="categoryValueId"
            label="Element Category"
            required
            register={{ ...register("categoryValueId", { required: true }) }}
            disabled={!selectedClassificationName}
          >
            <>
              <option value="">Select Element Category</option>
              {elementCategoryData.map((category) => {
                if (
                  (selectedClassificationName === "Deduction" &&
                    category.name.includes("Deduction")) ||
                  (selectedClassificationName === "Earning" &&
                    category.name.includes("Earning")) ||
                  (selectedClassificationName === "Non-Grossable Earning" &&
                    !category.name.includes("Deduction"))
                ) {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                }
                return null
              })}
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <SelectInput
            label="Payrun"
            id="payRunId"
            register={{ ...register("payRunId") }}
            required
          >
            <>
              <option value="">Select a payrun</option>
              {payrunData.map((payrun) => (
                <option key={payrun.id} value={payrun.id}>
                  {payrun.name}
                </option>
              ))}
            </>
          </SelectInput>
        </div>
      </div>
      <div className="input-group">
        <TextArea
          label="Description"
          register={{ ...register("description", { required: true }) }}
          id="descroption"
          required
          placeholder="Enter Description"
        />
      </div>
      <div className="input-group">
        <TextArea
          label="Reporting Name"
          register={{ ...register("reportingName", { required: true }) }}
          required
          id="reportingName"
          placeholder="Enter Reporting Name"
        />
      </div>
      <div className="button-group">
        <button
          className="btn secondary-btn"
          type="button"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="btn primary-btn"
          type="button"
          value="Next"
          onClick={() => {
            onButtonClick("pagetwo")
            // trigger([
            //   "name",
            //   // "classificationId",
            //   // "classificationValueId",
            //   // "payRunId",
            //   // "description",
            //   // "reportingName",
            // ])
            // console.log(trigger())
            //   onButtonClick("pagetwo")
            //   console.log(trigger())
            //   trigger().then((res) => {
            //     console.log(res)
            //     // if (!res) {
            //     //   return
            //     // } else {
            //     //   onButtonClick("pagetwo")
            //     // }
            //   })
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default EditFormPageOne
