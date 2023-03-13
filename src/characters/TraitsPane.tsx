import { map, times } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'

interface TableRowProps {
  label: string
  value: string
}

function TableRow(props: TableRowProps) {
  const { label, value } = props
  return (
    <div className="column is-full">
      <p>
        <span className="tag is-primary">{label}</span>
      </p>
      {value}
    </div>
  )
}

function TraitsPane() {
  const { character } = useContext(CharacterContext)

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
