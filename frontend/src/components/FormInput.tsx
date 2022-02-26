import React from 'react';

interface FormInputProps {
  type: string;
  label: string;
  placeholder: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  return (
    <div className="mt-2">
      <span className="font-semibold text-base">{props.label}</span>
      <input
        type={props.type}
        className="border-2 px-2 py-1 w-full rounded-md border-gray-400 outline-none shadow-input focus:shadow-teal-700 focus:border-teal-700 transition-colors"
        placeholder={props.placeholder ? props.placeholder : ""}
        ref={ref}
      />
    </div>
  );
});

export default FormInput;
