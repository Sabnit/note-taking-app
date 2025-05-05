import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import ErrorMessage from "../atoms/ErrorMessage";

const FormField = ({
  label,
  type = "text",
  id,
  name,
  value,
  ref,
  placeholder,
  onChange,
  onBlur,
  error = false,
  inputClassName,
}) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id}> {label} </Label>
      <Input
        className={inputClassName}
        type={type}
        id={id}
        name={name}
        value={value}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      />
      {error && <ErrorMessage> {error}</ErrorMessage>}
    </div>
  );
};

export default FormField;
