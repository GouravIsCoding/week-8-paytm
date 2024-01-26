import React from "react";

export default function Container({
  className = "",
  className2 = "",
  children,
}) {
  return (
    <>
      <div
        className={`flex items-center justify-center h-screen ${className2}`}
      >
        <div
          className={`w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ${className}`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
