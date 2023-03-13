import React from 'react'

export type Description = string[]

export function describe(text: Description | undefined | null) {
  return (
    <>
      {(text || []).map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </>
  )
}
