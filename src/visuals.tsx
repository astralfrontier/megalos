import React from 'react'
import ReactMarkdown from 'react-markdown'

export type Description = string[]

export function describe(text: Description | undefined | null) {
  return (
    <>
      {(text || []).map((line, i) => (
        <ReactMarkdown key={i}>{line}</ReactMarkdown>
      ))}
    </>
  )
}
