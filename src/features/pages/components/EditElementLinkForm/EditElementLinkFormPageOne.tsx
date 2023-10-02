import { UseFormRegister } from "react-hook-form"
import { ElementLink } from "../../../../types"
import Input from "../../../layout/components/common/Input"
import SelectInput from "../../../layout/components/common/SelectInput"

const EditElementLinkFormPageOne = ({
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
      <div className="input-group">
        <Input
          id="name"
          label="Element Link Name"
          register={{ ...register("name", { required: true }) }}
          required
          placeholder="Input Name"
        />
      </div>
      <div className="form-group">
        <div className="input-group">
          <SelectInput
            id="suborganizationId"
            label="Suborganization"
            required
            register={{ ...register("suborganizationId", { required: true }) }}
          >
            <>
              <option disabled value="">
                Suborganization
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <SelectInput
            id="departmentId"
            label="Department"
            required
            register={{ ...register("departmentId", { required: true }) }}
          >
            <>
              <option disabled value="">
                Select a Department
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <SelectInput
            id="jobTitleId"
            label="Job Title"
            required
            register={{ ...register("jobTitleId", { required: true }) }}
          >
            <>
              <option disabled value="">
                Select a Job Title
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <SelectInput
            id="locationId"
            label="Job Title"
            required
            register={{ ...register("locationId") }}
          >
            <>
              <option disabled value="">
                Select a Location
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <SelectInput
            id="employeeTypeId"
            label="Employee Type"
            required
            register={{ ...register("employeeTypeId") }}
          >
            <>
              <option disabled value="">
                Select an employee Type
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <SelectInput
            id="employeeCategoryId"
            label="Employee Category"
            required
            register={{ ...register("employeeCategoryId") }}
          >
            <>
              <option disabled value="">
                Select a Employee Category
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
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
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default EditElementLinkFormPageOne
