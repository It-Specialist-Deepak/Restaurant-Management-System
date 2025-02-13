// import { createContext, useReducer } from "react";
// import axios from "axios";

// export const CartContext = createContext();

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_CART":
//       return { ...state, cartId: action.payload };
//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, { cartId: null });

//   const fetchCartId = async (userId) => {
//     const res = await axios.get(`http://localhost:5000/api/v1/cart/${userId}`);
//     dispatch({ type: "SET_CART", payload: res.data._id });
//   };

//   return (
//     <CartContext.Provider value={{ ...state, fetchCartId }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
