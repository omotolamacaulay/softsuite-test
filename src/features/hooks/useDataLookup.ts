import { useCallback } from "react"

export interface DataItem {
  id: number
  name: string
}

const useDataLookup = (data: DataItem[]) => {
  const getDataName = useCallback(
    (id: number) => {
      const item = data.find((item) => item.id === id)
      return item ? item.name : ""
    },
    [data],
  )

  return { getDataName }
}

export default useDataLookup
