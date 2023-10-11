import { CheckboxProps } from "../../../../types"

const Checkbox: React.FC<CheckboxProps> = ({ label, register, id }) => {
  return (
    <div>
      <label htmlFor={id}>
        <div>{label}</div>
        <div className="radio">
          <div className="switch">
            <input type="checkbox" id={id} {...register} />
            <span className="slider"></span>
          </div>
        </div>
      </label>
      {/* <span>{register(label).value ? "Active" : "Inactive"}</span> */}
    </div>
  )
}

export default Checkbox
