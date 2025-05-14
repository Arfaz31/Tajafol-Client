import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (userInfo) => {
        // console.log("Register Mutation - UserInfo:", userInfo);
        return {
          url: "/user/create-admin",
          method: "POST",
          body: userInfo,
        };
      },
      invalidatesTags: ["User"],
    }),
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

    getAllAdmin: builder.query({
      query: (args) => ({
        url: "/user/admins",
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
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetmeQuery,
  useGetAllCustomersQuery,
  useUpdateProfileMutation,
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useDeleteUserMutation,
} = userApi;
