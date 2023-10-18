import { InputProps } from "../../../../types"

const Input = ({
  label,
  register,
  required,
  id,
  type,
  disabled,
}: InputProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type ? type : "text"}
        disabled={disabled}
        {...register}
        required
      />
    </>
  )
}

export default Input
