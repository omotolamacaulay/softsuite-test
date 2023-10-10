import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type LookupData = {
  loading: boolean
  elementCategory: []
  elementClassification: []
  payrun: []
  error: string[]
}

const initialState: LookupData = {
  elementCategory: [],
  elementClassification: [],
  payrun: [],
  loading: false,
  error: [],
}
// const ENDPOINT = "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups"
export const fetchElementCategory = createAsyncThunk(
  "lookups/fetchElementCategory",
  async () => {
    const response = await fetch(
      "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/1/lookupvalues",
    ).then((response) => response.json())
    return response
  },
)
export const fetchElementClassification = createAsyncThunk(
  "lookups/fetchElementClassification",
  async () => {
    const response = await fetch(
      "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/2/lookupvalues",
    ).then((response) => response.json())
    return response
  },
)
export const fetchPayrun = createAsyncThunk("lookups/fetchPayrun", async () => {
  const response = await fetch(
    "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/5/lookupvalues",
  ).then((response) => response.json())
  return response
})

export const lookupSlice = createSlice({
  name: "lookups",
  initialState,
  reducers: {
    loadElementCategory: (state, action) => {
      state.elementCategory = action.payload
    },
    loadElementClassification: (state, action) => {
      state.elementClassification = action.payload
    },
    loadPayrun: (state, action) => {
      state.elementClassification = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchElementCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchElementCategory.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.elementCategory = action.payload
      })
      .addCase(fetchElementCategory.rejected, (state) => {
        state.loading = false
        state.elementCategory = []
      })
      .addCase(fetchElementClassification.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchElementClassification.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.elementClassification = action.payload
      })
      .addCase(fetchElementClassification.rejected, (state) => {
        state.loading = false
        state.elementClassification = []
      })
      .addCase(fetchPayrun.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPayrun.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.payrun = action.payload
      })
      .addCase(fetchPayrun.rejected, (state) => {
        state.loading = false
        state.payrun = []
      })
  },
})

export const { loadElementCategory, loadElementClassification, loadPayrun } =
  lookupSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

export default lookupSlice.reducer
