// src/components/LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = ({ size = "md", text = "Đang tải...", height='' }) => {
  const sizeClasses:any = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-4",
    lg: "w-10 h-10 border-[6px]",
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 mt-10${height}`}>
      <div
        className={`rounded-full border-t-transparent border-amazonOrange animate-spin ${sizeClasses[size]}`}
      />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
