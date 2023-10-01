import { CheckboxProps } from "../../../../types"

const Checkbox: React.FC<CheckboxProps> = ({ label, register, id }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="switch">
        <input type="checkbox" id={id} {...register} />
        <span className="slider"></span>
      </div>
      {/* <span>{register(label).value ? "Active" : "Inactive"}</span> */}
    </div>
  )
}

export default Checkbox
