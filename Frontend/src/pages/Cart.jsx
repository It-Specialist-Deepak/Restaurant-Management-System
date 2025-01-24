import React from "react";
import { motion } from "framer-motion";

const Cart = () => {
  const cartItem = {
    name: "Basic Tee 6-Pack",
    size: "XXS",
    color: "White",
    price: 250,
    discount: -20,
    vat: 25,
    total: 200,
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <motion.h1
              className="text-xl font-bold text-gray-900 sm:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Your Cart
            </motion.h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                    alt="Basic Tee"
                    className="size-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-sm text-gray-900">{cartItem.name}</h3>
                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Size:</dt>
                        <dd className="inline">{cartItem.size}</dd>
                      </div>
                      <div>
                        <dt className="inline">Color:</dt>
                        <dd className="inline">{cartItem.color}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label htmlFor="qty" className="sr-only">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value="1"
                        id="qty"
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-none"
                      />
                    </form>
                    <motion.button
                      className="text-gray-600 transition hover:text-red-600"
                      whileHover={{ scale: 1.1 }}
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-8 flex justify-end border-t border-gray-100 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>£{cartItem.price}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>VAT</dt>
                    <dd>£{cartItem.vat}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>-£{Math.abs(cartItem.discount)}</dd>
                  </div>
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>£{cartItem.total}</dd>
                  </div>
                </dl>

                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <a
                    href="#"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
