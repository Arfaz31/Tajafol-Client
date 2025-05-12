import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getme: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllCustomers: builder.query({
      query: (args) => ({
        url: "/user/customers",
        method: "GET",
        params: args,
      }),
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: ({ formData }) => ({
        url: `/user/update-my-profile`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetmeQuery,
  useGetAllCustomersQuery,
  useUpdateProfileMutation,
} = userApi;
