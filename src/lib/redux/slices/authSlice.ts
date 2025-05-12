"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "admin"
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFailure: (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = authSlice.actions

export default authSlice.reducer