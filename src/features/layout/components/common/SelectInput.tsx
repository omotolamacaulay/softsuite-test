import { SelectInputProps } from "../../../../types"

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  register,
  required,
  id,
  children,
  multiple,
  disabled,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        {...register}
        id={id}
        required={required}
        multiple={multiple}
        disabled={disabled}
      >
        {children}
      </select>
    </div>
  )
}

export default SelectInput
