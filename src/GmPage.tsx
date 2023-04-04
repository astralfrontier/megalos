import {
  all,
  always,
  append,
  assoc,
  assocPath,
  both,
  filter,
  isEmpty,
  isNil,
  join,
  map,
  prop,
  remove,
  repeat,
  times,
} from 'ramda'
import React, { useContext, useState } from 'react'

import {
  Combatant,
  CombatantType,
  InitiativeContext,
} from './GameStateProvider'
import GenericInput from './GenericInput'

interface InitiativePartitionProps {
  combatants: Combatant[]
  partition: number
  isActive: boolean
  updateCombatant: (idx: number, field: string, value: any) => void
  deleteCombatant: (idx: number) => void
}

// Element 0 is fast MCs
// Element 1 is enemies
// Element 2 is slow MCs
// Element 3 is boss/elite enemies
const partitioningRules = [
  filter(
    (combatant: Combatant) =>
      combatant.type == CombatantType.MC && combatant.fast
  ),
  filter((combatant: Combatant) => combatant.type != CombatantType.MC),
  filter(
    (combatant: Combatant) =>
      combatant.type == CombatantType.MC && !combatant.fast
  ),
  filter(
    (combatant: Combatant) =>
      combatant.type == CombatantType.BOSS ||
      combatant.type == CombatantType.ELITE
  ),
]

const partitioningAp = [
  always(2),
  always(2),
  always(3),
  (combatant: Combatant) => (combatant.type == CombatantType.BOSS ? 2 : 1),
]

const partitionLabels = [
  '🚀 Fast Actions',
  '🗡️ Enemy Actions',
  '🐢 Slow Actions',
  '💀 Elite/Boss Actions',
]

function InitiativePartition(props: InitiativePartitionProps) {
  const { combatants, partition, isActive, updateCombatant, deleteCombatant } =
    props

  const actedProperty = partition == 3 ? 'actedBonus' : 'acted'

  return (
    <>
      <tr className={isActive ? 'is-selected' : ''}>
        <td colSpan={5}>
          <strong>{partitionLabels[partition]}</strong>
        </td>
      </tr>
      {combatants.map((combatant) => (
        <tr>
          <td>
            <button
              className="delete"
              onClick={() => deleteCombatant(combatant.order || 0)}
            ></button>
            <span
              className="clickable"
              onClick={() => {
                const newName = prompt('New combatant name', combatant.name)
                if (!isNil(newName) && !isEmpty(newName)) {
                  updateCombatant(combatant.order || 0, 'name', newName)
                }
              }}
            >
              {combatant.name}
            </span>
          </td>
          <td>{combatant.type}</td>
          <td>
            <input
              type={'checkbox'}
              checked={combatant.fast}
              onChange={(event) =>
                updateCombatant(
                  combatant.order || 0,
                  'fast',
                  event.currentTarget.checked
                )
              }
              disabled={combatant.type != CombatantType.MC}
            />
            {join('', repeat('◆', partitioningAp[partition](combatant)))}◇
          </td>
          <td>
            <input
              type={'checkbox'}
              checked={combatant[actedProperty]}
              onChange={(event) =>
                updateCombatant(
                  combatant.order || 0,
                  actedProperty,
                  event.currentTarget.checked
                )
              }
            />
          </td>
          <td>
            <span
              className="clickable"
              onClick={() => {
                const newNotes = prompt('New notes', combatant.notes)
                if (newNotes != null) {
                  updateCombatant(combatant.order || 0, 'notes', newNotes)
                }
              }}
            >
              {combatant.notes || '(no notes)'}
            </span>
          </td>
        </tr>
      ))}
    </>
  )
}

function reindex(combatants: Combatant[]): Combatant[] {
  return combatants.map((combatant, i) => assoc('order', i, combatant))
}

