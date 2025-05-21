/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

// Define clear types for user data
export interface UserProfile {
  id: string;
  fullName: string;
  user:any;
  email: string;
  contact: string;
  emergencyContact?: string;
  address?: string;
  division?: string;
  district?: string;
  upazila?: string;
  role: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfile;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Optimized getme query with proper caching
    getme: builder.query<GetMeResponse, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      // Add cache configuration to avoid multiple fetches
      keepUnusedDataFor: 300, // 5 minutes (in seconds)
      // Since this is likely called in multiple components, make it a shared query
      providesTags: ["User"],
    }),

    createAdmin: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create-admin",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
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
    
    // Enhanced updateProfile to handle address fields
    updateProfile: builder.mutation({
      query: ({ formData }) => ({
        url: `/user/update-my-profile`,
        method: "PATCH",
        body: formData,
      }),
      // Invalidate the User tag to update all related queries
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