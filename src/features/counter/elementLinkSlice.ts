import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { RootState, AppThunk } from "../../app/store"
import { ElementDetail } from "../../types"

type ElementDetailType = {
  loading: boolean
  singleElementLink: ElementDetail | null
  elementsLink: ElementDetail[] | null
  error: string[]
}

const initialState: ElementDetailType = {
  loading: false,
  singleElementLink: null,
  elementsLink: null,
  error: [],
}
const ENDPOINT = "https://650af6bedfd73d1fab094cf7.mockapi.io/elements"
// const SINGLEENDPOINT = `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/{id}`

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const fetchElements = createAsyncThunk(
//   "elements/fetchElements",
//   async () => {
//     const response = await fetch(ENDPOINT).then((response) => response.json())
//     // The value we return becomes the `fulfilled` action payload
//     return response.data.content
//   },
// )

export const fetchElementLink = createAsyncThunk(
  "elementLink/fetchElementLink",
  async (id: string) => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const response = await fetch(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${id}/elementlinks`,
        config,
      )

      if (!response.ok) {
        throw new Error("Failed to retrieve element links")
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("An error occurred while retrieving element links")
      }
    }
  },
)

type ElementLink = {
  id: string
  elementId: string
}

export const fetchSingleElementLink = createAsyncThunk(
  "elementLink/fetchSingleElementLink",
  async (value: ElementLink) => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const response = await fetch(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${value.id}/elementlinks/${value.elementId}`,
        config,
      )

      if (!response.ok) {
        throw new Error("Failed to retrieve element links")
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("An error occurred while retrieving element links")
      }
    }
  },
)

export const editSingleElementLink = createAsyncThunk(
  "elementLink/editSingleElementLink",
  async (values: ElementLink) => {
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }

    try {
      const response = await fetch(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/elements/${values.id}/elementlinks/${values.elementId}`,
        config,
      )

      if (!response.ok) {
        throw new Error("Failed to update element link")
      }

      const data = await response.json()
      return data.message
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("An error occurred while updating the element link")
      }
    }
  },
)

export const deleteSingleElementLink = createAsyncThunk(
  "elementLink/deleteSingleElementLink",
  async (values: ElementLink) => {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const response = await fetch(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/elements/${values.id}/elementlinks/${values.elementId}`,
        config,
      )

      if (!response.ok) {
        throw new Error("Failed to delete element link")
      }

      const data = await response.json()
      return values.id
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("An error occurred while deleting the element link")
      }
    }
  },
)

export const elementLinkSlice = createSlice({
  name: "elementLink",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loadElementsLink: (state, action) => {
      state.elementsLink = action.payload
    },
    loadSingleElementLink: (state, action) => {
      state.singleElementLink = action.payload
    },
    updateSingleElementLink: (state, action) => {
      const indexToUpdate = state.elementsLink.findIndex(
        (element) => element.id === action.payload.id,
      )

      if (indexToUpdate !== -1) {
        state.elementsLink[indexToUpdate] = action.payload
      }
      if (
        state.singleElementLink &&
        state.singleElementLink.id === action.payload.id
      ) {
        state.singleElementLink = action.payload
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchElementLink.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchElementLink.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.singleElementLink = action.payload
      })
      .addCase(fetchElementLink.rejected, (state) => {
        state.loading = false
      })
      .addCase(fetchSingleElementLink.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSingleElementLink.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.singleElementLink = action.payload
      })
      .addCase(fetchSingleElementLink.rejected, (state) => {
        state.loading = false
      })
      .addCase(editSingleElementLink.rejected, (state) => {
        state.loading = false
      })
      .addCase(editSingleElementLink.pending, (state) => {
        state.loading = true
      })
      .addCase(editSingleElementLink.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.singleElementLink = action.payload
      })
      .addCase(deleteSingleElementLink.rejected, (state) => {
        state.loading = false
      })
      .addCase(deleteSingleElementLink.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteSingleElementLink.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.elementsLink =
          state.elementsLink?.filter(
            (item) => item.id !== Number(action.payload),
          ) || []
      })
  },
})

export const {
  loadElementsLink,
  loadSingleElementLink,
  updateSingleElementLink,
} = elementLinkSlice.actions

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

export default elementLinkSlice.reducer
