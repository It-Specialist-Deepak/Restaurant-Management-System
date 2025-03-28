import React from "react";

const PhotoGallery = () => {
	return (
		<section className="py-14 md:py-24 bg-white text-zinc-900 relative overflow-hidden z-10">
			<div className="container px-4 mx-auto relative">
				<div className="grid grid-cols-12 items-center">
					<div className="col-span-12 lg:col-span-6 text-center lg:text-start">
						<div className="bg-slate-100 p-12 rounded-lg shadow-lg">
							<h2 className="text-2xl leading-snug md:text-[40px] mb-6">
								Architecture is a very important thing in building.
							</h2>
							<p className="text-lg leading-normal opacity-80">
								Dominion dry make shall is is greater fish moving set seas open
								man which. Green make appear moveth fruit likeness.
							</p>
							<div className="mt-12">
								<a
									href="#!"
									className="bg-blue-600 hover:bg-opacity-90 text-white border border-blue-600 rounded transition py-3 px-7 font-normal"
								>
									Read more
								</a>
							</div>
						</div>
					</div>
					<div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end">
						<div
							className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-cover bg-center rounded-full"
							style={{
								backgroundImage:
									"url(https://cdn.easyfrontend.com/pictures/sign-in-up/sign2.jpg)",
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PhotoGallery;
