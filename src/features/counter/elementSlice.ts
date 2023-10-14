import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Element } from "../../types"

type ElementData = {
  error: string[]
  currentEditElement: Element | null
}

const initialState: ElementData = {
  error: [],
  currentEditElement: null,
}

export const elementSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    setCurrentEditElement: (state, action: PayloadAction<Element>) => {
      state.currentEditElement = action.payload
    },
  },
})

export const { setCurrentEditElement } = elementSlice.actions

export default elementSlice.reducer
