import { configureStore } from "@reduxjs/toolkit"
import { elementSlice } from "./elementSlice"

export const store = configureStore({
  reducer: {
    elements: elementSlice.reducer,
  },
})
