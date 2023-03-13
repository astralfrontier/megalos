import React from 'react'

interface FormInputProps {
  label: string
  help: string
  children?: React.ReactNode
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
  )
}

export default GenericInput
