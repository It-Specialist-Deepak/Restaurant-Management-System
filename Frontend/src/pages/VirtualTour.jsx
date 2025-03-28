import React from "react";

const Shapes = () => (
	<>
		<div className="absolute top-12 left-12">
			<img
				src="https://cdn.easyfrontend.com/pictures/hero/header36-abstract1.png"
				alt=""
				className="max-w-full h-auto"
			/>
		</div>
		<div className="absolute bottom-12 left-12">
			<img
				src="https://cdn.easyfrontend.com/pictures/hero/header39-abstract2.png"
				alt=""
				className="max-w-full h-auto"
			/>
		</div>
		<div className="absolute top-1/2 left-1/2">
			<img
				src="https://cdn.easyfrontend.com/pictures/hero/header39-abstract3.png"
				alt=""
				className="max-w-full h-auto"
			/>
		</div>
	</>
);

const VirtualTour = () => {
	return (
		<section className="py-28 md:py-[300px] bg-[#d9d4d0] text-zinc-900 relative overflow-hidden z-10">
			<div
				className="absolute top-0 right-0 bottom-0 h-full w-[85%] bg-center bg-cover bg-no-repeat -z-10"
				style={{
					backgroundImage:
						"url(https://cdn.easyfrontend.com/pictures/hero/header-child-bg.png)",
				}}
			/>
			<Shapes />

			<div className="container px-4 mx-auto">
				<div className="flex max-w-xl items-center justify-center">
					<div>
						<h2 className="text-[40px] lg:text-[64px] leading-tight font-bold mb-6 md:mb-12">
							Bring Your Own Rainbow
						</h2>
						<button
							type="button"
							className="text-base font-bold bg-blue-600 text-white rounded-lg py-4 px-10 leading-none cursor-pointer hover:bg-opacity-90"
						>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default VirtualTour;
