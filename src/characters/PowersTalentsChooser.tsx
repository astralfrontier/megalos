import { allPass, append, filter, includes, intersection, map, remove, without } from 'ramda'
import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'
import { meetsPrerequisites, MegalosCharacter, MegalosPower, powers } from './data'
import PowersTalentsPane from './PowersTalentsPane'

interface TableRowProps {
  power: MegalosPower
  isSelected: boolean
  togglePower: (power: MegalosPower) => any
}

function TableRow(props: TableRowProps) {
  const { power, isSelected, togglePower } = props
  return (
    <div className="columns is-vcentered" key={power.name}>
      <div className='column is-narrow'>
        {power.type}
      </div>
      <div className="column">{power.name}</div>
      <div className='column is-narrow'>
        <button className='button is-primary' onClick={() => togglePower(power)}>
          <span className="icon">
            <i className={isSelected ? "fa-solid fa-minus" : "fa-solid fa-plus"} />
          </span>
        </button>
      </div>
    </div>
  )
}

function PowersTalentsChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  const eligiblePowers = filter(meetsPrerequisites(character), powers)

  function addPower(power: MegalosPower) {
    setCharacter({
      ...character,
      powers: append(power, character.powers)
    })
  }

  function removePower(power: MegalosPower) {
    setCharacter({
      ...character,
      powers: without([power], character.powers)
    })
  }

  return (
    <>
      <div className="columns">
        <div className="column">
          {map(
            power => {
              const isSelected = includes(power, character.powers)
              return <TableRow power={power} isSelected={isSelected} togglePower={isSelected ? removePower : addPower} />
            },
            eligiblePowers
          )}
        </div>
        <div className="column">
          <PowersTalentsPane />
        </div>
      </div>
    </>

  )
}

export default PowersTalentsChooser
