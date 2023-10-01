import { useForm, Controller } from "react-hook-form"
import { Select, ConfigProvider, Space, Input } from "antd"
import { Element } from "../../../../types"

const ElementFormPageOne = ({ onButtonClick, control }) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<Element>()
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
        </div>
        <div className="form-group">
          <div className="input-group">
            <Space wrap>
              <label>Suborganization</label>
              <Controller
                name="suborganizationId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select a Suborganization",
                      },
                      { value: 1, label: "Pre-tax Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
              />

              {errors.suborganizationId && <p>This field is required</p>}
            </Space>
          </div>
          <div className="input-group">
            <Space wrap>
              <label>Department</label>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select a Department",
                      },
                      { value: 1, label: "Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
              />

              {errors.departmentId && <p>This field is required</p>}
            </Space>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <Space wrap>
              <label>Job Title</label>
              <Controller
                control={control}
                name="jobTitleId"
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select a Job Title",
                      },
                      { value: 1, label: "Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
              />

              {errors.payRunId && <p>This field is required</p>}
            </Space>
          </div>
          <div className="input-group">
            <Space wrap>
              <label>Location</label>
              <Controller
                control={control}
                name="locationId"
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select a Location",
                      },
                      { value: 1, label: "Deduction" },
                      { value: 2, label: "Variation" },
                      { value: 3, label: "Payroll" },
                    ]}
                  />
                )}
              />

              {errors.payRunId && <p>This field is required</p>}
            </Space>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <Space wrap>
              <label>Employee Type</label>
              <Controller
                control={control}
                name="jobTitleId"
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select an employee Type",
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
          <div className="input-group">
            <Space wrap>
              <label>Employee Category</label>
              <Controller
                control={control}
                name="employeeCategoryId"
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    options={[
                      {
                        value: 0,
                        label: "Select a Employee Category",
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
        <div className="button-group">
          <button
            className="btn secondary-btn"
            type="button"
            //   onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn primary-btn"
            type="button"
            value="Next"
            onClick={() => {
              onButtonClick("pagetwo")
            }}
          >
            Next
          </button>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default ElementFormPageOne
