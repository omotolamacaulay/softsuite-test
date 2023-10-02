import { UseFormRegister } from "react-hook-form"
import Input from "../../../layout/components/common/Input"
import SelectInput from "../../../layout/components/common/SelectInput"
import RadioButton from "../../../layout/components/common/RadioButton"
import { ElementLink } from "../../../../types"

const ElementFormPageThree = ({
  onButtonClick,
  closeModal,
  register,
}: {
  onButtonClick: (arg: string) => void
  closeModal: () => void
  register: UseFormRegister<ElementLink>
}) => {
  return (
    <div className="pg-1">
      <div className="form-group">
        <div className="input-group">
          <SelectInput
            id="amountType"
            label="Amount Type"
            required
            register={{ ...register("amountType") }}
          >
            <>
              <option disabled value="">
                Select an Amount Type
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <Input
            id="amount"
            label="Enter Amount"
            register={{ ...register("amount") }}
            placeholder="Input Amount"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <Input
            label="Effective Start Date"
            register={{
              ...register("effectiveStartDate"),
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
              ...register("effectiveEndDate"),
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
          {/* <Checkbox
            label="Status"
            id="status"
            required={true}
            register={{ ...register("status", { required: true }) }}
          /> */}
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
