import { allPass, append, assoc, filter, includes, intersection, map, prop, reject, remove, without } from 'ramda'
import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'
import { meetsPrerequisites, MegalosCharacter, MegalosPower, powers, recalculatePowers } from './data'
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
        <button className={isSelected ? 'button is-warning' : 'button is-primary'} onClick={() => togglePower(power)}>
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

  function addPower(power: MegalosPower) {
    setCharacter(
      assoc(
        "powers",
        recalculatePowers(
          character,
          append(power, character.powers)
        ),
        character
      )
    )
  }

  function removePower(power: MegalosPower) {
    setCharacter(
      assoc(
        "powers",
        recalculatePowers(
          character,
          without([power], character.powers)
        ),
        character
      )
    )
  }

  // Which powers have met prerequisites, and aren't mandatory?
  const eligiblePowers = reject((power: MegalosPower) => power.mandatory, filter(meetsPrerequisites(character), powers))

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
