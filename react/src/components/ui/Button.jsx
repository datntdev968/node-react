import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
