import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Element } from "../../types"

type ElementData = {
  error: string[]
  currentEditElement: Element | null
  clearElement: Element | null
}

const initialState: ElementData = {
  error: [],
  currentEditElement: null,
  clearElement: null,
}

export const elementSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    setCurrentEditElement: (state, action: PayloadAction<Element>) => {
      state.currentEditElement = action.payload
    },
    setClearElement: (state) => {
      state.clearElement = null
    },
  },
})

export const { setCurrentEditElement, setClearElement } = elementSlice.actions

export default elementSlice.reducer
