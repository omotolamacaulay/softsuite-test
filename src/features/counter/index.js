import { configureStore } from "@reduxjs/toolkit"
import { elementSlice } from "./elementSlice"
import { elementLinkSlice } from "./elementLinkSlice"

export const store = configureStore({
  reducer: {
    elements: elementSlice.reducer,
    elementLinks: elementLinkSlice.reducer,
  },
})
