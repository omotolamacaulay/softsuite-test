export type NavItem = {
  title: string
  icon: string
  path: string
  iconClosed?: string
  iconOpen?: string
  subNav?: {
    title: string
    path: string
  }[]
}

export interface Element {
  id: string
  name: string
  description: string
  payRunId: number
  payRunValueId: number
  classificationId: number
  classificationValueId: number
  categoryId: number
  categoryValueId: number
  reportingName: string
  processingType: string
  status: string
  prorate: string
  effectiveStartDate: string
  effectiveEndDate: string
  selectedMonths: [string]
  payFrequency: string
  modifiedBy: string
}

export interface ElementLink {
  name: string
  elementId: number
  suborganizationId: number
  locationId: number
  departmentId: number
  employeeCategoryId: number
  employeeCategoryValueId: number
  employeeTypeId: number
  employeeTypeValueId: number
  jobTitleId: number
  grade: number
  gradeStep: number
  unionId: number
  amountType: string
  amount: number
  rate: number
  effectiveStartDate: string
  effectiveEndDate: string
  status: string
  automate: string
  additionalInfo: [
    {
      lookupId: number
      lookupValueId: number
    },
  ]
}
export type InputProps = {
  label: string
  register: Record<string, string | any>
  required: boolean
  placeholder: string
  id: string
  type?: string
}
export type TextAreaProps = {
  label: string
  register: Record<string, string | any>
  required: boolean
  placeholder?: string
  id: string
}
export type RadioButtonProps = {
  label: string
  register: Record<string, string | any>
  required: boolean
  id: string
  options: { value: number; label: string }[]
}
export interface SelectInputProps {
  label: string
  register: Record<string, string | any>
  required: boolean
  id: string
  children: React.ReactNode
  multiple?: boolean
}
export interface CheckboxProps {
  label: string
  register: Record<string, string | any>
  required: boolean
  id: string
}
