import { SelectInputProps } from "../../../../types"

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  register,
  required,
  id,
  children,
  multiple,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select {...register} id={id} required={required} multiple={multiple}>
        {children}
      </select>
    </div>
  )
}

export default SelectInput
