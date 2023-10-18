//@ts-nocheck
import { UseFormRegister } from "react-hook-form"
import { ElementLink } from "../../../../types"
import Input from "../../../layout/components/common/Input"
import SelectInput from "../../../layout/components/common/SelectInput"
import { useFetchDepartmentsQuery } from "../../../counter/apiSlice"

const ElementFormPageOne = ({
  onButtonClick,
  closeModal,
  register,
  watch,
  trigger,
  errors,
  suborganizationsData,
  jobTitleData,
  locationData,
  employeeTypeData,
  employeeCategoryData,
}: {
  onButtonClick: (arg: string) => void
  closeModal: () => void
  register: UseFormRegister<ElementLink>
  errors: Record<string, any>
  trigger
  suborganizationsData: {
    id: number
    name: string
  }[]
  jobTitleData: {
    id: number
    name: string
  }[]
  locationData: {
    id: number
    name: string
  }[]
  employeeTypeData: {
    id: number
    name: string
  }[]
  employeeCategoryData: {
    id: number
    name: string
  }[]
  watch: (arg: string) => void
}) => {
  const selectedSuborganizationId = watch("suborganizationId")
  const { data: departmentsData, isSuccess } = useFetchDepartmentsQuery(
    selectedSuborganizationId,
    {
      skip: selectedSuborganizationId <= 0, // Skip the query if selectedSuborganizationId is less than or equal to 0
    },
  )
  return (
    <div className="pg-1">
      <div className="input-group">
        <Input
          id="name"
          label="Element Link Name"
          register={{
            ...register("name", {
              required: true,
              maxLength: 50,
              pattern: /^[A-Za-z]+$/i,
            }),
          }}
          required
          placeholder="Input Name"
        />
        {errors?.name?.type === "required" && (
          <span className="error-span">This field is required</span>
        )}
        {errors?.name?.type === "maxLength" && (
          <p>First name cannot exceed 50 characters</p>
        )}
        {errors?.name?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
      </div>
      <div className="form-group">
        <div className="input-group">
          <SelectInput
            id="suborganizationId"
            label="Suborganization"
            required
            register={{ ...register("suborganizationId") }}
          >
            <>
              <option value="">Select a Suborganization</option>
              {suborganizationsData.map((suborganization) => (
                <option key={suborganization.id} value={suborganization.id}>
                  {suborganization.name}
                </option>
              ))}
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <SelectInput
            id="departmentId"
            label="Department"
            required
            disabled={!selectedSuborganizationId}
            register={{ ...register("departmentId") }}
          >
            <>
              <option value="">Select a Department</option>
              {isSuccess &&
                departmentsData.data.length > 0 &&
                departmentsData.data.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
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
            register={{ ...register("jobTitleId") }}
          >
            <>
              <option disabled value="">
                Select a Job Title
              </option>
              {jobTitleData.map((jobTitle) => (
                <option key={jobTitle.id} value={jobTitle.id}>
                  {jobTitle.name}
                </option>
              ))}
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <SelectInput
            id="locationId"
            label="Location"
            required
            register={{ ...register("locationId") }}
          >
            <>
              <option disabled value="">
                Select a Location
              </option>
              {locationData.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
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
              {employeeTypeData.map((employeeType) => (
                <option key={employeeType.id} value={employeeType.id}>
                  {employeeType.name}
                </option>
              ))}
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
              {employeeCategoryData.map((employeeCategory) => (
                <option key={employeeCategory.id} value={employeeCategory.id}>
                  {employeeCategory.name}
                </option>
              ))}
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
          onClick={async () => {
            const output = await trigger()
            // console.log(output)
            if (output === true) {
              onButtonClick("pagetwo")
            } else {
              return
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ElementFormPageOne
