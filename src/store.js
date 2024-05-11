import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./features/authentication/api/authApi";
import { usersApi } from "./features/manage-users/api/usersApi";
import { contributionsApi } from "./features/manage-contributions/api/contributionsApi";
import authSliceReducer from "./features/authentication/slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [contributionsApi.reducerPath]: contributionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
    authApi.middleware,
    usersApi.middleware,
    contributionsApi.middleware
  ),
  devTools: true,
});

setupListeners(store.dispatch);
