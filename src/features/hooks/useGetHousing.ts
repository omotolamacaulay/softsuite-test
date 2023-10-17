//@ts-nocheck
import { useFetchHousingQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useFetchHousing(housingId: string) {
  const { data: housingData } = useFetchHousingQuery()
  const housingName = getDataName(housingId, housingData)
  return { housingName, housingData }
}
