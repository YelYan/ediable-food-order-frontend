import React, { useState } from "react";
import {
  Star,
  Shield,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Clock,
  MapPin,
  Bell,
} from "lucide-react";

interface TakeawaySectionProps {
  phoneImage?: string;
  phoneImage2?: string;
}

const TakeawaySection: React.FC<TakeawaySectionProps> = ({
  phoneImage = "/phone-mockup.png",
  phoneImage2 = "/phone-mockup-2.png",
}) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track your order from restaurant to doorstep",
    },
    {
      icon: MapPin,
      title: "Live Location",
      description: "Know exactly where your delivery partner is",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Get updates on your order status instantly",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Multiple payment options with secure checkout",
    },
  ];

  const stats = [
    { value: "2M+", label: "Downloads" },
    { value: "4.8", label: "App Rating" },
    { value: "50K+", label: "Restaurants" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white to-orange-50">
      {/* Background Decorations */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-orange-200 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl opacity-20 animate-pulse" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Smartphone className="w-4 h-4" />
            Mobile App Available
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Take Your Cravings
            <span className="text-orange-500 block mt-2">On The Go</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download our mobile app and enjoy delicious food delivered to your
            doorstep with exclusive app-only offers
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* App Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? "bg-white shadow-lg scale-105"
                      : "hover:bg-white/50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      activeFeature === index
                        ? "bg-orange-500 text-white"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                  {activeFeature === index && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0 mt-4" />
                  )}
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Download now and get 30% off on your first order!
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* App Store Button */}
                <a
                  href="#"
                  className="group relative overflow-hidden bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 hover:bg-gray-900 transform hover:scale-105"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>

                {/* Google Play Button */}
                <a
                  href="#"
                  className="group relative overflow-hidden bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 hover:bg-gray-900 transform hover:scale-105"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 20.5v-17c0-.7.3-1.2.8-1.4l8.5 8.5-8.5 8.5c-.5-.2-.8-.7-.8-1.6zm10.1-1.3l2.4-2.4 2.9 1.7c.8.5.8 1.3 0 1.8l-2.9 1.7-2.4-2.8zm1.4-7.7L4.2 1.3c.3-.1.6-.1.9 0l9.4 5.5-2.4 2.4 2.4 2.3z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
              </div>
            </div>

            {/* App Stats */}
            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Phone Mockups */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-md">
              {/* Primary Phone */}
              <div className="relative z-20 animate-float">
                <img
                  src={phoneImage}
                  alt="Food delivery app"
                  className="w-full max-w-sm mx-auto drop-shadow-2xl"
                  onError={(e) => {
                    // Fallback to placeholder if image fails
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/300x600/1f2937/ffffff?text=App+Preview";
                  }}
                />
                {/* Floating Elements */}
                <div className="absolute top-10 -left-10 bg-white rounded-xl shadow-lg p-3 animate-bounce-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      🍕
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Pizza Delivered!</p>
                      <p className="text-xs text-gray-600">Just now</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-20 -right-10 bg-white rounded-xl shadow-lg p-3 animate-bounce-slow animation-delay-1000">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">4.9 Rating</span>
                  </div>
                </div>
              </div>

              {/* Secondary Phone (Partially Hidden) */}
              <div className="absolute top-12 left-12 z-10 opacity-50">
                <img
                  src={phoneImage2}
                  alt="Food delivery app secondary"
                  className="w-64 drop-shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/250x500/374151/ffffff?text=App+Preview+2";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Ready to order your favorite food?
              </h3>
              <p className="text-orange-100">
                Join millions of users already enjoying fast delivery
              </p>
            </div>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeawaySection;
