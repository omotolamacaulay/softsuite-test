import { TextAreaProps } from "../../../../types"

const TextArea = ({
  label,
  register,
  id,
  required,
  placeholder,
}: TextAreaProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        {...register}
        required={required}
        placeholder={placeholder || ""}
      ></textarea>
    </>
  )
}

export default TextArea
