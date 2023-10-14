import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { apiSlice } from "../features/counter/apiSlice"
import elementsReducer from "../features/counter/elementSlice"
import elementLinksReducer from "../features/counter/elementLinkSlice"
import lookupReducer from "../features/counter/lookupSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    elements: elementsReducer,
    elementlinks: elementLinksReducer,
    lookups: lookupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
