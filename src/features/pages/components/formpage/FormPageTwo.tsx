//@ts-nocheck
import { UseFormRegister } from "react-hook-form"
import { Element } from "../../../../types"
import Input from "../../../layout/components/common/Input"
import RadioButton from "../../../layout/components/common/RadioButton"
import SelectInput from "../../../layout/components/common/SelectInput"
import Checkbox from "../../../layout/components/common/Checkbox"
// import dayjs from "dayjs"

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
  trigger
  errors: Record<string, any>
}
const FormPageTwo = ({
  onButtonClick,
  register,
  watch,
  trigger,
  errors,
}: FormPageTwoProps) => {
  const selectedPayFrequency = watch("payFrequency")
  const status = watch("status")

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
            placeholder="Effective Start Date"
            id="effectiveStartDate"
            type="date"
          />
          {errors?.effectiveStartDate?.type === "required" && (
            <span className="error-span">
              Please input an effective start date
            </span>
          )}
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
            placeholder="Effective End Date"
            id="effectiveEndDate"
            type="date"
          />
          {errors?.effectiveEndDate?.type === "required" && (
            <span className="error-span">
              Please input an effective end date
            </span>
          )}
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <RadioButton
            label="Processing Type"
            id="processingType"
            register={{ ...register("processingType", { required: true }) }}
            // required={true}
            options={[
              { value: 1, label: "Open" },
              { value: 2, label: "Closed" },
            ]}
          />
          {errors?.processingType?.type === "required" && (
            <span className="error-span">Please select a Processing Type</span>
          )}
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
          {errors?.payFrequency?.type === "required" && (
            <span className="error-span">Please select the Pay Frequency</span>
          )}
        </div>
      </div>
      <div className="input-group">
        <SelectInput
          label="Selected Months"
          id="selectedMonths"
          register={{ ...register("selectedMonths") }}
          // required={true}
          disabled={selectedPayFrequency !== "2"}
          multiple={true}
        >
          {monthOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
          {/* {errors?.selectedMonths?.type === "required" && (
            <p>This field is required</p>
          )} */}
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
          {errors?.prorate?.type === "required" && (
            <span className="error-span">Prorate is required</span>
          )}
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
          {/* {errors?.status?.type === "required" && (
            <span className="error-span">This field is required</span>
          )} */}
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
        <button className="btn primary-btn">Create New Element</button>
      </div>
    </div>
  )
}

export default FormPageTwo
