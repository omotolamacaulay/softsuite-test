//@ts-nocheck
import { UseFormRegister } from "react-hook-form"
import Input from "../../../layout/components/common/Input"
import SelectInput from "../../../layout/components/common/SelectInput"
import RadioButton from "../../../layout/components/common/RadioButton"
import Checkbox from "../../../layout/components/common/Checkbox"
import { ElementLink } from "../../../../types"

const ElementFormPageThree = ({
  onButtonClick,
  closeModal,
  register,
  watch,
  trigger,
  errors,
}: {
  onButtonClick: (arg: string) => void
  closeModal: () => void
  register: UseFormRegister<ElementLink>
  watch: (arg: string) => void
  errors: Record<string, any>
  trigger
}) => {
  const amountType = watch("amountType")
  const status = watch("status")
  return (
    <div className="pg-1">
      <div className="form-group">
        <div className="input-group">
          <SelectInput
            id="amountType"
            label="Amount Type"
            required
            register={{ ...register("amountType", { required: true }) }}
          >
            <>
              <option value="">Select an Amount Type</option>
              <option>Fixed Value</option>
              <option>Rate of Salary</option>
            </>
          </SelectInput>
          {errors?.amountType?.type === "required" && (
            <span className="error-span">Amount Type is required.</span>
          )}
        </div>
        {/* <div className="input-group">
          <Input
            id={amountType === "Fixed Value" ? "amount" : "rate"}
            required={true}
            disabled={!amountType}
            label={
              amountType === "Fixed Value"
                ? "Amount"
                : amountType === "Rate of Salary"
                ? "Rate(%)"
                : "..."
            }
            register={
              amountType === "Fixed Value"
                ? { ...register("amount", { required: true }) }
                : { ...register("rate", { required: true }) }
            }
            placeholder="Input Amount"
          />
          {errors?.amount?.type === "required" && (
            <span className="error-span">This field is required.</span>
          )}
          {errors?.rate?.type === "required" && (
            <span className="error-span">This field is required.</span>
          )}
        </div> */}
        <div className="input-group">
          {amountType === "Fixed Value" ? (
            <Input
              id="amount"
              required={true}
              label="Amount"
              type="number"
              register={{ ...register("amount", { required: true }) }}
              placeholder="Input Amount"
            />
          ) : amountType === "Rate of Salary" ? (
            <Input
              id="rate"
              required={true}
              label="Rate"
              type="number"
              register={{ ...register("rate", { required: true }) }}
              placeholder="Input Rate"
            />
          ) : (
            <Input id="frt" disabled={true} label="..." />
          )}
          {errors?.amount?.type === "required" && (
            <span className="error-span">This field is required.</span>
          )}
          {errors?.rate?.type === "required" && (
            <span className="error-span">This field is required.</span>
          )}
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <Input
            label="Effective Start Date"
            register={{
              ...register("effectiveStartDate"),
            }}
            placeholder="Effective Start Date"
            id="effectiveStartDate"
            type="date"
          />
        </div>

        <div className="input-group">
          <Input
            label="Effective End Date"
            register={{
              ...register("effectiveEndDate"),
            }}
            placeholder="Effective End Date"
            id="effectiveEndDate"
            type="date"
          />
        </div>
      </div>

      <div className="form-group">
        <div className="input-group">
          <RadioButton
            label="Automate"
            id="automate"
            register={{ ...register("automate") }}
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
          onClick={() => onButtonClick("pagetwo")}
        >
          Back
        </button>
        <button className="btn primary-btn">Create A New Element Link</button>
      </div>
    </div>
  )
}

export default ElementFormPageThree
