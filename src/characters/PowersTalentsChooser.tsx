import { add, allPass, append, assoc, filter, includes, intersection, map, prop, reduce, reject, remove, without } from 'ramda'
import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'
import { meetsPrerequisites, MegalosCharacter, MegalosClassBenefits, MegalosPower, powers, recalculatePowers } from './data'
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

interface BenefitsUsedProps {
  character: MegalosCharacter
}

interface BenefitUsedProps {
  label: string;
  value: number | undefined
  maximum: number | undefined
}

function BenefitUsed(props: BenefitUsedProps) {
  if (!props.maximum) {
    return <></>
  } else {
    const value = props.value || 0
    return (
      <>
        <div className='column has-text-centered'>
          <p><strong className={value > props.maximum ? "has-text-danger" : ""}>{props.label}</strong>: {value}/{props.maximum}</p>
        </div>
      </>
    )
  }
}

function BenefitsUsed(props: BenefitsUsedProps) {
  const {character} = props

  const benefitsUsed = reduce(
    (benefits: MegalosClassBenefits, power: MegalosPower): MegalosClassBenefits => ({
      invocations: add(benefits.invocations || 0, power.costs.invocations || 0),
      arcana: add(benefits.arcana || 0, power.costs.arcana || 0),
      strikes: add(benefits.strikes || 0, power.costs.strikes || 0),
      counters: add(benefits.counters || 0, power.costs.counters || 0),
      sorceries: add(benefits.sorceries || 0, power.costs.sorceries || 0),
      cantrips: add(benefits.cantrips || 0, power.costs.cantrips || 0),
      talents: add(benefits.talents || 0, power.costs.talents || 0),
    }),
    {
      invocations: 0,
      arcana: 0,
      strikes: 0,
      counters: 0,
      sorceries: 0,
      cantrips: 0,
      talents: 0
    },
    character.powers
  )

  return (
    <>
      <div className='columns'>
        <BenefitUsed label='Invocations' value={benefitsUsed.invocations} maximum={character.class.benefits.invocations} />
        <BenefitUsed label='Arcana' value={benefitsUsed.arcana} maximum={character.class.benefits.arcana} />
        <BenefitUsed label='Strikes' value={benefitsUsed.strikes} maximum={character.class.benefits.strikes} />
        <BenefitUsed label='Counters' value={benefitsUsed.counters} maximum={character.class.benefits.counters} />
        <BenefitUsed label='Sorceries' value={benefitsUsed.sorceries} maximum={character.class.benefits.sorceries} />
        <BenefitUsed label='Cantrips' value={benefitsUsed.cantrips} maximum={character.class.benefits.cantrips} />
        <BenefitUsed label='Talents' value={benefitsUsed.talents} maximum={character.class.benefits.talents} />
      </div>
    </>
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
          <BenefitsUsed character={character} />
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
