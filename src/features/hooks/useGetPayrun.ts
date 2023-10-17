//@ts-nocheck
import { useFetchPayrunQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useGetPayrun(payrunId: string) {
  const { data: payrunData } = useFetchPayrunQuery()
  const payrunName = getDataName(payrunId, payrunData)
  return { payrunName, payrunData }
}
