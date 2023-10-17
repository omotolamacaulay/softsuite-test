//@ts-nocheck
import { useFetchEmployeeTypeQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useFetchemployeeType(employeeTypeId: string) {
  const { data: employeeTypeData } = useFetchEmployeeTypeQuery()
  const employeeTypeName = getDataName(employeeTypeId, employeeTypeData)
  return { employeeTypeName, employeeTypeData }
}
