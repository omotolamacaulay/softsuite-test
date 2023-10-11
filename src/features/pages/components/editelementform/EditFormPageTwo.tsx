//@ts-nocheck
import { UseFormRegister, useForm } from "react-hook-form"
import { Element } from "../../../../types"
import Input from "../../../layout/components/common/Input"
import RadioButton from "../../../layout/components/common/RadioButton"
import SelectInput from "../../../layout/components/common/SelectInput"
import Checkbox from "../../../layout/components/common/Checkbox"

const monthOptions = [
  {
    value: "January",
    label: "January",
  },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
]

interface FormPageTwoProps {
  onButtonClick: (arg: string) => void
  register: UseFormRegister<Element>
  watch: (arg: string) => void
}
const EditFormPageTwo = ({
  onButtonClick,
  register,
  watch,
  control,
}: FormPageTwoProps) => {
  const {
    formState: { errors },
  } = useForm<Element>()

  const selectedPayFrequency = watch("payFrequency")
  const status = watch("status")
  console.log(status)
  return (
    <div className="pg-1">
      <div className="form-group">
        <div className="input-group">
          <Input
            label="Effective Start Date"
            register={{
              ...register("effectiveStartDate", {
                required: true,
                // valueAsDate: true,
              }),
            }}
            required
            placeholder="Effective Start Date"
            id="effectiveStartDate"
            type="date"
          />
        </div>
        <div className="input-group">
          <Input
            label="Effective End Date"
            register={{
              ...register("effectiveEndDate", {
                required: true,
                // valueAsDate: true,
              }),
            }}
            required
            placeholder="Effective End Date"
            id="effectiveEndDate"
            type="date"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <RadioButton
            label="Processing Type"
            id="processingType"
            register={{ ...register("processingType", { required: true }) }}
            required={true}
            options={[
              { value: 1, label: "Open" },
              { value: 2, label: "Closed" },
            ]}
          />
        </div>
        <div className="input-group">
          <RadioButton
            label="Pay Frequency"
            id="payFrequency"
            register={{ ...register("payFrequency", { required: true }) }}
            required={true}
            options={[
              { value: 1, label: "Monthly" },
              { value: 2, label: "Selected Months" },
            ]}
          />
        </div>
      </div>
      <div className="input-group">
        <SelectInput
          label="Selected Months"
          id="selectedMonths"
          register={{ ...register("selectedMonths", { required: true }) }}
          // required={true}
          disabled={selectedPayFrequency !== "2"}
          multiple={true}
        >
          {monthOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
          <></>
        </SelectInput>
      </div>

      <div className="form-group">
        <div className="input-group">
          <RadioButton
            id="prorate"
            label="Prorate"
            register={{ ...register("prorate", { required: true }) }}
            required={true}
            options={[
              { value: 1, label: "Yes" },
              { value: 2, label: "No" },
            ]}
          />
        </div>

        <div className="input-group">
          <Checkbox
            label="Status"
            id="status"
            value={status === "" ? false : true}
            required={true}
            register={{ ...register("status") }}
          />
          <span className="status-span">
            {status === true ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="button-group">
        <button
          className="btn secondary-btn"
          type="button"
          onClick={() => onButtonClick("pageone")}
        >
          Back
        </button>
        <button className="btn primary-btn">Edit Element</button>
      </div>
    </div>
  )
}

export default EditFormPageTwo
