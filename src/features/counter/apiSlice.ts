import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Element } from "../../types"
import { ElementLink } from "../../types"

// Define the ElementLinkIds type as you did earlier
type ElementLinkIds = {
  id: string
  elementId: string
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://650af6bedfd73d1fab094cf7.mockapi.io",
  }),
  tagTypes: ["elements"],
  endpoints: (builder) => ({
    // Include endpoints from elementsApi
    fetchElements: builder.query<Element[], void>({
      query: () => "elements",
      transformResponse: (response: any) => {
        return response.data.content.sort(
          (a: { id: number }, b: { id: number }) => b.id - a.id,
        ) as Element[]
      },
      providesTags: ["elements"],
    }),
    fetchSingleElement: builder.query<Element, string>({
      query: (id) => `elements/${id}`,
    }),
    addSingleElement: builder.mutation<Element, Partial<Element>>({
      query: (newElement) => ({
        url: "elements",
        method: "POST",
        body: newElement,
      }),
      invalidatesTags: ["elements"],
    }),
    updateElement: builder.mutation<Element, Element>({
      query: (updatedElement) => ({
        url: `elements/${updatedElement.id}`,
        method: "PUT",
        body: updatedElement,
      }),
      invalidatesTags: ["elements"],
    }),
    deleteSingleElement: builder.mutation<void, string>({
      query: (id) => ({
        url: `elements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["elements"],
    }),
    // Include the new endpoints from elementLinksApi
    fetchElementLink: builder.query<ElementLink[], string>({
      query: (path) => `elements/${path}/elementlinks`,
    }),
    fetchSingleElementLink: builder.query<ElementLink, ElementLinkIds>({
      query: (value) => `elements/${value.elementId}/elementlinks/${value.id}`,
    }),
    addSingleElementLink: builder.mutation<ElementLink, ElementLink>({
      query: (data) => ({
        url: `elements/${data.elementId}/elementlinks`,
        method: "POST",
        body: data,
      }),
    }),
    updateElementLink: builder.mutation<ElementLink, ElementLink>({
      query: (data) => ({
        url: `elements/${data.elementId}/elementlinks/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteSingleElementLink: builder.mutation<void, ElementLinkIds>({
      query: (data) => ({
        url: `elements/${data.elementId}/elementlinks/${data.id}`,
        method: "DELETE",
      }),
    }),
    // Include endpoints from lookupApi
    fetchElementCategory: builder.query({
      query: () => "lookups/1/lookupvalues",
    }),
    fetchElementClassification: builder.query({
      query: () => "lookups/2/lookupvalues",
    }),
    fetchPayrun: builder.query({
      query: () => "lookups/5/lookupvalues",
    }),
    fetchSuborganizations: builder.query({
      query: () => "suborganizations",
    }),
    fetchDepartments: builder.query({
      query: (id) => `suborganizations/${id}/departments`,
    }),
    fetchJobTitle: builder.query({
      query: () => "lookups/6/lookupvalues",
    }),
    fetchLocation: builder.query({
      query: () => "lookups/7/lookupvalues",
    }),
    fetchEmployeeType: builder.query({
      query: () => "lookups/4/lookupvalues",
    }),
    fetchEmployeeCategory: builder.query({
      query: () => "lookups/5/lookupvalues",
    }),
    fetchGrades: builder.query({
      query: () => "grade",
    }),
    fetchGradeSteps: builder.query({
      query: (id) => `grade/${id}/gradesteps`,
    }),
    fetchUnion: builder.query({
      query: () => "lookups/8/lookupvalues",
    }),
    fetchHousing: builder.query({
      query: () => "lookups/9/lookupvalues",
    }),
    fetchWardrobe: builder.query({
      query: () => "lookups/10/lookupvalues",
    }),
    fetchSecurity: builder.query({
      query: () => "lookups/11/lookupvalues",
    }),
    // Define other endpoints as needed
  }),
})

export const {
  // Include queries and mutations from elements
  useFetchElementsQuery,
  useFetchSingleElementQuery,
  useAddSingleElementMutation,
  useUpdateElementMutation,
  useDeleteSingleElementMutation,
  // Include queries and mutations from elementLinks
  useFetchElementLinkQuery,
  useFetchSingleElementLinkQuery,
  useAddSingleElementLinkMutation,
  useUpdateElementLinkMutation,
  useDeleteSingleElementLinkMutation,
  // Include queries from lookupApi
  useFetchElementCategoryQuery,
  useFetchElementClassificationQuery,
  useFetchPayrunQuery,
  useFetchSuborganizationsQuery,
  useFetchDepartmentsQuery,
  useFetchJobTitleQuery,
  useFetchLocationQuery,
  useFetchEmployeeTypeQuery,
  useFetchEmployeeCategoryQuery,
  useFetchGradesQuery,
  useFetchGradeStepsQuery,
  useFetchUnionQuery,
  useFetchHousingQuery,
  useFetchWardrobeQuery,
  useFetchSecurityQuery,
} = apiSlice

export default apiSlice
