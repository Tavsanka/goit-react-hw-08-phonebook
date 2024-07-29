import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://connections-api.goit.global";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/signup`, userData);
      console.log("Register response:", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Register Error:", error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        throw error;
      }
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, userData);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { token } = state.auth;
    try {
      await axios.post(
        `${API_URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.error("Logout failed:", error);
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      console.log("Clearing error");
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload
          ? action.payload.message ||
            (action.payload.code === 11000
              ? "Email already exists"
              : "Registration failed")
          : "Registration failed";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : "Login failed";
        console.log("Login error in slice:", state.error);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : "Logout failed";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
