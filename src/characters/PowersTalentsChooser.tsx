import { allPass, append, assoc, filter, includes, intersection, map, remove, without } from 'ramda'
import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'
import { meetsPrerequisites, MegalosCharacter, MegalosPower, powers } from './data'
import PowersTalentsPane, { PowerDisplay } from './PowersTalentsPane'

interface TableRowProps {
  power: MegalosPower
  isSelected: boolean
  togglePower: (power: MegalosPower) => any
}

function EditablePowerDisplay(props: TableRowProps) {
  const { power, isSelected, togglePower } = props
  return (
    <PowerDisplay power={power}>
      <div className='column is-narrow'>
        <button className='button is-primary' onClick={() => togglePower(power)}>
          <span className="icon">
            <i className={isSelected ? "fa-solid fa-minus" : "fa-solid fa-plus"} />
          </span>
        </button>
      </div>
    </PowerDisplay>
  )
}

function PowersTalentsChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  // TODO: add any required secondary powers, e.g. when a Throne takes the Tanking talent
  function addPower(power: MegalosPower) {
    setCharacter({
      ...character,
      powers: append(power, character.powers)
    })
  }

  function removePower(power: MegalosPower) {
    let newCharacter: MegalosCharacter = {
      ...character,
      powers: without([power], character.powers)
    }
    setCharacter(assoc("powers", filter(meetsPrerequisites(newCharacter), newCharacter.powers), newCharacter))
  }

  // Which powers have met prerequisites?
  const eligiblePowers = filter(meetsPrerequisites(character), powers)

  return (
    <>
      <div className="columns">
        <div className="column">
          {map(
            power => {
              const isSelected = includes(power, character.powers)
              return <EditablePowerDisplay power={power} isSelected={isSelected} togglePower={isSelected ? removePower : addPower} />
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
