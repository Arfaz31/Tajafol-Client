import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => {
        // console.log("Register Mutation - UserInfo:", userInfo);
        return {
          url: "/user/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (passInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passInfo,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/auth/reset-password-into/${id}`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
} = authApi;
