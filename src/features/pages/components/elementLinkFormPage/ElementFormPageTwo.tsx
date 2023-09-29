import { useForm, Controller } from "react-hook-form"
import { Select, ConfigProvider, Space, Input } from "antd"
import { ElementDetail } from "../../../../types"

const ElementFormPageTwo = ({ onButtonClick, control }) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<ElementDetail>()
  //   const handleChange = (value: string) => {
  //     console.log(`selected ${value}`)
  //   }
  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: "#4BAA79",
            colorPrimaryHover: "#4BAA79",
            colorTextQuaternary: "#E05453",
            colorTextTertiary: "#E05453",
          },
          Radio: {
            colorPrimary: "#4BAA79",
          },
          Select: {
            optionSelectedBg: "#f3fff1",
          },
        },
      }}
    >
      <div className="pg-1">
        {/* <div className="form-group">
          <div className="input-group">
            <label>Element Link Name</label>
            <Controller
              control={control}
              //   name="name"
              render={({ field }) => (
                <Input {...field} placeholder="Input Name" />
              )}
              {...register("name", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors?.name?.type === "required" && <p>This field is required</p>}
            {errors?.name?.type === "maxLength" && (
              <p>Name cannot exceed 30 characters</p>
            )}
            {errors?.name?.type === "pattern" && (
              <p>Alphabetical characters only</p>
            )}
          </div>
        </div> */}
        <div className="form-group">
          <div className="input-group">
            <Space wrap>
              <label>Grade</label>
              <Controller
                name="grade"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select a Grade",
                      },
                      { value: 1, label: "Pre-tax Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
              />
            </Space>
          </div>
          <div className="input-group">
            <Space wrap>
              <label>Grade Step</label>
              <Controller
                name="gradeStep"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select a Grade Step",
                      },
                      { value: 1, label: "Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
              />
            </Space>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <Space wrap>
              <label>Union</label>
              <Controller
                control={control}
                name="unionId"
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select a Union",
                      },
                      { value: 1, label: "Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
              />
            </Space>
          </div>
        </div>
        <label htmlFor="">Additional Assignment Information</label>
        <div className="form-group">
          <div className="input-group">
            <div>
              <Space wrap>
                <label>Pension</label>
                <Controller
                  control={control}
                  name="lookupId"
                  render={({ field }) => (
                    <Select
                      {...field}
                      style={{ width: "100%" }}
                      options={[
                        {
                          value: 0,
                          label: "Select Pension",
                        },
                        { value: 1, label: "Deduction" },
                        { value: 2, label: "Variation" },
                        { value: 3, label: "Payroll" },
                      ]}
                    />
                  )}
                />
              </Space>
            </div>
          </div>
          <div className="input-group">
            <Space wrap>
              <label>Housing</label>
              <Controller
                control={control}
                name="lookupValueId"
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select Housing",
                      },
                      { value: 1, label: "Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
              />
            </Space>
          </div>
        </div>
        <div className="input-group">
          <Space wrap>
            <label>Loyalty Bonus</label>
            <Controller
              control={control}
              name="lookupValueId"
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: "100%" }}
                  options={[
                    {
                      value: 0,
                      label: "Select Loyalty Bonus",
                    },
                    { value: 1, label: "Deduction" },
                    { value: 2, label: "Variation" },
                    { value: 3, label: "Payroll" },
                  ]}
                />
              )}
            />
          </Space>
        </div>
        <div className="button-group">
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
    </ConfigProvider>
  )
}

export default ElementFormPageTwo
