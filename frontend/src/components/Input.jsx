import React from "react";

export default React.forwardRef(function Input(
  { id, label, type = "text", className = "", className2 = "", ...props },
  ref
) {
  return (
    <>
      <div>
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className2}`}
        >
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          type={type}
          id={id}
          className={`block w-full p-2  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        />
      </div>
    </>
  );
});
