import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import cartReducer from "../store/cartSlice";
import exploreCartReducer from "../store/exploreCartSlice";
import createMenuReducer from "../store/createMenuSlice";
import cancelOrderReducer from "../store/cancelOrderSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    explore: exploreCartReducer,
    menu: createMenuReducer,
    cancel: cancelOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredPaths: [],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;