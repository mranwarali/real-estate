import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import API from "../../utils/api";

const BASE_API = import.meta.env.VITE_BASE_URL;

// signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_API}/auth/signup`, FormData);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Signup failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// login
export const login = createAsyncThunk(
  "auth/login",
  async (FormData, { rejectWithValue }) => {
    try {
      // const res = await axios.post(`${BASE_API}/auth/login`, FormData, {
      //   withCredentials: true,
      // });
      const res = await API.post(`/auth/login`, FormData, {
        withCredentials: true,
      });
      // toast.success(res.data.message);
      console.log("login", res.data);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// verification email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_API}/auth/verify-email?token=${token}`,
      );
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Verification failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

//resend verification email
export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_API}/auth/resend-verification`, {
        email,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to resend email";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

//initialstate
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  // isLoggedIn: !!localStorage.getItem("user"), //it is getting error so i comment it
  isLoggedIn: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = false;
        // state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // verify email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // resend verification email
      .addCase(resendVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerification.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
