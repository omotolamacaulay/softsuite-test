import { useForm, Controller } from "react-hook-form"
import {
  Select,
  ConfigProvider,
  Space,
  Radio,
  Switch,
  DatePicker,
  Input,
} from "antd"
import { ElementDetail } from "../../../../types"
import { useRef } from "react"

const ElementFormPageThree = ({ onButtonClick, control }) => {
  const {
    register,

    // trigger,
    formState: { errors },
  } = useForm<ElementDetail>()
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
            <Space wrap>
              <label>Amount Type</label>
              <Controller
                // name="amountType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select an Amount Type",
                      },
                      { value: 1, label: "Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
                {...register("amountType", {
                  required: true,
                })}
              />

              {errors.amountType && <p>This field is required</p>}
            </Space>
          </div>
          <div className="input-group">
            <label>Enter Amount</label>
            <Controller
              control={control}
              //   name="name"
              render={({ field }) => (
                <Input {...field} placeholder="Input Name" />
              )}
              {...register("amount", {
                required: true,
              })}
            />
            {errors?.name?.type === "required" && <p>This field is required</p>}
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="effectiveStartDate">Effective Start Date</label>
            <Space>
              <Controller
                name="effectiveStartDate"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} style={{ width: "100%" }} />
                )}
              />
            </Space>
          </div>
          <div className="input-group">
            <label htmlFor="effectiveEndDate">Effective End Date</label>
            <Space>
              <Controller
                name="effectiveStartDate"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} style={{ width: "100%" }} />
                )}
              />
            </Space>
          </div>
        </div>
        {/* <div className="form-group">
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
        </div> */}

        <div className="form-group">
          <div className="input-group">
            <label htmlFor="automate">Automate</label>
            <div className="">
              <Controller
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field} className="radio">
                    <Radio value={1}>Yes</Radio>
                    <Radio value={2}>No</Radio>
                  </Radio.Group>
                )}
                {...register("automate", {})}
              />
            </div>
          </div>

          <div className="input-group">
            <Space wrap>
              <label>Status</label>
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
            </Space>
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn secondary-btn"
            type="button"
            onClick={() => onButtonClick("pagetwo")}
          >
            Back
          </button>
          <button className="btn primary-btn">Create A New Element Link</button>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default ElementFormPageThree
