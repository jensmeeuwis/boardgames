import React from "react";

export default function FilterSelect({
  icon: Icon,
  options,
  onChange,
  placeholder,
  label,
}) {
  return (
    <div className="flex w-full mb-5 gap-5 text-xl [&_[data-te-select-wrapper-ref]]:flex-1 [&_[data-te-select-input-ref]]:bg-button">
      <label className="flex justify-center items-center">
        <Icon className="w-8 h-8" />
      </label>
      <select
        multiple
        onChange={onChange}
        data-te-select-init
        data-te-class-dropdown="border rounded-b-lg bg-button border-border"
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
