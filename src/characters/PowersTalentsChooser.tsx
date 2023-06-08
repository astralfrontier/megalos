import {
  add,
  all,
  append,
  assoc,
  filter,
  find,
  has,
  includes,
  lte,
  map,
  path,
  propEq,
  reduce,
  reject,
  without,
} from 'ramda'
import React, { useContext, useEffect, useState } from 'react'
import slugify from 'slugify'

import { CharacterContext } from '../GameStateProvider'
import { describe } from '../visuals'
import {
  meetsPrerequisites,
  MegalosClassBenefits,
  MegalosPower,
  powers,
  recalculatePowers,
} from './data'
import PowersTalentsPane from './PowersTalentsPane'

interface BenefitsTabProps {
  label: string
  value: number | undefined
  maximum: number | undefined
  selectedTab: string
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>
}

const BENEFIT_TYPES = [
  'talents',
  'invocations',
  'arcana',
  'strikes',
  'counters',
  'sorceries',
  'cantrips',
]

const EMPTY_BENEFIT_COSTS: MegalosClassBenefits = reduce(
  (costs, benefit) => assoc(benefit, 0, costs),
  {},
  BENEFIT_TYPES
)

function BenefitsTab(props: BenefitsTabProps) {
  if (!props.maximum) {
    return <></>
  } else {
    const value = props.value || 0
    return (
      <>
        <li className={props.selectedTab == props.label ? 'is-active' : ''}>
          <a onClick={() => props.setSelectedTab(props.label)}>
            <strong className={value > props.maximum ? 'has-text-danger' : ''}>
              {props.label.charAt(0).toUpperCase() + props.label.slice(1)}
            </strong>
            : {value}/{props.maximum}
          </a>
        </li>
      </>
    )
  }
}

function addPowerCost(
  benefits: MegalosClassBenefits,
  power: MegalosPower
): MegalosClassBenefits {
  return reduce(
    (costs, benefit) =>
      assoc(
        benefit,
        add(
          path([benefit], benefits) || 0,
          path(['costs', benefit], power) || 0
        ),
        costs
      ),
    {},
    BENEFIT_TYPES
  )
}

function PowersTalentsChooser() {
  const { character, setCharacter } = useContext(CharacterContext)
  const [selectedTab, setSelectedTab] = useState<string>('talents')

  useEffect(() => {
    setSelectedTab('talents')
  }, [character.class.name])

  const benefitsUsed = reduce(
    addPowerCost,
    EMPTY_BENEFIT_COSTS,
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
    return all(
      (benefit) =>
        lte(
          (path([benefit], budgetWithPower) as number) || 0,
          path(['class', 'benefits', benefit], character) || 0
        ),
      BENEFIT_TYPES
    )
  }

  return (
    <>
      <div className="columns">
        <div className="column">
          <div className="tabs">
            <ul>
              {map(
                (benefit) => (
                  <BenefitsTab
                    label={benefit}
                    value={path([benefit], benefitsUsed)}
                    maximum={path(['class', 'benefits', benefit], character)}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                ),
                BENEFIT_TYPES
              )}
            </ul>
          </div>
          <div>
            {map((power) => {
              const isSelected = includes(power, character.powers)
              const isSelectable = isSelected || hasBudget(power)
              return (
                <>
                  <div className="block card">
                    <div className="card-content">
                      <div className="has-background-primary p-1">
                        <label
                          className="checkbox"
                          aria-disabled={!isSelectable}
                        >
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
                          <strong
                            className={
                              isSelectable ? 'has-text-white' : 'has-text-grey'
                            }
                          >
                            {power.type}: {power.name}
                          </strong>
                        </label>
                      </div>
                      <div className={isSelectable ? '' : 'has-text-grey'}>
                        {describe(power.description)}
                      </div>
                    </div>
                  </div>
                </>
              )
            }, displayedPowers)}
            {displayedPowers.length == 0 ? (
              <p>
                Don't see any powers? Make sure you meet the prerequisites. For
                example, you can't select Arcana until you've selected an
                Invocation.
              </p>
            ) : (
              <></>
            )}
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
