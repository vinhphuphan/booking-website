"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={16}
          className="absolute left-4 top-6 text-neutral-700"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required })}
        placeholder=" "
        className={`
        peer w-full
        pb-1 pt-5
        font-light bg-white rounded-lg border-2 outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? "pl-9 text-sm" : "pl-4"}
        border-neutral-300
        focus:border-black
        `}
      />
      <label
      className={`
      absolute top-1 z-10 text-xs text-zinc-400
      duration-150 transform transition-all
      peer-placeholder-shown:top-4
      peer-placeholder-shown:text-sm
      peer-focus:top-1
      peer-focus:text-sm  
      ${formatPrice ? "left-9" : "left-4"}
      `}
      >{label}</label>
    </div>
  );
};

export default Input;
