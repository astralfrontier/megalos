import React from "react";

interface FormInputProps {
  label: string;
  inputType: string;
  getter: any;
  setter: any;
  children?: any;
}

function onChange(setter: any) {
  return (event) => {
    console.log(`event triggered with value ${event.target.value}`);
    setter(event.target.value);
  };
}

function FormInput(props: FormInputProps) {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">
        <input
          className="input"
          type={props.inputType}
          value={props.getter}
          onChange={onChange(props.setter)}
        />
      </div>
      <p className="help">{props.children}</p>
    </div>
  );
}

export default FormInput;
