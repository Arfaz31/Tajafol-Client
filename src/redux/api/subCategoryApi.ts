import { baseApi } from "./baseApi";

const subcategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubcategories: builder.query({
      query: (args) => ({
        url: "/subcategory",
        method: "GET",
        params: args,
      }),
      providesTags: ["Subcategories"],
    }),

    getSingleSubcategory: builder.query({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Subcategories", id }],
    }),

    createSubcategory: builder.mutation({
      query: (formData) => ({
        url: "/subcategory/create-subcategory",
        method: "POST",
        body: formData,
        // Don't add Content-Type header for FormData
        formData: true,
      }),
      invalidatesTags: ["Subcategories"],
    }),

    updateSubcategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/subcategory/update/${id}`,
        method: "PATCH",
        body: formData,
        // Don't add Content-Type header for FormData
        formData: true,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Subcategories", id },
        "Subcategories",
      ],
    }),

    deleteSubcategory: builder.mutation({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subcategories"],
    }),
  }),
});

export const {
  useGetAllSubcategoriesQuery,
  useGetSingleSubcategoryQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = subcategoryApi;
