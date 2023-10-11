//@ts-nocheck
import { useEffect } from "react"
import { UseFormRegister } from "react-hook-form"
import { ElementLink } from "../../../../types"
import Input from "../../../layout/components/common/Input"
import SelectInput from "../../../layout/components/common/SelectInput"
import { fetchDepartments } from "../../../counter/lookupSlice"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"

const EditElementLinkFormPageOne = ({
  onButtonClick,
  closeModal,
  register,
  watch,
  suborganizationsData,
  jobTitleData,
  locationData,
  employeeTypeData,
  employeeCategoryData,
}: {
  onButtonClick: (arg: string) => void
  closeModal: () => void
  register: UseFormRegister<ElementLink>
  watch: (arg: string) => void
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
}) => {
  const dispatch = useAppDispatch()
  const departmentsData = useAppSelector((state) => state.lookups.departments)
  const selectedSuborganizationId = watch("suborganizationId")
  console.log(selectedSuborganizationId)
  useEffect(() => {
    if (selectedSuborganizationId > 0) {
      dispatch(fetchDepartments(selectedSuborganizationId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSuborganizationId])
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
              {departmentsData &&
                departmentsData.length > 0 &&
                departmentsData.map((department) => (
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
