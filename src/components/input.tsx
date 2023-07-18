import React from "react";
interface InputProps {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, ...props }) => {
  return (
    <>
      <label>{label}</label>
      <input value={value} onChange={onChange} {...props} />
    </>
  );
};

export default Input;
