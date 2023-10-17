//@ts-nocheck
import { useFetchWardrobeQuery } from "../counter/apiSlice"
import { getDataName } from "../utils"
export default function useFetchWardrobe(wardrobeId: string) {
  const { data: wardrobeData } = useFetchWardrobeQuery()
  const wardrobeName = getDataName(wardrobeId, wardrobeData)
  return { wardrobeName, wardrobeData }
}
