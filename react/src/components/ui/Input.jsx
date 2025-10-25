import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input className={`border px-2 py-1 rounded ${className}`} {...props} />
  );
}
