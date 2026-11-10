import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import userReducer from "../redux/user/userSlice";
import propertyReducer from "../redux/property/propertySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    property: propertyReducer,
  },
});
