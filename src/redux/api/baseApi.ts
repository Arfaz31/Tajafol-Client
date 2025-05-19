/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "sonner";
import { logout, setUser } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://server.taazafol.arviontech.online/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = ((getState() as RootState).auth as any).token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  // Check if the error exists and if the data is an object with a message
  if (result.error?.status === 400) {
    const errorData = result.error.data;
    if (errorData && typeof errorData === "object" && "message" in errorData) {
      // Now you can safely access the message
      toast.error((errorData as { message: string }).message);
    }
  }

  if (result?.error?.status === 401) {
    const res = await fetch(
      "https://server.taazafol.arviontech.online/api/v1/auth/generate-access-token-via-refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json(); //.json() converts raw HTTP response (text) into a usable JavaScript object so you can work with it easily.

    if (data?.data?.accessToken) {
      const user = ((api.getState() as RootState).auth as any).user;
      api.dispatch(setUser({ user, token: data?.data?.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Only logout if refresh token fails
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "User",
    "Products",
    "Orders",
    "Categories",
    "Subcategories",
    "Reviews",
  ],
  endpoints: () => ({}),
});
