import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import elementsReducer from "../features/counter/elementSlice"
import elementLinksReducer from "../features/counter/elementLinkSlice"

export const store = configureStore({
  reducer: {
    elements: elementsReducer,
    elementlinks: elementLinksReducer,
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
