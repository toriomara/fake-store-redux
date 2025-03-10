import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
