import React from "react";

export default function FilterSelect({
  icon: Icon,
  options,
  onChange,
  placeholder,
  label,
}) {
  return (
    <div className="flex mb-5 gap-5">
      <label className="flex justify-center items-center">
        <Icon className="w-8 h-8" />
      </label>
      <select
        multiple
        onChange={onChange}
        className="block w-full py-2 px-3 text-xl border rounded-lg bg-gray-700 border-gray-600"
        data-te-select-init
        data-te-class-dropdown="border rounded-b-lg bg-gray-700 border-gray-600"
        data-te-class-no-result="text-white"
        data-te-class-select-option="text-white py-2 pl-5"
        data-te-select-all="false"
        data-te-select-displayed-labels="1"
        data-te-select-options-selected-label="opties geselecteerd"
        data-te-select-placeholder={placeholder}
        data-te-select-visible-options="4"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label data-te-select-label-ref>{label}</label>
    </div>
  );
}
