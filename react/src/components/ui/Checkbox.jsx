import React from "react";

export function Checkbox({
  checked,
  onCheckedChange,
  className = "",
  ...props
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
      className={className}
      {...props}
    />
  );
}
