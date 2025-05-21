import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUser = {
  name: string;
  phone: string;
  fullName: string;
  id: string;
  userName: string;
  email: string;
  contact: string;
  role: string;
  profileImg?: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions; //This line exports the setUser and logOut actions, allowing you to dispatch these actions from components or other parts of the application.
export default authSlice.reducer; //This reducer handles state updates for the auth slice and will be added to the Redux store.

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
