import { ComponentProps } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

type InputFormProps<T> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  spanText?: string;
  options?: React.FC<unknown>;
} & ComponentProps<"input"> &
  ComponentProps<"label">;

export default function InputForm({
  title,
  htmlFor,
  spanText,
  register,
  errors,
  name,
  type,
  placeholder,
  options,
}: InputFormProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {title}:
      </Label>
      <div className="flex w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
        {spanText && (
          <span className="flex items-center justify-center bg-zinc-300 px-4 py-2 text-sm text-gray-700 dark:bg-gray-600 dark:text-gray-100">
            {spanText}
          </span>
        )}
        <Input
          id={htmlFor}
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className="h-full w-full rounded-r-lg border-none bg-transparent px-4 py-2 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-0 dark:text-white"
        />
        {options && options}
      </div>

      {errors[name] && <span className="text-red-500">{String(errors[name]?.message)}</span>}
    </div>
  );
}
