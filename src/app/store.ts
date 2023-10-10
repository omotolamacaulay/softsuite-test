import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import elementsReducer from "../features/counter/elementSlice"
import elementLinksReducer from "../features/counter/elementLinkSlice"
import lookupReducer from "../features/counter/lookupSlice"

export const store = configureStore({
  reducer: {
    elements: elementsReducer,
    elementlinks: elementLinksReducer,
    lookups: lookupReducer,
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
