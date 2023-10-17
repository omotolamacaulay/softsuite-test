//@ts-nocheck
import { useFetchLocationQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useFetchLocation(locationId: string) {
  const { data: locationData } = useFetchLocationQuery()
  const locationName = getDataName(locationId, locationData)
  return { locationName, locationData }
}
