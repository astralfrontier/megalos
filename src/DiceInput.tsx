import React from "react";

import GenericInput from "./GenericInput";

interface DiceInputProps {
  label: string;
  min: number;
  max: number;
  getter: any;
  setter: any;
  help: string;
  children?: any;
}

function onChange(setter: any) {
  return (event) => setter(parseInt(event.target.value));
}

// Why, Javascript, why
function toRange(min: number, max: number): number[] {
  return [...Array(max + 1).keys()].slice(min);
}

function DiceInput(props: DiceInputProps) {
  return (
    <GenericInput label={props.label} help={props.help}>
      <select onChange={onChange(props.setter)} value={props.getter}>
        {toRange(props.min, props.max).map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </GenericInput>
  );
}

export default DiceInput;
