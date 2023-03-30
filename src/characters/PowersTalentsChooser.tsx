import { add, append, assoc, filter, find, has, includes, map, propEq, reduce, reject, without } from 'ramda'
import React, { useContext, useState } from 'react'
import slugify from 'slugify'

import { CharacterContext } from '../GameStateProvider'
import { describe } from '../visuals'
import { meetsPrerequisites, MegalosClassBenefits, MegalosPower, powers, recalculatePowers } from './data'
import classes from './PowersTalentsChooser.module.css'
import PowersTalentsPane from './PowersTalentsPane'

interface BenefitsTabProps {
  label: string
  value: number | undefined
  maximum: number | undefined
  selectedTab: string
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>
}

function BenefitsTab(props: BenefitsTabProps) {
  if (!props.maximum) {
    return <></>
  } else {
    const value = props.value || 0
    return (
      <>
        <li
          className={
            props.selectedTab == props.label.toLowerCase() ? 'is-active' : ''
          }
        >
          <a onClick={() => props.setSelectedTab(props.label.toLowerCase())}>
            <strong className={value > props.maximum ? 'has-text-danger' : ''}>
              {props.label}
            </strong>
            : {value}/{props.maximum}
          </a>
        </li>
      </>
    )
  }
}

// TODO: functionalize so we don't have to enumerate over every object key
function addPowerCost(
  benefits: MegalosClassBenefits,
  power: MegalosPower
): MegalosClassBenefits {
  return {
    invocations: add(benefits.invocations || 0, power.costs.invocations || 0),
    arcana: add(benefits.arcana || 0, power.costs.arcana || 0),
    strikes: add(benefits.strikes || 0, power.costs.strikes || 0),
    counters: add(benefits.counters || 0, power.costs.counters || 0),
    sorceries: add(benefits.sorceries || 0, power.costs.sorceries || 0),
    cantrips: add(benefits.cantrips || 0, power.costs.cantrips || 0),
    talents: add(benefits.talents || 0, power.costs.talents || 0),
  }
}

function PowersTalentsChooser() {
  const { character, setCharacter } = useContext(CharacterContext)
  const [selectedTab, setSelectedTab] = useState<string>('talents')

  const benefitsUsed = reduce(
    addPowerCost,
    {
      invocations: 0,
      arcana: 0,
      strikes: 0,
      counters: 0,
      sorceries: 0,
      cantrips: 0,
      talents: 0,
    },
    character.powers
  )

  // Which powers have met prerequisites, and aren't mandatory?
  const eligiblePowers = reject(
    (power: MegalosPower) => power.mandatory,
    filter(meetsPrerequisites(character), powers)
  )

  const displayedPowers = filter(
    (power: MegalosPower) => has(selectedTab, power.costs),
    eligiblePowers
  )

  const powerSetter: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const power = find(
      propEq('name', event.currentTarget.value),
      eligiblePowers
    )
    if (power) {
      const newPowers = event.currentTarget.checked
        ? append(power, character.powers)
        : without([power], character.powers)
      setCharacter(
        assoc('powers', recalculatePowers(character, newPowers), character)
      )
    }
  }

  function hasBudget(power: MegalosPower) {
    const budgetWithPower = addPowerCost(benefitsUsed, power)
    return (
      (budgetWithPower.invocations || 0) <=
        (character.class.benefits.invocations || 0) &&
      (budgetWithPower.arcana || 0) <= (character.class.benefits.arcana || 0) &&
      (budgetWithPower.strikes || 0) <=
        (character.class.benefits.strikes || 0) &&
      (budgetWithPower.counters || 0) <=
        (character.class.benefits.counters || 0) &&
      (budgetWithPower.sorceries || 0) <=
        (character.class.benefits.sorceries || 0) &&
      (budgetWithPower.cantrips || 0) <=
        (character.class.benefits.cantrips || 0) &&
      (budgetWithPower.talents || 0) <= (character.class.benefits.talents || 0)
    )
  }

  return (
    <>
      <div className="columns">
        <div className="column">
          <div className="tabs">
            <ul>
              <BenefitsTab
                label="Talents"
                value={benefitsUsed.talents}
                maximum={character.class.benefits.talents}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <BenefitsTab
                label="Invocations"
                value={benefitsUsed.invocations}
                maximum={character.class.benefits.invocations}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <BenefitsTab
                label="Arcana"
                value={benefitsUsed.arcana}
                maximum={character.class.benefits.arcana}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <BenefitsTab
                label="Strikes"
                value={benefitsUsed.strikes}
                maximum={character.class.benefits.strikes}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <BenefitsTab
                label="Counters"
                value={benefitsUsed.counters}
                maximum={character.class.benefits.counters}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <BenefitsTab
                label="Sorceries"
                value={benefitsUsed.sorceries}
                maximum={character.class.benefits.sorceries}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <BenefitsTab
                label="Cantrips"
                value={benefitsUsed.cantrips}
                maximum={character.class.benefits.cantrips}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            </ul>
          </div>
          <div className={classes.powersTalentsCheckboxes}>
            {map((power) => {
              const isSelected = includes(power, character.powers)
              const isSelectable = isSelected || hasBudget(power)
              return (
                <>
                  <div className="p-3">
                    <div className={classes.powersTalentsCheckbox}>
                      <label className="checkbox" aria-disabled={!isSelectable}>
                        <input
                          id={`power-checkbox-${slugify(
                            power.name.toLowerCase()
                          )}`}
                          type="checkbox"
                          value={power.name}
                          disabled={!isSelectable}
                          checked={isSelected}
                          onChange={powerSetter}
                        />{' '}
                        <strong>{power.type}</strong>: {power.name}
                      </label>
                    </div>
                  </div>
                  <div className="mx-5">{describe(power.description)}</div>
                </>
              )
            }, displayedPowers)}
          </div>
        </div>
        <div className="column">
          <PowersTalentsPane character={character} />
        </div>
      </div>
    </>
  )
}

export default PowersTalentsChooser
