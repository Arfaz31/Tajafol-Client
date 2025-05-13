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
      query: (passInfo) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: passInfo,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (passInfo) => {
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: passInfo,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload,
        headers: {
          Authorization: payload.token,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
