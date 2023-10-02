import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { RootState, AppThunk } from "../../app/store"
import { ElementLink } from "../../types"

type ElementLinkType = {
  loading: boolean
  singleElementLink: ElementLink | {}
  elementLinks: ElementLink[]
  error: string[]
  currentEditElementLink: ElementLink | null
}

const initialState: ElementLinkType = {
  loading: false,
  singleElementLink: {},
  elementLinks: [],
  error: [],
  currentEditElementLink: null,
}
// const ENDPOINT = "https://650af6bedfd73d1fab094cf7.mockapi.io/elements"
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
  "elements/fetchElementLink",
  async (path: string) => {
    const response = await fetch(
      `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${path}/elementlinks`,
    ).then((response) => response.json())
    // The value we return becomes the `fulfilled` action payload
    return response.data.content
  },
)

type ElementLinkIds = {
  id: string
  elementId: string
}
export const fetchSingleElementLink = createAsyncThunk(
  "elements/fetchSingleElementLink",
  async (value: ElementLinkIds) => {
    try {
      const response = await fetch(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${value.elementId}/elementlinks/${value.id}`,
      )

      if (!response.ok) {
        throw new Error("Failed to retrieve element")
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("An error occurred while retrieving the element")
      }
    }
  },
)
// type ElementLinkParams = {
//   data: ElementLink
//   path: string
// }
export const addSingleElementLink = createAsyncThunk(
  "elements/addSingleElement",
  async (data: ElementLink) => {
    const formObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    try {
      const response = await fetch(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${data.elementId}/elementlinks`,
        formObj,
      )

      if (!response.ok) {
        throw new Error("Failed to retrieve element")
      }

      const res = await response.json()
      return res.data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("An error occurred while retrieving the element")
      }
    }
  },
)
export const updateElementLink = createAsyncThunk(
  "elements/updateElementLink",
  async (data: ElementLink) => {
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }

    try {
      const response = await fetch(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${data.elementId}/elementlinks/${data.id}`,
        config,
      )

      if (!response.ok) {
        throw new Error("Failed to update element")
      }

      const res = await response.json()
      return { msg: res.message, data: res.data }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("An error occurred while updating the element")
      }
    }
  },
)

export const deleteSingleElementLink = createAsyncThunk(
  "elementLink/deleteSingleElementLink",
  async (data: { id: string; elementId: string }) => {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const response = await fetch(
        `https://650af6bedfd73d1fab094cf7.mockapi.io/elements/${data.elementId}/elementlinks/${data.id}`,
        config,
      )

      if (!response.ok) {
        throw new Error("Failed to delete element link")
      }

      const res = await response.json()

      return { msg: res.message, id: data.id }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("An error occurred while deleting the element")
      }
    }
  },
)

export const elementLinkSlice = createSlice({
  name: "elementLinks",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loadElementLinks: (state, action) => {
      state.elementLinks = action.payload
    },
    loadSingleElementLink: (state, action) => {
      state.singleElementLink = action.payload
    },
    // updateSingleElementLink: (state, action) => {
    //   const indexToUpdate = state.elementLinks.findIndex(
    //     (element) => element.id === action.payload.id,
    //   )

    //   if (indexToUpdate !== -1) {
    //     state.elementLinks[indexToUpdate] = action.payload
    //   }
    //   if (
    //     state.singleElementLink &&
    //     state.singleElementLink.id === action.payload.id
    //   ) {
    //     state.singleElementLink = action.payload
    //   }
    // },
    setCurrentEditElementLink: (state, action: PayloadAction<ElementLink>) => {
      state.currentEditElementLink = action.payload
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
        state.elementLinks = action.payload
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
      .addCase(updateElementLink.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateElementLink.pending, (state) => {
        state.loading = true
      })
      .addCase(updateElementLink.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        const index = state.elementLinks.findIndex(
          (link) => link.id === action.payload.data.id,
        )
        state.elementLinks[index] = action.payload.data
      })
      // .addCase(addSingleElementLink.pending, (state) => {
      //   state.loading = true
      // })
      // .addCase(addSingleElementLink.fulfilled, (state, action) => {
      //   state.loading = false
      //   state.error = []
      //   state.elementLinks = action.payload.data
      // })
      // .addCase(addSingleElementLink.rejected, (state) => {
      //   state.loading = false
      // })
      .addCase(deleteSingleElementLink.rejected, (state) => {
        state.loading = false
      })
      .addCase(deleteSingleElementLink.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteSingleElementLink.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.elementLinks = state.elementLinks?.filter(
          (link) => link.id !== action.payload.id,
        )
      })
  },
})

export const {
  loadElementLinks,
  loadSingleElementLink,
  // updateSingleElementLink,
  setCurrentEditElementLink,
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
