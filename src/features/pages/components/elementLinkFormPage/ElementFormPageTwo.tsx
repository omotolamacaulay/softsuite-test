import { UseFormRegister } from "react-hook-form"
import { ElementLink } from "../../../../types"
import SelectInput from "../../../layout/components/common/SelectInput"

const ElementFormPageTwo = ({
  onButtonClick,
  register,
}: {
  register: UseFormRegister<ElementLink>
  onButtonClick: (arg: string) => void
}) => {
  return (
    <div className="pg-1">
      <div className="form-group">
        <div className="input-group">
          <SelectInput
            id="grade"
            label="Grade"
            required
            register={{ ...register("grade") }}
          >
            <>
              <option disabled value="">
                Select a Grade
              </option>
              <option>Intern</option>
              <option>Junior Level</option>
              <option>Intermediate Level</option>
              <option>Senior Level</option>
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <SelectInput
            id="gradeStep"
            label="Grade Step"
            required
            register={{ ...register("gradeStep") }}
          >
            <>
              <option disabled value="">
                Select a Grade Step
              </option>
              <option>Undergraduate</option>
              <option>Post-graduate</option>
              <option>Novice</option>
              <option>Learned</option>
              <option>Experienced</option>
              <option>Well-Experienced</option>
              <option>Expert</option>
              <option>Supervisor</option>
              <option>Team Lead</option>
            </>
          </SelectInput>
        </div>
      </div>
      <div className="input-group">
        <SelectInput
          id="unionId"
          label="Union"
          required
          register={{ ...register("unionId") }}
        >
          <>
            <option disabled value="">
              Select a Union
            </option>
            <option>PPND</option>
            <option>HNLD</option>
          </>
        </SelectInput>
      </div>
      <label htmlFor="">Additional Assignment Information</label>
      <div className="button-group">
        <button
          className="btn secondary-btn"
          type="button"
          onClick={() => onButtonClick("pageone")}
        >
          Back
        </button>
        <button
          className="btn primary-btn"
          type="button"
          value="Next"
          onClick={() => {
            onButtonClick("pagethree")
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ElementFormPageTwo
