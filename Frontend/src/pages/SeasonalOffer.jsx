import React from "react";
import PropTypes from "prop-types";

const features = [
	{
		title: "Interest",
		amount: "2%",
	},
	{
		title: "Support",
		amount: "24/7",
	},
	{
		title: "Interest",
		amount: "5%",
	},
];

const FeaturedItem = ({ feature }) => {
	const { title, amount } = feature;
	return (
		<div className="bg-white dark:bg-slate-800 shadow-xl min-w-[140px] rounded-xl p-4">
			<h4 className="text-[40px] text-blue-600 font-medium">{amount}</h4>
			<h6 className="font-medium">{title}</h6>
		</div>
	);
};

FeaturedItem.propTypes = {
	feature: PropTypes.object.isRequired,
};

const SeasonalOffer = () => {
	return (
		<section className="py-24 md:py-36 bg-white dark:bg-[#0b1727] text-black dark:text-white relative overflow-hidden z-10">
			<div className="ezy__featured55-shape-one absolute left-0 bottom-0 min-w-[20%] h-full bg-blue-600 bg-opacity-10 -z-10" />
			<div className="ezy__featured55-shape-two absolute left-[20%] bottom-0 min-w-[25%] h-full bg-blue-600 bg-opacity-40 -z-10" />

			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 md:col-span-6">
						<img
							src="https://cdn.easyfrontend.com/pictures/credit-card.png"
							alt=""
							className="max-w-full h-auto mx-auto"
						/>
					</div>
					<div className="col-span-12 md:col-span-6">
						<h2 className="text-3xl font-bold leading-tight md:text-[45px] mt-12 md:mt-0">
							Why Choose Us?
						</h2>
						<p className="text-lg opacity-80 leading-7 my-6">
							It’s easier to reach your savings goals when you have the right
							savings account. Take a look and find the right one for you! There
							are many online banks in Europe.
						</p>
						<div className="grid grid-cols-12 gap-6 text-center mt-12 pt-12">
							{features.map((feature, i) => (
								<div
									className="col-span-4 md:col-span-6 lg:col-span-4 md:mt-4 lg:mt-0"
									key={i}
								>
									<FeaturedItem feature={feature} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SeasonalOffer;
