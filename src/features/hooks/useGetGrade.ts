//@ts-nocheck
import { useFetchGradesQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useFetchGrade(gradeId: string) {
  const { data: gradeData } = useFetchGradesQuery()
  const gradeName = getDataName(gradeId, gradeData)
  return { gradeName, gradeData }
}
