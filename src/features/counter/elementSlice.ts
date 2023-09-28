import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { RootState, AppThunk } from "../../app/store"
// import { Elements, ElementDetail } from "../../types"

const initialState = {
  elements: [],
  elementsDetail: {},
  loading: false,
  error: "",
}
const ENDPOINT = "https://650af6bedfd73d1fab094cf7.mockapi.io/elements"
// const SINGLEENDPOINT = `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/{id}`

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchElements = createAsyncThunk(
  "elements/fetchElements",
  async () => {
    const response = await fetch(ENDPOINT).then((response) => response.json())
    // The value we return becomes the `fulfilled` action payload
    return response.data.content
  },
)
export const fetchSingleElement = createAsyncThunk(
  "elements/fetchSingleElement",
  async ({ id }) => {
    const response = await fetch(
      `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${id}`,
      {
        method: "DELETE",
      },
    ).then((response) => response.json())
    // The value we return becomes the `fulfilled` action payload
    // return response.data
  },
)
export const deleteSingleElement = createAsyncThunk(
  "elements/deleteSingleElement",
  async () => {
    const response = await fetch(ENDPOINT).then((response) => response.json())
    // The value we return becomes the `fulfilled` action payload
    return response.data
  },
)

export const elementSlice = createSlice({
  name: "elements",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loadElements: (state, action) => {
      state.elements = action.payload
    },
    loadSingleElements: (state, action) => {
      state.elementsDetail = action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchElements.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchElements.fulfilled, (state, action) => {
        state.loading = false
        state.error = ""
        state.elements = action.payload
      })
      .addCase(fetchElements.rejected, (state) => {
        state.loading = false
        state.elements = []
      })
      .addCase(fetchSingleElement.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSingleElement.fulfilled, (state, action) => {
        state.loading = false
        state.error = ""
        state.elementsDetail = action.payload
      })
      .addCase(fetchSingleElement.rejected, (state) => {
        state.loading = false
        state.elementsDetail = {}
      })
  },
})

export const { loadElements, loadSingleElements } = elementSlice.actions

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

export default elementSlice.reducer
