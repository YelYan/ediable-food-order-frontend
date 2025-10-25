import React from "react";
import { Loader2, Pizza, UtensilsCrossed } from "lucide-react";

// 1. Simple Circular Spinner
export const SimpleSpinner: React.FC<{ size?: "sm" | "md" | "lg" | "xl" }> = ({
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-orange-500`}
      />
    </div>
  );
};

// 2. Spinner with Text
export const SpinnerWithText: React.FC<{
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
}> = ({ text = "Loading...", size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-orange-500`}
      />
      <p
        className={`${textSizeClasses[size]} text-gray-600 font-medium animate-pulse`}
      >
        {text}
      </p>
    </div>
  );
};

// 3. Food-themed Loading Spinner
export const FoodSpinner: React.FC<{
  variant?: "pizza" | "utensils";
  size?: "sm" | "md" | "lg" | "xl";
}> = ({ variant = "pizza", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const Icon = variant === "pizza" ? Pizza : UtensilsCrossed;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <Icon
          className={`${sizeClasses[size]} text-orange-500 animate-bounce`}
        />
        <div
          className={`absolute inset-0 ${sizeClasses[size]} animate-ping rounded-full bg-orange-400 opacity-20`}
        />
      </div>
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

// 4. Skeleton Loader for Content
export const SkeletonLoader: React.FC<{
  variant?: "card" | "list" | "text" | "image";
  count?: number;
}> = ({ variant = "card", count = 1 }) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-20" />
              <div className="h-8 bg-gray-200 rounded w-24" />
            </div>
          </div>
        );

      case "list":
        return (
          <div className="bg-white rounded-lg p-4 animate-pulse">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        );

      case "text":
        return (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        );

      case "image":
        return (
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

// 5. Full Page Loading Spinner
export const FullPageLoader: React.FC<{
  text?: string;
  backdrop?: boolean;
}> = ({ text = "Loading delicious food...", backdrop = true }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        backdrop ? "bg-black/50 backdrop-blur-sm" : "bg-white"
      }`}
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl">
        <FoodSpinner size="lg" />
        <p className="mt-4 text-gray-700 font-medium animate-pulse">{text}</p>
      </div>
    </div>
  );
};

// 6. Progress Bar Loader
export const ProgressLoader: React.FC<{
  progress: number;
  showPercentage?: boolean;
}> = ({ progress, showPercentage = true }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Loading...</span>
        {showPercentage && (
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// 7. Custom Animated Food Icons Loader
export const AnimatedFoodLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative">
        {/* Burger */}
        <div className="w-12 h-12 animate-bounce [animation-delay:-0.3s]">
          🍔
        </div>
      </div>
      <div className="relative">
        {/* Pizza */}
        <div className="w-12 h-12 animate-bounce [animation-delay:-0.15s]">
          🍕
        </div>
      </div>
      <div className="relative">
        {/* Sushi */}
        <div className="w-12 h-12 animate-bounce">🍱</div>
      </div>
    </div>
  );
};

// 8. Loading Overlay Component
export const LoadingOverlay: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  spinnerType?: "simple" | "food" | "animated";
}> = ({ isLoading, children, spinnerType = "simple" }) => {
  const renderSpinner = () => {
    switch (spinnerType) {
      case "food":
        return <FoodSpinner size="lg" />;
      case "animated":
        return <AnimatedFoodLoader />;
      default:
        return <SimpleSpinner size="lg" />;
    }
  };

  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          {renderSpinner()}
        </div>
      )}
    </div>
  );
};

// Main Loading Component Export
const LoadingSpinner: React.FC<{
  type?: "simple" | "withText" | "food" | "fullPage" | "skeleton" | "animated";
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  variant?: any;
}> = ({ type = "simple", size = "md", text, variant }) => {
  switch (type) {
    case "withText":
      return <SpinnerWithText text={text} size={size} />;
    case "food":
      return <FoodSpinner variant={variant} size={size} />;
    case "fullPage":
      return <FullPageLoader text={text} />;
    case "skeleton":
      return <SkeletonLoader variant={variant} />;
    case "animated":
      return <AnimatedFoodLoader />;
    default:
      return <SimpleSpinner size={size} />;
  }
};

export default LoadingSpinner;
