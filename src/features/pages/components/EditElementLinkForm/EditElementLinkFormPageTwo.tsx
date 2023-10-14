//@ts-nocheck
import { useEffect, useState } from "react"
import { UseFormRegister } from "react-hook-form"
import { ElementLink } from "../../../../types"
import SelectInput from "../../../layout/components/common/SelectInput"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { fetchGradeSteps } from "../../../counter/lookupSlice"

const EditElementLinkFormPageTwo = ({
  onButtonClick,
  register,
  watch,
  gradeData,
  unionData,
  housingData,
  wardrobeData,
  securityData,
}: {
  register: UseFormRegister<ElementLink>
  onButtonClick: (arg: string) => void
  gradeData: {
    id: number
    name: string
  }[]
  unionData: {
    id: number
    name: string
  }[]
  housingData: {
    id: number
    name: string
  }[]
  wardrobeData: {
    id: number
    name: string
  }[]
  securityData: {
    id: number
    name: string
  }[]
  watch: (arg: string) => void
}) => {
  // const {
  //   register,
  //   trigger,
  //   formState: { errors },
  // } = useForm<ElementDetail>()
  //   const handleChange = (value: string) => {
  //     console.log(`selected ${value}`)
  //   }
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const selectedGradeStepsId = watch("grade")
  const { data: gradeStepsData, isSuccess } = useFetchGradeStepsQuery(
    selectedGradeStepsId,
    {
      skip: selectedGradeStepsId <= 0,
    },
  )
  const toggleAdd = () => {
    setIsOpen((prev) => !prev)
  }
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
              {gradeData.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <SelectInput
            id="gradeStep"
            label="Grade Step"
            required
            disabled={!selectedGradeStepsId}
            register={{ ...register("gradeStep") }}
          >
            <>
              <option value="">Select a Grade Step</option>
              {isSuccess &&
                gradeStepsData.length > 0 &&
                gradeStepsData.map((gradeStep) => (
                  <option key={gradeStep.id} value={gradeStep.id}>
                    {gradeStep.name} - {gradeStep.amount}
                  </option>
                ))}
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
            {unionData.map((union) => (
              <option key={union.id} value={union.id}>
                {union.name}
              </option>
            ))}
          </>
        </SelectInput>
      </div>
      <label
        htmlFor=""
        role="button"
        onClick={toggleAdd}
        className="additional"
      >
        Additional Assignment Information
      </label>
      <div className={`closeAdd ${isOpen ? "openAdd" : ""}`}>
        <div className="form-group">
          <div className="input-group">
            <SelectInput
              id="additionalInfo[0].lookupValueId"
              label="Wardrobe"
              required
              register={{
                ...register("additionalInfo[0].lookupValueId"),
              }}
            >
              <>
                <option value="">Select Wardrobe</option>
                {wardrobeData.map((wardrobe) => (
                  <option key={wardrobe.id} value={wardrobe.id}>
                    {wardrobe.name}
                  </option>
                ))}
              </>
            </SelectInput>
          </div>
          <div className="input-group">
            <SelectInput
              id="additionalInfo[1].lookupValueId"
              label="Housing"
              required
              register={{ ...register("additionalInfo[1].lookupValueId") }}
            >
              <>
                <option value="">Select Housing</option>
                {housingData.map((housing) => (
                  <option key={housing.id} value={housing.id}>
                    {housing.name}
                  </option>
                ))}
              </>
            </SelectInput>
          </div>
        </div>
        <div className="input-group">
          <SelectInput
            id="additionalInfo[2].lookupValueId"
            label="Security"
            required
            register={{ ...register("additionalInfo[2].lookupValueId") }}
          >
            <>
              <option value="">Select Security</option>
              {securityData.map((security) => (
                <option key={security.id} value={security.id}>
                  {security.name}
                </option>
              ))}
            </>
          </SelectInput>
        </div>
      </div>
      <div className="button-group" style={{ marginTop: "24px" }}>
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

export default EditElementLinkFormPageTwo
