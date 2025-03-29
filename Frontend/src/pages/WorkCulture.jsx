import React from "react";
import PropTypes from "prop-types";

const contents = [
	{
		icon: "📄",
		title: "Log in",
		text: "Log in to your account to place Order.",
	},
	{
		icon: "🤝",
		title: "Select Products",
		text: "Select products that you want to eat.",
	},
	{
		icon: "👍",
		title: "CheckOut",
		text: "Check out the products you selected.",
	},
];

const ContentItem = ({ item, index }) => (
	<div className="bg-white shadow-xl rounded-xl flex flex-col justify-center items-center text-center pb-10 px-6 h-full ">
		<div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center -translate-y-10">
			<h1 className="font-medium text-[40px] text-white">{index}</h1>
		</div>
		<h2 className="text-2xl font-medium">{item.title}</h2>
		<div className="text-[95px] font-medium">{item.icon}</div>
	</div>
);

ContentItem.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};

const SpecialContentItem = () => (
	<div className="bg-blue-600 shadow-xl rounded-xl flex flex-col justify-center items-center text-center pb-10 px-6 h-full ">
		<div className="w-20 h-20 rounded-full bg-white flex items-center justify-center -translate-y-10">
			<h1 className="font-medium text-[40px] text-gray-900">4</h1>
		</div>
		<h2 className="text-white text-2xl font-medium grow">Delivery</h2>
		<p className="text-white leading-relaxed grow opacity-75">
			We deliver food to your doorstep. Just order and relax.
		</p>
	</div>
);

const WorkCulture = () => {
	return (
		<section className="py-14 md:py-24 bg-white text-zinc-900 mt-10">
			<div className="container px-4 mx-auto">
				<div className="flex flex-col max-w-xl justify-center items-center text-center mx-auto">
					<h2 className="text-3xl font-bold md:text-[45px] mb-4">How We Work</h2>
					<p className="text-lg opacity-80">
						 your ultimate food discovery companion! 🍽️  
						We help you explore the best restaurants, dishes, and flavors in your city. Whether you're a foodie looking for new experiences or just need a quick meal recommendation, we've got you covered!
					</p>
				</div>

				<div className="grid grid-cols-4 gap-6 gap-y-16 mt-16 lg:gap-y-0 lg:mt-12">
					{contents.map((item, i) => (
						<div className="col-span-4 sm:col-span-2 lg:col-span-1" key={i}>
							<ContentItem index={i + 1} item={item} />
						</div>
					))}

					<div className="col-span-4 sm:col-span-2 lg:col-span-1">
						<SpecialContentItem />
					</div>
				</div>
			</div>
		</section>
	);
};

export default WorkCulture;