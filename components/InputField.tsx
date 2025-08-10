
import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ id, label, name, value, placeholder, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-base font-medium text-blue-300/80">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-900 border border-blue-800/60 text-gray-100 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors duration-200"
      />
    </div>
  );
};
