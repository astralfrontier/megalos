import React, { useContext, useEffect, useState } from 'react'

import { DiceContext } from '../GameStateProvider'
import DiceInput from './DiceInput'

interface DiceSettingsShelfProps {
  rerolls: number
  setRerolls: React.Dispatch<React.SetStateAction<number>>
}

function rollDie(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min
}

function rollDice(diceCount: number): number[] {
  const results: number[] = []
  for (let i = 0; i < diceCount; i++) {
    results.push(rollDie(1, 20))
  }
  return results
}

function DiceSettingsShelf(props: DiceSettingsShelfProps) {
  const {
    diceCount,
    setDiceCount,
    setRolls,
    difficulty,
    setDifficulty,
    resistance,
    setResistance,
    presets,
    setPresets,
  } = useContext(DiceContext)
  const { rerolls, setRerolls } = props

  function rollAndShow() {
    setRerolls(0)
    setRolls(rollDice(diceCount > 0 ? diceCount : 2))
  }

  function resetRolls() {
    setDifficulty(15)
    setResistance(1)
    setRerolls(0)
  }

  function savePreset() {
    const presetName = prompt('Enter a name for this preset', 'New Preset')
    if (presetName != null) {
      const newPresets = [...presets]
      newPresets.push({
        label: presetName,
        diceCount: diceCount,
        difficulty: difficulty,
        resistance: resistance,
      })
      setPresets(newPresets)
    }
  }

  return (
    <>
      <div className="columns">
        <div className="column has-text-centered">
          <button
            id="dice-roll"
            className="button is-primary mx-2"
            onClick={() => rollAndShow()}
          >
            Roll
          </button>
          <button
            id="dice-reset"
            className="button is-warning mx-2"
            onClick={() => resetRolls()}
          >
            Reset
          </button>
          <br />
          Rerolls Used: {rerolls}
          <br />
          <button
            id="dice-save"
            className="button is-info"
            onClick={() => savePreset()}
          >
            Save
          </button>
        </div>
        <div className="column">
          <DiceInput
            label={'Dice'}
            min={0}
            max={8}
            getter={diceCount}
            setter={setDiceCount}
            help={
              'Your skill rating, or the dice rating of your weapon, plus Advantage, minus Disadvantage'
            }
          />
        </div>
        <div className="column">
          <DiceInput
            label={'Difficulty'}
            min={1}
            max={21}
            getter={difficulty}
            setter={setDifficulty}
            help={
              "The default value is 15 for checks, or the opponent's Dodge or Ward for attacks"
            }
          />
        </div>
        <div className="column">
          <DiceInput
            label={'Resistance'}
            min={1}
            max={8}
            getter={resistance}
            setter={setResistance}
            help={
              'The default value is 1, +1 each for magickal effects, Stressed Out, unfavorable conditions, and GM ruling'
            }
          />
        </div>
      </div>
    </>
  )
}

export default DiceSettingsShelf
