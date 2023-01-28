import React from "react";

interface FormInputProps {
  label: string;
  min: number;
  max: number;
  getter: any;
  setter: any;
  children?: any;
}

function onChange(setter: any) {
  return (event) => setter(parseInt(event.target.value))
}

// Why, Javascript, why
function toRange(min: number, max: number): number[] {
  return [...Array(max + 1).keys()].slice(min)
}

function FormInput(props: FormInputProps) {
  return (
    <div className="field">
      <label className="label" id={props.label}>{props.label}</label>
      <div className="control">
        <div className="select is-rounded">
          <select onChange={onChange(props.setter)} value={props.getter}>
            {toRange(props.min, props.max).map(value => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="help">{props.children}</p>
    </div>
  );
}

export default FormInput;
