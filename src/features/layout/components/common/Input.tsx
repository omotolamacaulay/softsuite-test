import { InputProps } from "../../../../types"

const Input = ({ label, register, required, id, type }: InputProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type ? type : "text"} {...register} required />
    </>
  )
}

export default Input
