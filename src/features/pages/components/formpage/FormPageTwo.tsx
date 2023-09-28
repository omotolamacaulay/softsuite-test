import { useForm, Controller } from "react-hook-form"
import { Select, ConfigProvider, Space, Radio, Switch, DatePicker } from "antd"
import { Elements } from "../../../../types"
import { useRef } from "react"

const FormPageTwo = ({ onButtonClick }) => {
  const {
    register,
    control,
    // trigger,
    formState: { errors },
  } = useForm<Elements>()
  const inputRef = useRef(null)
  //   const handleChange = (value: string) => {
  //     console.log(`selected ${value}`)
  //   }

  //   const radioOnChange = (e: RadioChangeEvent) => {
  //     console.log("radio checked", e.target.value)
  //     setValue(e.target.value)
  //   }
  //   const onChange = (
  //     value: DatePickerProps["value"] | RangePickerProps["value"],
  //     dateString: [string, string] | string,
  //   ) => {
  //     console.log("Selected Time: ", value)
  //     console.log("Formatted Selected Time: ", dateString)
  //   }
  //   const onChangeSwitch = (checked: boolean) => {
  //     console.log(`switch to ${checked}`)
  //   }

  //   const onOk = (
  //     value: DatePickerProps["value"] | RangePickerProps["value"],
  //   ) => {
  //     console.log("onOk: ", value)
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
            <Controller
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
            />
            {/* <Space>
              <Controller
                name="effectiveStartDate"
                control={control}
                render={({ field }) => <DatePicker {...field} />}
              />
            </Space> */}

            {errors.effectiveStartDate && <p>This field is required</p>}
          </div>
          <div className="input-group">
            <label htmlFor="endDate">Effective End Date</label>
            <input
              className="input"
              type="date"
              {...register("effectiveEndDate", {
                valueAsDate: true,
              })}
            />
            {errors.effectiveEndDate && <p>This field is required</p>}
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="processingType">Processing Type</label>
            <div className="radio">
              <div className="radiogroup">
                <input
                  {...register("processingType", {
                    required: true,
                  })}
                  type="radio"
                  value={1}
                />
                <span>Open</span>
              </div>
              <div className="radiogroup">
                <input
                  {...register("processingType", {
                    required: true,
                  })}
                  type="radio"
                  value={2}
                />
                <span>Closed</span>
              </div>
            </div>

            {errors.processingType && <p>This field is required</p>}
          </div>
          <div className="input-group">
            <div className="">
              <label htmlFor="payFrequency">Pay Frequency</label>
              <div className="radio">
                <div className="radiogroup">
                  <input
                    {...register("payFrequency", {
                      required: true,
                    })}
                    type="radio"
                    value={1}
                  />
                  <span>Monthly</span>
                </div>
                <div className="radiogroup">
                  <input
                    {...register("payFrequency", {
                      required: true,
                    })}
                    type="radio"
                    value={2}
                  />
                  <span>Selected Months</span>
                </div>
              </div>

              {errors.payFrequency && <p>This field is required</p>}
            </div>
          </div>
        </div>
        <div className="input-group">
          <Space wrap>
            <label>Selected Pay Months</label>
            <Controller
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  //   disabled
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
            <div className="radio">
              <div className="radiogroup">
                <input
                  {...register("prorate", {
                    required: true,
                  })}
                  type="radio"
                  value={1}
                />
                <span>Yes</span>
              </div>
              <div className="radiogroup">
                <input
                  {...register("prorate", {
                    required: true,
                  })}
                  type="radio"
                  value={2}
                />
                <span>No</span>
              </div>
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
