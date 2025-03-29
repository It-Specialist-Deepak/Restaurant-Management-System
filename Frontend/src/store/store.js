import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import cartReducer from "../store/cartSlice";
import exploreCartReducer from "../store/exploreCartSlice";
import createMenuReducer from "../store/createMenuSlice";
import cancelOrderReducer from "../store/cancelOrderSlice";
import vacanciesReducer from "../store/vacanciesSlice";
import passwordReducer from "../store/passwordSlice";
import feedbackReducer from "../store/feedbackSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    explore: exploreCartReducer,
    menu: createMenuReducer,
    cancelOrder: cancelOrderReducer, // Ensure this matches your slice
    vacancies: vacanciesReducer,
    password: passwordReducer,
    feedback: feedbackReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
