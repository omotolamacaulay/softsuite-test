import { useForm, Controller } from "react-hook-form"
import { Select, ConfigProvider, Space, Input } from "antd"
import { Elements } from "../../../../types"
const { TextArea } = Input
const FormpageOne = ({ onButtonClick, control, closeModal }) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<Elements>()
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
        <div className="form-group">
          <div className="input-group">
            <label>Name</label>
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
              <p>Name cannot exceed 20 characters</p>
            )}
            {errors?.name?.type === "pattern" && (
              <p>Alphabetical characters only</p>
            )}
          </div>
          <div className="input-group">
            <Space wrap>
              <label>Element Classification</label>
              <Controller
                name="classificationId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select Classification",
                      },
                      { value: 1, label: "Pre-tax Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
                // {...register("classificationId", {
                //   required: true,
                // })}
              />

              {errors.classificationId && <p>This field is required</p>}
            </Space>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <Space wrap>
              <label>Element Category</label>
              <Controller
                name="classificationValueId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select Element Category",
                      },
                      { value: 1, label: "Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
                // {...register("classificationValueId", {
                //   required: true,
                // })}
              />

              {errors.classificationValueId && <p>This field is required</p>}
            </Space>
          </div>
          <div className="input-group">
            <Space wrap>
              <label>Payrun</label>
              <Controller
                control={control}
                name="payRunId"
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select Payrun",
                      },
                      { value: 1, label: "Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
                // {...register("payRunId", {
                //   required: true,
                // })}
              />

              {errors.payRunId && <p>This field is required</p>}
            </Space>
          </div>
        </div>
        <div className="input-group">
          <div>
            <label htmlFor="">Description</label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextArea {...field} placeholder="Input Description" />
              )}
              //   {...register("description", {
              //     required: true,
              //   })}
            />
            {errors.description && <p>This field is required</p>}
          </div>
        </div>
        <div className="input-group">
          <div>
            <label htmlFor="">Reporting Name</label>
            <Controller
              control={control}
              name="reportingName"
              render={({ field }) => (
                <TextArea {...field} placeholder="Input Reporting Name" />
              )}
              //   {...register("reportingName", {
              //     required: true,
              //   })}
            />
            {errors.reportingName && <p>This field is required</p>}
          </div>
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
              trigger([
                "name",
                // "classificationId",
                // "classificationValueId",
                // "payRunId",
                // "description",
                // "reportingName",
              ])
              console.log(trigger())
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
    </ConfigProvider>
  )
}

export default FormpageOne
