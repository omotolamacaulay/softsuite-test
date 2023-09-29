import { useForm, Controller } from "react-hook-form"
import { Select, ConfigProvider, Space, Radio, Switch, DatePicker } from "antd"
import { Elements } from "../../../../types"
// import { useRef } from "react"

const FormPageTwo = ({ onButtonClick, control }) => {
  const {
    register,

    // trigger,
    formState: { errors },
  } = useForm<Elements>()
  // const inputRef = useRef(null)
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
          DatePicker: {
            colorPrimary: "#4baa79",
            colorLink: "#4baa79",
            colorLinkActive: "#4baa79",
            controlItemBgActive: "#f3fff1",
          },
        },
      }}
    >
      <div className="pg-1">
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="effectiveStartDate">Effective Start Date</label>
            {/* <Controller
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  ref={inputRef}
                  className="input"
                  type="date"
                  defaultValue="Initial value"
                />
              )}
              {...register("effectiveStartDate", {
                valueAsDate: true,
              })}
            /> */}
            <Space>
              <Controller
                // name="effectiveStartDate"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} style={{ width: "100%" }} />
                )}
                {...register("effectiveStartDate", {
                  valueAsDate: true,
                })}
              />
            </Space>

            {errors.effectiveStartDate && <p>This field is required</p>}
          </div>
          <div className="input-group">
            <label htmlFor="effectiveEndDate">Effective End Date</label>
            <Space>
              <Controller
                // name="effectiveStartDate"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} style={{ width: "100%" }} />
                )}
                {...register("effectiveEndDate", {
                  valueAsDate: true,
                })}
              />
            </Space>
            {errors.effectiveEndDate && <p>This field is required</p>}
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="processingType">Processing Type</label>
            <div className="">
              <Controller
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field} className="radio">
                    <Radio value={1}>Open</Radio>
                    <Radio value={2}>Closed</Radio>
                  </Radio.Group>
                )}
                {...register("processingType", {
                  valueAsDate: true,
                })}
              />
            </div>

            {errors.processingType && <p>This field is required</p>}
          </div>
          <div className="input-group">
            <label htmlFor="payFrequency">Pay Frequency</label>
            <div className="">
              <Controller
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field} className="radio">
                    <Radio value={1}>Monthly</Radio>
                    <Radio value={2}>Selected Months</Radio>
                  </Radio.Group>
                )}
                {...register("payFrequency", {
                  valueAsDate: true,
                })}
              />
            </div>

            {errors.payFrequency && <p>This field is required</p>}
          </div>
        </div>
        <div className="input-group">
          <Space wrap>
            <label>Selected Pay Months</label>
            <Controller
              // name="classificationId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  style={{ width: "100%" }}
                  options={[
                    {
                      value: "January",
                      label: "January",
                    },
                    { value: "February", label: "February" },
                    { value: "March", label: "March" },
                    { value: "April", label: "April" },
                    { value: "May", label: "May" },
                    { value: "June", label: "June" },
                    { value: "July", label: "July" },
                    { value: "August", label: "August" },
                    { value: "September", label: "September" },
                    { value: "October", label: "October" },
                    { value: "November", label: "November" },
                    { value: "December", label: "December" },
                  ]}
                />
              )}
              {...register("selectedMonths", {
                required: true,
              })}
            />

            {errors.selectedMonths && <p>This field is required</p>}
          </Space>
        </div>

        <div className="form-group">
          <div className="input-group">
            <label htmlFor="prorate">Prorate</label>
            <div className="">
              <Controller
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field} className="radio">
                    <Radio value={1}>Yes</Radio>
                    <Radio value={2}>No</Radio>
                  </Radio.Group>
                )}
                {...register("prorate", {
                  valueAsDate: true,
                })}
              />
            </div>

            {errors.prorate && <p>This field is required</p>}
          </div>

          <div className="input-group">
            <Space wrap>
              <label>Element Classification</label>
              <div className="radio">
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      defaultChecked
                      // onChange={onChangeSwitch}
                    />
                  )}
                />
                <span>Active</span>
              </div>
              {errors.status && <p>This field is required</p>}
            </Space>
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn secondary-btn"
            type="button"
            onClick={() => onButtonClick("pageone")}
          >
            Back
          </button>
          <button className="btn primary-btn">Create New Element</button>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default FormPageTwo
