/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const setTokenInCookies = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token);
};

export const getAccessTokenFromCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

export const removeTokenFromCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  // cookieStore.delete("refreshToken");
};
