import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import cartReducer from "../store/cartSlice";
import exploreCartReducer from "../store/exploreCartSlice";
import createMenuReducer from "../store/createMenuSlice";
import cancelOrderReducer from "../store/cancelOrderSlice";
import staffReducer from "../store/staffSlice";
import adminReducer from "../store/adminSlice";
import vacanciesReducer from "../store/vacanciesSlice";
import passwordReducer from "../store/passwordSlice";
import invoiceReducer from "../store/invoiceSlice";
import feedbackReducer from "../store/feedbackSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    explore: exploreCartReducer,
    menu: createMenuReducer,
    cancelOrder: cancelOrderReducer, // Ensure this matches your slice
    staff: staffReducer,
    admin: adminReducer,
    vacancies: vacanciesReducer,
    password: passwordReducer,
    invoice: invoiceReducer,
    feedback: feedbackReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
