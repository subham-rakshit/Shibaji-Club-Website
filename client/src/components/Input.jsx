import { useId, forwardRef } from "react";

import { Label, TextInput } from "flowbite-react";

const Input = forwardRef(function Input(
  { label, type = "text", labelText = "", required = 1, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full mb-2">
      <div className="mb-1 block">
        <Label
          htmlFor={id}
          value={labelText}
          className="font-semibold font-[Inter] text-xs"
        />
      </div>
      <TextInput
        id={id}
        type={type}
        ref={ref}
        className="font-[Inter]"
        {...props}
        autoComplete="off"
        required={required}
        shadow
      />
    </div>
  );
});

export default Input;
