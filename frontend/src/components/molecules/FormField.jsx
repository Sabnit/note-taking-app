import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import ErrorMessage from "../atoms/ErrorMessage";

const FormField = ({
  label,
  labelClassName,
  labelPosition = "left",
  type = "text",
  id,
  name,
  value,
  ref,
  placeholder,
  onChange,
  onBlur,
  inputClassName,
  formClassName,
  error = false,
}) => {
  const inputElement = (
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
  );

  const labelElement = label ? (
    <Label htmlFor={id} className={labelClassName}>
      {label}
    </Label>
  ) : null;

  return (
    <div className={`${formClassName} mb-4`}>
      {label && labelPosition === "left" && labelElement}
      {inputElement}
      {label && labelPosition === "right" && labelElement}
      {error && <ErrorMessage> {error}</ErrorMessage>}
    </div>
  );
};

export default FormField;
