import React from "react";
import { Link } from "react-router-dom";

const Shapes = () => (
	<>
		<svg
			className="absolute top-0 left-0 -z-10"
			width="62"
			height="62"
			viewBox="0 0 62 62"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0 62V0H62C62.0281 34.238 34.2662 62 0 62Z"
				fill="#FF6A35"
				fillOpacity="0.26"
			/>
		</svg>
	</>
);

const ShapeSeven = () => (
	<svg
		className="absolute top-0 left-0 lg:-left-[150px] -z-30"
		width="291"
		height="168"
		viewBox="0 0 291 168"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M80.926 5.72087C38.4338 6.50518 4.64517 42.1258 5.44169 85.2796C6.23821 128.433 41.3183 162.781 83.8105 161.997L285.424 158.275"
			stroke="#34C69F"
			strokeWidth="10"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const UpcomingEvent = () => {
	return (
		<header className=" mt-16 py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
			<Shapes />

			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 gap-6 items-center">
					<div className="col-span-12 lg:col-span-7 xl:col-span-6 text-center lg:text-start mb-12 lg:mb-0">
						<h2 className="text-3xl font-bold leading-tight tracking-wide lg:text-7xl mb-6">
							Upcoming Exciting Event!
						</h2>
						<div className="max-w-xl">
							<p className="text-[17px] leading-relaxed opacity-80 my-12">
								Join us for an amazing event filled with interesting activities! Whether you're a foodie, a sports enthusiast, or a culture lover, we've got something for everyone. Don't miss out on this unforgettable experience!
							</p>
						</div>
						<Link 
						 to="/registration"
						 className="py-3 px-8 font-medium text-white bg-blue-600 hover:bg-opacity-90 rounded-full">
							Register Now
						</Link>
					</div>
					<div className="col-span-12 lg:col-span-5 relative text-center">
						<ShapeSeven />

						<div className="relative">
							<img
								src="https://cdn.easyfrontend.com/pictures/hero/hero-6.png"
								alt="Upcoming Event"
								className="max-w-full h-auto rounded-full mx-auto"
							/>
							<div className="absolute w-[500px] h-[500px] left-0 top-0 bg-slate-100 dark:bg-slate-800 rounded-full -z-20"></div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default UpcomingEvent;
