//@ts-nocheck
import { useFetchElementClassificationQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useGetElementClassification(
  elementClassificationId: string,
) {
  const { data: elementClassificationData } =
    useFetchElementClassificationQuery()
  const elementClassificationName = getDataName(
    elementClassificationId,
    elementClassificationData,
  )
  return { elementClassificationName, elementClassificationData }
}
