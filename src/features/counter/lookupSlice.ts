import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type LookupData = {
  loading: boolean
  elementCategory: []
  elementClassification: []
  payrun: []
  suborganizations: []
  departments: []
  jobTitle: []
  location: []
  employeeType: []
  employeeCategory: []
  error: string[]
}

const initialState: LookupData = {
  elementCategory: [],
  elementClassification: [],
  payrun: [],
  suborganizations: [],
  departments: [],
  jobTitle: [],
  location: [],
  employeeType: [],
  employeeCategory: [],
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
export const fetchSuborganizations = createAsyncThunk(
  "lookups/fetchSuborganizations",
  async () => {
    const response = await fetch(
      "https://650af6bedfd73d1fab094cf7.mockapi.io/suborganizations",
    ).then((response) => response.json())
    return response.data
  },
)
export const fetchDepartments = createAsyncThunk(
  "lookups/fetchDepartments",
  async (id: string) => {
    const response = await fetch(
      `https://650af6bedfd73d1fab094cf7.mockapi.io/suborganizations/${id}/departments`,
    ).then((response) => response.json())
    return response.data
  },
)
export const fetchJobTitle = createAsyncThunk(
  "lookups/fetchJobTitle",
  async () => {
    const response = await fetch(
      "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/6/lookupvalues",
    ).then((response) => response.json())
    return response
  },
)
export const fetchlocation = createAsyncThunk(
  "lookups/fetchlocation",
  async () => {
    const response = await fetch(
      "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/7/lookupvalues",
    ).then((response) => response.json())
    return response
  },
)
export const fetchEmployeeType = createAsyncThunk(
  "lookups/fetchEmployeeType",
  async () => {
    const response = await fetch(
      "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/4/lookupvalues",
    ).then((response) => response.json())
    return response
  },
)
export const fetchEmployeeCategory = createAsyncThunk(
  "lookups/fetchEmployeeCategory",
  async () => {
    const response = await fetch(
      "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/5/lookupvalues",
    ).then((response) => response.json())
    return response
  },
)

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
    loadSuborganization: (state, action) => {
      state.suborganizations = action.payload
    },
    loadDepartment: (state, action) => {
      state.departments = action.payload
    },
    loadJobTitle: (state, action) => {
      state.jobTitle = action.payload
    },
    loadLocation: (state, action) => {
      state.location = action.payload
    },
    loadEmployeetype: (state, action) => {
      state.employeeType = action.payload
    },
    loadEmployeeCategory: (state, action) => {
      state.employeeCategory = action.payload
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
      .addCase(fetchSuborganizations.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSuborganizations.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.suborganizations = action.payload
      })
      .addCase(fetchSuborganizations.rejected, (state) => {
        state.loading = false
        state.suborganizations = []
      })
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.departments = action.payload
      })
      .addCase(fetchDepartments.rejected, (state) => {
        state.loading = false
        state.departments = []
      })
      .addCase(fetchJobTitle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchJobTitle.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.jobTitle = action.payload
      })
      .addCase(fetchJobTitle.rejected, (state) => {
        state.loading = false
        state.jobTitle = []
      })
      .addCase(fetchlocation.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchlocation.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.location = action.payload
      })
      .addCase(fetchlocation.rejected, (state) => {
        state.loading = false
        state.location = []
      })
      .addCase(fetchEmployeeType.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEmployeeType.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.employeeType = action.payload
      })
      .addCase(fetchEmployeeType.rejected, (state) => {
        state.loading = false
        state.employeeType = []
      })
      .addCase(fetchEmployeeCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEmployeeCategory.fulfilled, (state, action) => {
        state.loading = false
        state.error = []
        state.employeeCategory = action.payload
      })
      .addCase(fetchEmployeeCategory.rejected, (state) => {
        state.loading = false
        state.employeeCategory = []
      })
  },
})

export const {
  loadElementCategory,
  loadElementClassification,
  loadPayrun,
  loadSuborganization,
  loadDepartment,
  loadJobTitle,
  loadLocation,
  loadEmployeetype,
} = lookupSlice.actions

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
