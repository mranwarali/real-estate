import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_API = import.meta.env.VITE_BASE_URL;

// 1. INITIAL STATE
const initialState = {
  properties: [],
  property: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// 2. ASYNC THUNKS

// Fetch All Properties
export const getProperties = createAsyncThunk(
  "properties/getAll",
  async (queryParams = "", { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_API}/property/get-properties${queryParams}`,
      );
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
);

// Get Single Property
export const getProperty = createAsyncThunk(
  "properties/getOne",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_API}/property/get-property/${id}`,
      );
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Create New Property
export const createProperty = createAsyncThunk(
  "properties/create",
  async (propertyData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_API}/property/create-property`,
        propertyData,
        {
          withCredentials: true,
        },
      );
      toast.success(response.data.message || "Property Listed Successfully!");
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Something is wrong, Try again";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Update Property
export const updateProperty = createAsyncThunk(
  "properties/update",
  async ({ id, propertyData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_API}/property/update-property/${id}`,
        propertyData,
      );
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Delete Property
export const deleteProperty = createAsyncThunk(
  "properties/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_API}/property/delete-property/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// 3. THE SLICE
export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.property = null; // Clear single property on reset if needed
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL PROPERTIES
      .addCase(getProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.properties = action.payload;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET SINGLE PROPERTY
      .addCase(getProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.property = action.payload;
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // CREATE PROPERTY
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.properties.unshift(action.payload);
      })

      // UPDATE PROPERTY
      .addCase(updateProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update both the list and the single property state
        state.properties = state.properties.map((p) =>
          p._id === action.payload._id ? action.payload : p,
        );
        state.property = action.payload;
      })

      // DELETE PROPERTY
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.properties = state.properties.filter(
          (p) => p._id !== action.payload,
        );
      });
  },
});

export const { reset } = propertySlice.actions;
export default propertySlice.reducer;
