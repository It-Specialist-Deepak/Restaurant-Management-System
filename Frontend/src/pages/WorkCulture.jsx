import React from "react";
import PropTypes from "prop-types";

const contents = [
	{
		icon: "📄",
		title: "Log in",
		text: "The challenge facing online banks is to meet the needs.",
	},
	{
		icon: "🤝",
		title: "Select Service",
		text: "The challenge facing online banks is to meet the needs.",
	},
	{
		icon: "👍",
		title: "Select Amount",
		text: "The challenge facing online banks is to meet the needs.",
	},
];

const ContentItem = ({ item, index }) => (
	<div className="bg-white shadow-xl rounded-xl flex flex-col justify-center items-center text-center pb-10 px-6 h-full">
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
	<div className="bg-blue-600 shadow-xl rounded-xl flex flex-col justify-center items-center text-center pb-10 px-6 h-full">
		<div className="w-20 h-20 rounded-full bg-white flex items-center justify-center -translate-y-10">
			<h1 className="font-medium text-[40px] text-gray-900">4</h1>
		</div>
		<h2 className="text-white text-2xl font-medium grow">Delivery</h2>
		<p className="text-white leading-relaxed grow opacity-75">
			Your PSD will become a website that works great on all devices like
			smartphone, laptop, tablet, desktop etc.
		</p>
	</div>
);

const WorkCulture = () => {
	return (
		<section className="py-14 md:py-24 bg-white text-zinc-900">
			<div className="container px-4 mx-auto">
				<div className="flex flex-col max-w-xl justify-center items-center text-center mx-auto">
					<h2 className="text-3xl font-bold md:text-[45px] mb-4">How We Work</h2>
					<p className="text-lg opacity-80">
						We provide the highest level of customer support and build long
						lasting relationships with our clients.
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