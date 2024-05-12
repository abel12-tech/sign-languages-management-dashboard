import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./features/authentication/api/authApi";
import { usersApi } from "./features/manage-users/api/usersApi";
import { contributionsApi } from "./features/manage-contributions/api/contributionsApi";
import authSliceReducer, {
  logout,
} from "./features/authentication/slice/authSlice";
import { dataApi } from "./features/dashboard-summary/api/dataApi";
import { signsApi } from "./features/manage-signs/api/signsApi";
import { categoriesApi } from "./features/manage-categories/api/categoriesApi";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [contributionsApi.reducerPath]: contributionsApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [signsApi.reducerPath]: signsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      contributionsApi.middleware,
      dataApi.middleware,
      signsApi.middleware,
      categoriesApi.middleware
    ),
  devTools: true,
});

setupListeners(store.dispatch);
const handleLogout = () => {
  const state = store.getState().auth.token;
  if (state === null && store.getState().auth.isAuthenticated) {
    store.dispatch(logout());
  }
};
handleLogout();

const unsubscribe = store.subscribe(handleLogout);
unsubscribe();
