import React from 'react'

import { CharacterContext } from '../GameStateProvider'

import type { MegalosCharacter } from './data'

interface TraitsPaneProps {
  character: MegalosCharacter
}

interface TableRowProps {
  label: string
  value: string
}

function TableRow(props: TableRowProps) {
  const { label, value } = props
  return (
    <div className={`block columns is-vcentered`} key={label}>
      <div className={`column is-narrow`}>
        <span className="tag is-primary">{label}</span>
      </div>
      <div className="column">{value}</div>
    </div>
  )
}

function TraitsPane(props: TraitsPaneProps) {
  const { character } = props

  return (
    <>
      <article className="message">
        <div className="message-header">
          <p>Traits</p>
        </div>
        <div className="message-body">
          <TableRow label={'Background'} value={character.traits.background} />
          <TableRow label={'Mental'} value={character.traits.mental} />
          <TableRow label={'Physical'} value={character.traits.physical} />
          <TableRow label={'Special'} value={character.traits.special} />
        </div>
      </article>
    </>
  )
}

export default TraitsPane
