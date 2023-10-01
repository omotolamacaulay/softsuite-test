import { UseFormRegister } from "react-hook-form"
// import { Select, ConfigProvider, Space, Input } from "antd"
import { Element } from "../../../../types"
import "../addelementform/ElementForm.scss"
import Input from "../../../layout/components/common/Input"
import TextArea from "../../../layout/components/common/TextArea"
import SelectInput from "../../../layout/components/common/SelectInput"

const FormpageOne = ({
  onButtonClick,
  closeModal,
  register,
}: {
  onButtonClick: (arg: string) => void
  closeModal: () => void
  register: UseFormRegister<Element>
}) => {
  // const {
  // trigger,
  // formState: { errors },
  // } = useForm<Element>()

  return (
    <div className="pg-1">
      <div className="form-group">
        <div className="input-group">
          <Input
            id="name"
            label="Name"
            register={{ ...register("name", { required: true }) }}
            required
            placeholder="Name"
          />
        </div>
        <div className="input-group">
          <SelectInput
            id="classificationId"
            label="Classification Id"
            required
            register={{ ...register("classificationId", { required: true }) }}
          >
            <>
              <option disabled value="">
                Classification Id
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
      </div>
      <div className="form-group">
        <div className="input-group">
          <SelectInput
            id="categoryValueId"
            label="Category Value Id"
            required
            register={{ ...register("categoryValueId", { required: true }) }}
          >
            <>
              <option disabled value="">
                Category Value
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
        <div className="input-group">
          <SelectInput
            label="Payrun id"
            id="payRunId"
            register={{ ...register("payRunId") }}
            required
          >
            <>
              <option disabled value="">
                Category Value
              </option>
              <option>gdsyds</option>
            </>
          </SelectInput>
        </div>
      </div>
      <div className="input-group">
        <TextArea
          label="Description"
          register={{ ...register("description", { required: true }) }}
          id="descroption"
          required
          placeholder="Enter Description"
        />
      </div>
      <div className="input-group">
        <TextArea
          label="Reporting Name"
          register={{ ...register("reportingName", { required: true }) }}
          required
          id="reportingName"
          placeholder="Enter Reporting Name"
        />
      </div>
      <div className="button-group">
        <button
          className="btn secondary-btn"
          type="button"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="btn primary-btn"
          type="button"
          value="Next"
          onClick={() => {
            onButtonClick("pagetwo")
            // trigger([
            //   "name",
            //   // "classificationId",
            //   // "classificationValueId",
            //   // "payRunId",
            //   // "description",
            //   // "reportingName",
            // ])
            // console.log(trigger())
            //   onButtonClick("pagetwo")
            //   console.log(trigger())
            //   trigger().then((res) => {
            //     console.log(res)
            //     // if (!res) {
            //     //   return
            //     // } else {
            //     //   onButtonClick("pagetwo")
            //     // }
            //   })
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default FormpageOne
