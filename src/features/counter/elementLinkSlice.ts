import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ElementLink } from "../../types"

type ElementLinkType = {
  loading: boolean
  error: string[]
  currentEditElementLink: ElementLink | null
}

const initialState: ElementLinkType = {
  loading: false,
  error: [],
  currentEditElementLink: null,
}

export const elementLinkSlice = createSlice({
  name: "elementLinks",
  initialState,
  reducers: {
    setCurrentEditElementLink: (state, action: PayloadAction<ElementLink>) => {
      state.currentEditElementLink = action.payload
    },
  },
})

export const { setCurrentEditElementLink } = elementLinkSlice.actions

export default elementLinkSlice.reducer
