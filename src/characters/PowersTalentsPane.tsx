import { map, times } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import { MegalosPower } from './data'

interface TableRowProps {
  power: MegalosPower
}

function TableRow(props: TableRowProps) {
  const { power } = props
  return (
    <div className="columns" key={power.name}>
      <div className={"column is-narrow"}>
        {power.type}
      </div>
      <div className="column">{power.name}</div>
    </div>
  )
}

function PowersTalentsPane() {
  const { character } = useContext(CharacterContext)

  return (
    <>
      <article className="message">
        <div className="message-header">
          <p>Talents and Powers</p>
        </div>
        <div className="message-body">
          {map(
            (power) => (
              <TableRow
                power={power}
              />
            ),
            character.powers
          )}
        </div>
      </article>
    </>
  )
}

export default PowersTalentsPane
