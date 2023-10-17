//@ts-nocheck
import { useFetchElementCategoryQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useGetElementCategory(elementCategoryId: string) {
  const { data: elementCategoryData } = useFetchElementCategoryQuery()
  const elementCategoryName = getDataName(
    elementCategoryId,
    elementCategoryData,
  )
  return { elementCategoryName, elementCategoryData }
}
