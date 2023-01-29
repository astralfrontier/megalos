import React from "react";

interface FormInputProps {
  label: string;
  help: string;
  children?: React.ReactNode;
}

function onChange(setter: any) {
  return (event) => setter(parseInt(event.target.value));
}

// Why, Javascript, why
function toRange(min: number, max: number): number[] {
  return [...Array(max + 1).keys()].slice(min);
}

function GenericInput(props: FormInputProps) {
  return (
    <div className="field">
      <label className="label" id={props.label}>
        {props.label}
      </label>
      <div className="control">
        <div className="select is-rounded">{props.children}</div>
      </div>
      <p className="help">{props.help}</p>
    </div>
  );
}

export default GenericInput;
