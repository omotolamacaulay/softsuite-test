import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import elementsReducer from "../features/counter/elementSlice"

export const store = configureStore({
  reducer: {
    elements: elementsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
