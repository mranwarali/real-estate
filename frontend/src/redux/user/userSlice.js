import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_API = import.meta.env.VITE_BASE_URL;

// fetch user data
export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      // const res = await axios.get(`${BASE_API}/user/fetch-profile`);
      const res = await axios.get(`${BASE_API}/user/fetch-profile`, {
        withCredentials: true,
      });
      // toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// update user data
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      // const res = await axios.put(`${BASE_API}/user/update-profile`, formData);
      const res = await axios.put(`${BASE_API}/user/update-profile`, formData, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// delete user
export const deleteProfile = createAsyncThunk(
  "user/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_API}/user/delete-profile`, {
        withCredentials: true, // CRITICAL: Allows cookies to be sent
      });
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  },
);

// slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch user data
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      //   update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload.user || action.payload;
      })
      //   delete profile
      .addCase(deleteProfile.fulfilled, (state) => {
        state.profile = null;
      })

      .addMatcher(
        isAnyOf(
          fetchProfile.pending,
          updateProfile.pending,
          deleteProfile.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchProfile.fulfilled,
          updateProfile.fulfilled,
          deleteProfile.fulfilled,
        ),
        (state) => {
          state.loading = false;
        },
      )

      .addMatcher(
        isAnyOf(
          fetchProfile.rejected,
          updateProfile.rejected,
          deleteProfile.rejected,
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export default userSlice.reducer;
