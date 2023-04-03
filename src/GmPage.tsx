import { always, append, assoc, assocPath, dropLast, filter, flatten, join, map, remove, repeat, uniq } from 'ramda'
import React, { useEffect, useState } from 'react'

import GenericInput from './GenericInput'

enum CombatantType {
  MC = 'MC',
  ELITE = 'Elite',
  BOSS = 'Boss',
  MINION = 'Minion',
}

interface Combatant {
  name: string
  type: CombatantType
  // Only used for MCs
  fast: boolean
  ap: number
  acted: boolean
  conditions: string[]
}

interface InitiativePartitionProps {
  partition: Combatant[]
  idx: number
  updateCombatant: (
    idx: number,
    cidx: number,
    field: string,
    value: any
  ) => void
  deleteCombatant: (idx: number, cidx: number) => void
}

// Element 0 is fast MCs
// Element 1 is enemies
// Element 2 is slow MCs
// Element 3 is boss/elite enemies
const initiativeSortingRules = [
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

const startingAp = [
  always(2),
  always(2),
  always(3),
  (combatant: Combatant) => (combatant.type == CombatantType.BOSS ? 2 : 1),
]

const partitionLabels = [
  'Fast Actions',
  'Enemy Actions',
  'Slow Actions',
  'Elite/Boss Actions',
]

// Given an unsorted list of combatants, return the
function initializeRound(combatants: Combatant[]): Combatant[][] {
  const actedCombatants = combatants.map(assoc('acted', false))
  const bucketedCombatants = map(
    (filterRule) => filterRule(actedCombatants),
    initiativeSortingRules
  )
  return bucketedCombatants.map((partition, idx) =>
    map(
      (combatant) => assoc('ap', startingAp[idx](combatant), combatant),
      partition
    )
  )
}

function InitiativePartition(props: InitiativePartitionProps) {
  const { partition, idx, updateCombatant, deleteCombatant } = props

  return (
    <>
      <tr>
        <td colSpan={4}>
          <strong>{partitionLabels[idx]}</strong>
        </td>
      </tr>
      {partition.map((combatant, cidx) => (
        <tr>
          <td>
            <button
              className="delete"
              onClick={() => deleteCombatant(idx, cidx)}
            ></button>
            <span
              onClick={() => {
                const newName = prompt('New combatant name', combatant.name)
                if (newName) {
                  updateCombatant(idx, cidx, 'name', newName)
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
                updateCombatant(idx, cidx, 'fast', event.currentTarget.checked)
              }
              disabled={combatant.type != CombatantType.MC}
            />
            {join('', repeat('◆', combatant.ap))}◇
          </td>
          <td>
            <input
              type={'checkbox'}
              checked={combatant.acted}
              onChange={(event) =>
                updateCombatant(idx, cidx, 'acted', event.currentTarget.checked)
              }
            />
          </td>
        </tr>
      ))}
    </>
  )
}

function GmPage() {
  const [grit, setGrit] = useState<number>(0)
  const [initiativeOrder, setInitiativeOrder] = useState<Combatant[][]>([
    [],
    [],
    [],
    [],
  ])
  const [newCombatantType, setNewCombatantType] = useState<CombatantType>(
    CombatantType.MC
  )

  function onClickInitializeRound(_event) {
    // Skip the bonus enemy round and see who our combatants are
    const combatants = flatten(dropLast(1, initiativeOrder))
    setInitiativeOrder(initializeRound(combatants))
  }

  function updateCombatant(
    idx: number,
    cidx: number,
    field: string,
    value: any
  ) {
    const newState = assocPath([idx, cidx, field], value, initiativeOrder)
    setInitiativeOrder(newState)
  }

  function deleteCombatant(idx: number, cidx: number) {
    const newPartition = remove(cidx, 1, initiativeOrder[idx])
    const newState = assocPath([idx], newPartition, initiativeOrder)
    setInitiativeOrder(newState)
  }

  function createCombatant() {
    const partition = newCombatantType == CombatantType.MC ? 0 : 1
    const newCombatant: Combatant = {
      name: 'New Combatant',
      type: newCombatantType,
      fast: false,
      acted: true,
      ap: 0,
      conditions: [],
    }
    const newPartition = append(newCombatant, initiativeOrder[partition])
    setInitiativeOrder(assocPath([partition], newPartition, initiativeOrder))
  }

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
          <div className="column">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Combatant</th>
                  <th>Type</th>
                  <th>AP</th>
                  <th>Acted</th>
                </tr>
              </thead>
              <tbody>
                {initiativeOrder.map((partition, idx) => (
                  <InitiativePartition
                    partition={partition}
                    idx={idx}
                    updateCombatant={updateCombatant}
                    deleteCombatant={deleteCombatant}
                  />
                ))}
              </tbody>
            </table>
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
                  className="button is-primary"
                  onClick={onClickInitializeRound}
                >
                  New Round
                </button>
              </div>
            </div>
            <div className='content'>
              <p>Click on the <button className='delete'></button> button next to a name to delete a combatant.</p>
              <p>Click on a combatant's name to change it.</p>
              <p>Click the checkbox in the AP column to act <strong>fast</strong>, uncheck to act <strong>slow</strong></p>
              <p>Click the checkbox in Acted once a combatant has acted</p>
            </div>
          </div>
          <div className="column">
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
                  <strong>At the end of each combatant's turn,</strong> attempt
                  one save roll vs. a Status effect
                </li>
                <li>
                  <strong>At the end of every round,</strong> resolve
                  auto-attacks in MC - Boss - Elite - Minion order
                </li>
              </ul>
              <h3 className="title">Major Actions</h3>
              <ul>
                <li>Flurry of Strikes (Attack)</li>
                <li>Grappling Maneuver (Attack)</li>
                <li>Power Up!! (Magickal, Recovery, Vulnerable)</li>
                <li>Sprint (Movement, Vulnerable)</li>
                <li>Use a Major Power (Magickal)</li>
              </ul>
              <h3 className="title">Minor Actions</h3>
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
