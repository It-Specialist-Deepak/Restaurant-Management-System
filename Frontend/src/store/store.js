import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import cartReducer from "../store/cartSlice";
import exploreCartReducer from "../store/exploreCartSlice";
import createMenuReducer from "../store/createMenuSlice"; // ✅ Import create menu slice

export const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ Authentication state
    cart: cartReducer, // ✅ Cart state (manages cart operations)
    explore: exploreCartReducer, // ✅ Explore menu state (fetch menu, add items)
    menu: createMenuReducer, // ✅ Create Menu state (handles menu creation)
  },
});

export default store;
