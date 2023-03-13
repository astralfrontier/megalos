import React, { useContext } from 'react'

import { DiceContext } from '../GameStateProvider'

interface PresetShelfProps {}

function PresetShelf(props: PresetShelfProps) {
  const {
    diceCount,
    setDiceCount,
    difficulty,
    setDifficulty,
    resistance,
    setResistance,
    presets,
    setPresets,
  } = useContext(DiceContext)

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

  function usePreset(index: number) {
    const preset = presets[index]
    setDiceCount(preset.diceCount)
    setDifficulty(preset.difficulty)
    setResistance(preset.resistance)
  }

  function deletePreset(index: number) {
    const newPresets = [...presets]
    newPresets.splice(index, 1)
    setPresets(newPresets)
  }

  return (
    <>
      {presets.map((preset, index) => (
        <div className="columns is-multiline is-vcentered" key={index}>
          <div className="column is-narrow">
            <button
              className="button is-primary"
              onClick={() => usePreset(index)}
            >
              Use
            </button>
          </div>
          <div className="column is-narrow">
            <button
              className="button is-warning"
              onClick={() => deletePreset(index)}
            >
              Delete
            </button>
          </div>
          <div className="column">
            {preset.label} ({preset.difficulty}/{preset.resistance},{' '}
            {preset.diceCount} dice)
          </div>
        </div>
      ))}
      {presets.length ? (
        <></>
      ) : (
        <p className="subtitle">No presets (click "Save" to create one)</p>
      )}
    </>
  )
}

export default PresetShelf
