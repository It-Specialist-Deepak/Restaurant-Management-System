import React from "react";
import { useSelector } from "react-redux";

const CartCount = () => {
  const cartItems = useSelector((state) => state.cart.cart.items);
  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  if (totalQuantity === 0) return null;

  return (
    <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
      {totalQuantity}
    </span>
  );
};

export default CartCount;
