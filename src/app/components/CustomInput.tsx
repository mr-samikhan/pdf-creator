import React from "react";

interface FormData {
  name: string;
  label?: string; // <-- add label prop
  value: string;
  placeholder: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number" | "date";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = (props: FormData) => {
  const { name, label, value, onChange, placeholder, required, type } = props;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && ( // if label exists, show it
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        type={type || "text"}
        placeholder={placeholder}
        className="w-full border p-2 rounded text-gray-800"
      />
    </div>
  );
};

export default CustomInput;
