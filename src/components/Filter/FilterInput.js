import React from "react";

export default function FilterInput({
  type,
  id,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      id={id}
      className="block w-full py-2 px-3 text-xl border rounded-lg bg-button border-border"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
