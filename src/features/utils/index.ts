export interface DataItem {
  id: string
  name: string
}
export const getDataName = (id: string, data: DataItem[], isTrue = true) => {
  if (isTrue) {
    const item = data?.find((item) => item.id === id)
    return item ? item.name : ""
  }
}
