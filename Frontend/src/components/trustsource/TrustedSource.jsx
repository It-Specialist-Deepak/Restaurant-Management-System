import React from "react";

function TrustedSource() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-slate-950 animate-fadeIn">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-100 sm:text-4xl">
          Trusted by eCommerce Businesses
        </h2>

        <p className="mt-4 text-gray-400 sm:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          dolores laborum labore provident impedit esse recusandae facere libero
          harum sequi.
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-400">
            Total Sales
          </dt>

          <dd className="text-4xl font-extrabold text-blue-400 md:text-5xl">
            $4.8m
          </dd>
        </div>

        <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-400">
            Official Addons
          </dt>

          <dd className="text-4xl font-extrabold text-blue-400 md:text-5xl">
            24
          </dd>
        </div>

        <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-400">
            Total Addons
          </dt>

          <dd className="text-4xl font-extrabold text-blue-400 md:text-5xl">
            86
          </dd>
        </div>

        <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-400">
            Downloads
          </dt>

          <dd className="text-4xl font-extrabold text-blue-400 md:text-5xl">
            86k
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default TrustedSource;
