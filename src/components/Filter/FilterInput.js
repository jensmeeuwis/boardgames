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
      className="block w-full py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
