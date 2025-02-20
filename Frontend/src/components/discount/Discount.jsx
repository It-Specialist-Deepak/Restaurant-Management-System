const Discount = () => {
    return (
      <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 bg-gray-900 text-white">
        {/* Discount Image */}
        <img
          alt="Shocked Woman Reacting to Discount"
          src="https://static.vecteezy.com/system/resources/previews/052/387/433/non_2x/a-shocked-woman-expressing-surprise-and-fear-in-a-close-up-shot-against-a-transparent-background-shocked-woman-surprised-and-scared-file-of-isolated-object-on-transparent-background-free-png.png"
          className="h-40 w-full object-cover md:h-full"
        />
  
        {/* Discount Text */}
        <div className="p-6 text-center sm:p-8 md:col-span-2 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
            🎉 Limited Time Surprise!
          </p>
  
          <h2 className="mt-4 font-black uppercase">
            <span className="text-4xl sm:text-5xl lg:text-6xl"> OMG! 20% OFF </span>
            <span className="mt-2 block text-sm text-gray-300">
              Only for <span className="font-bold">today</span> on orders above <span className="font-bold">$50</span>!
            </span>
          </h2>
  
          {/* CTA Button with Hover Effect */}
          <a
            className="mt-6 inline-block w-full bg-yellow-500 py-3 text-sm font-bold uppercase tracking-widest text-black rounded-lg shadow-md 
            hover:bg-yellow-400 hover:scale-105 transition-transform duration-300"
            href="#"
          >
            Claim Your Deal Now 🔥
          </a>
  
          <p className="mt-6 text-xs font-medium uppercase text-gray-400">
            Offer expires in <span className="font-bold">24 hours!</span> Don't miss out! ⏳
          </p>
        </div>
      </section>
    );
  };
  
  export default Discount;
  