function GmPage() {
  const { grit, setGrit, combatants, setCombatants } =
    useContext(InitiativeContext)

  const [newCombatantType, setNewCombatantType] = useState<CombatantType>(
    CombatantType.MC
  )

  function onClickInitializeRound(_event) {
    const newCombatants = map(
      (combatant) =>
        assoc('actedBonus', false, assoc('acted', false, combatant)),
      combatants
    )
    setCombatants(newCombatants)
  }

  function updateCombatant(idx: number, field: string, value: any) {
    setCombatants(assocPath([idx, field], value, combatants))
  }

  function deleteCombatant(idx: number) {
    setCombatants(reindex(remove(idx, 1, combatants)))
  }

  function createCombatant() {
    const name = prompt('New combatant name', 'New Combatant')
    if (!isNil(name) && !isEmpty(name)) {
      const newCombatant: Combatant = {
        name: name || 'New Combatant',
        type: newCombatantType,
        fast: false,
        acted: true,
        actedBonus: true,
        notes: '',
      }
      setCombatants(reindex(append(newCombatant, combatants)))
    }
  }

  // Split combatants into Fast, Enemy, Slow, Boss partitions
  const partitionedCombatants = map(
    (rule) => rule(combatants),
    partitioningRules
  )

  // In which partitions has everyone taken an action?
  const partitionsByActed = partitionedCombatants.map((partition, i) =>
    all(prop(i == 3 ? 'actedBonus' : 'acted'), partition)
  )

  // Where is the first place nobody has acted?
  const firstPendingPartition = partitionsByActed.indexOf(false)

  // Has everyone gone? (indicating we can enable the "New Round" button)
  const hasEveryoneActed = firstPendingPartition == -1

  return (
    <>
      <div className="box block">
        <div className="columns is-vcentered">
          <div className="column is-narrow">
            <h3 className="title">Grit</h3>
            <button
              id="skill-minus-button"
              className="button is-primary"
              onClick={() => setGrit(Math.max(0, grit - 1))}
              disabled={grit < 1}
            >
              -
            </button>
            <button className="button">{grit}</button>
            <button
              id="skill-plus-button"
              className="button is-primary"
              onClick={() => setGrit(Math.max(0, grit + 1))}
            >
              +
            </button>
          </div>
          <div className="column is-full">
            <div className="content">
              <ul>
                <li>
                  Gain Grit when a Main Character <strong>fails</strong> a test
                  (including attacks and saves)
                </li>
                <li>
                  Spend Grit <strong>before</strong> a roll to gain bonus dice
                </li>
                <li>
                  Spend Grit <strong>after</strong> a roll to reduce Difficulty
                  by 3, or change damage by +/- 3
                </li>
                <li>
                  No more points of Grit than number of Main Characters in play
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="box block">
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="columns is-vcentered">
              <div className="column">
                <GenericInput
                  label="Type"
                  help="What kind of new combatant do you want to add?"
                >
                  <select
                    className="select"
                    value={newCombatantType}
                    onChange={(event) =>
                      setNewCombatantType(
                        event.currentTarget.value as CombatantType
                      )
                    }
                  >
                    <option value={CombatantType.MC}>
                      Main Character (MC)
                    </option>
                    <option value={CombatantType.MINION}>Minion</option>
                    <option value={CombatantType.ELITE}>Elite</option>
                    <option value={CombatantType.BOSS}>Boss</option>
                  </select>
                </GenericInput>
              </div>
              <div className="column">
                <button
                  className="button is-primary"
                  onClick={() => createCombatant()}
                >
                  Create
                </button>
              </div>
              <div className="column">
                <button
                  className={
                    hasEveryoneActed ? 'button is-primary' : 'button is-danger'
                  }
                  onClick={onClickInitializeRound}
                >
                  New Round
                </button>
              </div>
            </div>
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Combatant</th>
                  <th>Type</th>
                  <th>AP</th>
                  <th>Acted</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {times(
                  (i) => (
                    <InitiativePartition
                      combatants={partitionedCombatants[i]}
                      isActive={i == firstPendingPartition}
                      partition={i}
                      updateCombatant={updateCombatant}
                      deleteCombatant={deleteCombatant}
                    />
                  ),
                  4
                )}
              </tbody>
            </table>
            <div className="content">
              <ul>
                <li>
                  Click on the <button className="delete"></button> button next
                  to a name to delete a combatant.
                </li>
                <li>Click on a combatant's name or notes to change them.</li>
                <li>
                  Click the checkbox in the AP column to act{' '}
                  <strong>fast</strong>, uncheck to act <strong>slow</strong>.
                </li>
                <li>
                  Click the checkbox in Acted once a combatant has acted. The
                  New Round button will be red until everyone has been marked.
                </li>
              </ul>
            </div>
          </div>
          <div className="column is-one-third">
            <div className="content">
              <ul>
                <li>
                  <strong>At the start of every round,</strong> ask MC players
                  if they are going <strong>fast</strong> or{' '}
                  <strong>slow</strong>
                </li>
                <li>
                  <strong>Before each combatant's turn,</strong> apply ongoing
                  statuses & conditions
                </li>
                <li>
                  At most one <strong>Reaction</strong> per turn
                </li>
                <li>
                  Stacking Disadvantage on every Attack-type action after the
                  first on your turn
                </li>
                <li>
                  <strong>At the end of each combatant's turn,</strong> attempt
                  one save roll vs. a Status effect
                </li>
                <li>
                  <strong>At the end of every round,</strong> resolve
                  auto-attacks in MC - Boss - Elite - Minion order
                </li>
              </ul>
              <h3 className="title">Major Actions (◆◆)</h3>
              <ul>
                <li>Flurry of Strikes (Attack)</li>
                <li>Grappling Maneuver (Attack)</li>
                <li>Power Up!! (Magickal, Recovery, Vulnerable)</li>
                <li>Sprint (Movement, Vulnerable)</li>
                <li>Use a Major Power (Magickal)</li>
              </ul>
              <h3 className="title">Minor Actions (◆)</h3>
              <ul>
                <li>Charging! (Magickal)</li>
                <li>Dash (Movement)</li>
                <li>Interact (Vulnerable)</li>
                <li>Strike (Attack)</li>
                <li>Take Cover (Movement)</li>
                <li>Use an Inventory Item (Inventory, Vulnerable)</li>
                <li>Use a Minor Power (Magaickal)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GmPage
