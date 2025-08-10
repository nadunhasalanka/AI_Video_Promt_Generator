
import React from 'react';

interface SelectFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export const SelectField: React.FC<SelectFieldProps> = ({ id, label, name, value, onChange, options }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-base font-medium text-blue-300/80">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-900 border border-blue-800/60 text-gray-100 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors duration-200"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
