import Link from "next/link";
import { GoogleFonts } from "next-google-fonts";

interface InputProps {
  label: string;
  [key: string]: any;
}

function Input({ label, ...props }: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input {...props} />
    </>
  );
}

export default Input;
