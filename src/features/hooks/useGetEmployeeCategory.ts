//@ts-nocheck
import { useFetchEmployeeCategoryQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useGetEmployeeCategory(employeeCategoryId: string) {
  const { data: employeeCategoryData } = useFetchEmployeeCategoryQuery()
  const employeeCategoryName = getDataName(
    employeeCategoryId,
    employeeCategoryData,
  )
  return { employeeCategoryName, employeeCategoryData }
}
