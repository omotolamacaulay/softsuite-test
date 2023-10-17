import { useFetchGradeStepsQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useGetGradeSteps(
  selectedGradeId: string,
  gradeStepId: string,
) {
  const { data: gradeStepData } = useFetchGradeStepsQuery(selectedGradeId, {
    skip: selectedGradeId === "",
  })
  const gradeStepName = getDataName(gradeStepId, gradeStepData?.data)
  return gradeStepName
}
