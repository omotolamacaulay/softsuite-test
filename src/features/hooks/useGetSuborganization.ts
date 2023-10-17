//@ts-nocheck
import { useFetchSuborganizationsQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useFetchSuborganizations(suborganizationId: string) {
  const { data: suborganizationData } = useFetchSuborganizationsQuery()
  const suborganizationName = getDataName(
    suborganizationId,
    suborganizationData,
  )
  return { suborganizationName, suborganizationData }
}
