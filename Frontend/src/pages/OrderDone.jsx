import React from "react";

const OrderDone = () => {
  return (
    <section className="rounded-3xl shadow-2xl">
      <div className="p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
          Your order is on the way
        </p>

        <h2 className="mt-6 text-3xl font-bold">
          Thanks for your purchase, we're getting it ready!
        </h2>

        <a
          className="mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
          href="#"
        >
          Track Order
        </a>
      </div>
    </section>
  );
};

export default OrderDone;
