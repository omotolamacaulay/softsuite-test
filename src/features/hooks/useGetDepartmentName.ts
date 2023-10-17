import { useFetchDepartmentsQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useGetDepartmentname(
  selectedSuborganizationId: string,
  departmentId: string,
) {
  const { data: departmentsData } = useFetchDepartmentsQuery(
    selectedSuborganizationId,
    {
      skip: selectedSuborganizationId === "",
    },
  )
  const departmentName = getDataName(departmentId, departmentsData?.data)
  return departmentName
}
