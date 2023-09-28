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

export interface Elements {
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

export interface ElementDetail extends Elements {
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
