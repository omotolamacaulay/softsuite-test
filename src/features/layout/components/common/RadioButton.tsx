import { RadioButtonProps } from "../../../../types"

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  register,
  required,
  options,
}) => {
  return (
    <div>
      <label>{label}</label>
      <div className="radio">
        {options.map((option) => (
          <div className="radiogroup" key={option.value}>
            <input
              className=""
              type="radio"
              value={option.value}
              {...register}
            />
            <label>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RadioButton
