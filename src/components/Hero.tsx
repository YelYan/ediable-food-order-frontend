import React from "react";
import { Clock, Star } from "lucide-react";

interface HeroSectionProps {
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
}) => {
  return (
    <section className="relative min-h-screen md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm text-orange-300 px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">#1 Food Delivery App</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Delicious Food,
            <span className="text-orange-500 block sm:inline">
              {" "}
              Delivered Fast
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Order from your favorite restaurants and get fresh meals delivered
            to your doorstep in 30 minutes or less
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up animation-delay-600">
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Order Now
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/30">
              View Menu
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in animation-delay-800">
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <Clock className="w-8 h-8 text-orange-400" />
              <span className="text-white font-medium">Fast Delivery</span>
              <span className="text-gray-300 text-sm">30 mins or less</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <Star className="w-8 h-8 text-orange-400" />
              <span className="text-white font-medium">Top Rated</span>
              <span className="text-gray-300 text-sm">4.8+ rating</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="w-8 h-8 text-orange-400 font-bold text-2xl">
                24/7
              </div>
              <span className="text-white font-medium">Always Open</span>
              <span className="text-gray-300 text-sm">Order anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent z-5" />
    </section>
  );
};

export default HeroSection;
