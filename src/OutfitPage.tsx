import { path } from 'ramda'
import React, { useContext } from 'react'

import { LoadoutContext } from './GameStateProvider'
import GenericInput from './GenericInput'
import ImportExportModal from './ImportExportModal'
import { plusOrMinus, rollDie } from './utilities'

const outfitValues = {
  Light: {
    defenseBonus: 0,
    inventoryPoints: 8,
    restrictions: 'Light outfits can be worn by Support & Striker callings',
    A: {
      defenseBonus: 2,
      armorHP: 15,
      soakBonus: 1,
    },
    B: {
      defenseBonus: 1,
      armorHP: 10,
      soakBonus: 0,
    },
    C: {
      defenseBonus: 0,
      armorHP: 5,
      soakBonus: -1,
    },
  },
  Medium: {
    defenseBonus: 1,
    inventoryPoints: 5,
    restrictions: 'Medium outfits can be worn by Striker & Tank callings',
    A: {
      defenseBonus: 3,
      armorHP: 15,
      soakBonus: 2,
    },
    B: {
      defenseBonus: 2,
      armorHP: 10,
      soakBonus: 1,
    },
    C: {
      defenseBonus: 1,
      armorHP: 5,
      soakBonus: 0,
    },
  },
  Heavy: {
    defenseBonus: 2,
    inventoryPoints: 4,
    restrictions: 'Heavy outfits can be worn by Tank callings',
    A: {
      defenseBonus: 2,
      armorHP: 20,
      soakBonus: 2,
    },
    B: {
      defenseBonus: 1,
      armorHP: 15,
      soakBonus: 1,
    },
    C: {
      defenseBonus: 0,
      armorHP: 7,
      soakBonus: 0,
    },
  },
}

const outfitModValues = [
  {
    name: 'Attuned',
    value: 'Witches only. +2 on Aether Charge rolls.',
  },
  {
    name: 'Bodyguard',
    value: '+1 Physical & Toxic Soak.',
  },
  {
    name: 'Cargo',
    value: '+2 maximum Inventory Points (or +3 for Light Outfits).',
  },
  {
    name: 'Deflective',
    value: '+1 bonus to Dodge Defense.',
  },
  {
    name: 'Flexible',
    value: 'Gain Advantage on Move tests.',
  },
  {
    name: 'Fluxing',
    value:
      "◇: +/- 1 to a single Aether Current die's value, once per round on my turn.",
  },
  {
    name: 'Hexagrammatic',
    value: '+1 bonus to Ward Defense',
  },
  {
    name: 'Reinforced',
    value: '+4 bonus Armor HP (or +5 for Heavy Outfits).',
  },
  {
    name: 'Silent',
    value: 'Gain Advantage on Sneak tests.',
  },
  {
    name: 'Spellthreaded',
    value: '+1 Astral & Umbral Soak.',
  },
]

function OutfitPage() {
  const {
    outfitForm,
    setOutfitForm,
    defenseBonus,
    setDefenseBonus,
    armorHP,
    setArmorHP,
    soakBonus,
    setSoakBonus,
    outfitMod,
    setOutfitMod,
    outfitName,
    setOutfitName,
    outfitDesc,
    setOutfitDesc,
  } = useContext(LoadoutContext)

  function renameOutfit() {
    const value = prompt('Enter a new name for the outfit', outfitName)
    if (value) {
      setOutfitName(value)
    }
  }

  function describeOutfit() {
    const value = prompt('Enter a description for the outfit', outfitDesc)
    if (value) {
      setOutfitDesc(value)
    }
  }

  function prioritize(
    getter: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    firstGetter: string,
    firstSetter: React.Dispatch<React.SetStateAction<string>>,
    secondGetter: string,
    secondSetter: React.Dispatch<React.SetStateAction<string>>
  ) {
    if (value == firstGetter) {
      firstSetter(getter)
    } else if (value == secondGetter) {
      secondSetter(getter)
    }
    setter(value)
  }

  function randomizeSettings() {
    const priorities = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']
    const newPriorities = priorities[rollDie(1, 6) - 1]
    setDefenseBonus(newPriorities[0])
    setArmorHP(newPriorities[1])
    setSoakBonus(newPriorities[2])
    setOutfitMod(rollDie(1, outfitModValues.length) - 1)
  }

  let finalDefenseBonus: number =
    (path([outfitForm, 'defenseBonus'], outfitValues) as number) +
    (path([outfitForm, defenseBonus, 'defenseBonus'], outfitValues) as number)
  let defenseBonusAnnotation = ''
  let finalArmorHP = path(
    [outfitForm, armorHP, 'armorHP'],
    outfitValues
  ) as number
  let finalSoakBonus = path(
    [outfitForm, soakBonus, 'soakBonus'],
    outfitValues
  ) as number
  let soakAnnotation = ''
  let finalInventoryPoints = path(
    [outfitForm, 'inventoryPoints'],
    outfitValues
  ) as number

  switch (outfitModValues[outfitMod].name) {
    case 'Bodyguard':
      soakAnnotation = ` (${plusOrMinus(
        finalSoakBonus + 1
      )} vs. Physical and Toxic)`
      break
    case 'Cargo':
      finalInventoryPoints =
        finalInventoryPoints + (outfitForm == 'Light' ? 3 : 2)
      break
    case 'Deflective':
      defenseBonusAnnotation = ` (${plusOrMinus(
        finalDefenseBonus + 1
      )} to Dodge)`
      break
    case 'Hexagrammatic':
      defenseBonusAnnotation = ` (${plusOrMinus(
        finalDefenseBonus + 1
      )} to Ward)`
      break
    case 'Reinforced':
      finalArmorHP = finalArmorHP + (outfitForm == 'Heavy' ? 5 : 4)
      break
    case 'Spellthreaded':
      soakAnnotation = ` (${plusOrMinus(
        finalSoakBonus + 1
      )} vs. Astral and Umbral)`
      break
  }

  const copyableOutfitText = `${outfitName}
${outfitDesc}
${outfitForm} Outfit ◯ ${outfitModValues[outfitMod].name}
Defense Bonus: ${plusOrMinus(
    finalDefenseBonus
  )} ${defenseBonusAnnotation}, Armor HP: ${finalArmorHP}, Soak Bonus: ${plusOrMinus(
    finalSoakBonus
  )} ${soakAnnotation}, Inventory Points: ${finalInventoryPoints}
${
  outfitForm === 'Heavy' ? `Heavy: Disadvantage on Move & Sneak tests.\n` : ''
}${outfitModValues[outfitMod].name}: ${outfitModValues[outfitMod].value}
`

  return (
    <>
      <div className="box block">
        <h1 className="title">Outfit Builder</h1>
        <div className="columns">
          <div className="column">
            <GenericInput
              label="Outfit Form"
              help={path([outfitForm, 'restrictions'], outfitValues) || ''}
            >
              <select
                onChange={(event) => setOutfitForm(event.target.value)}
                value={outfitForm}
              >
                <option>Light</option>
                <option>Medium</option>
                <option>Heavy</option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput
              label="Defense Bonus"
              help={`Increase your Calling's base Dodge & Ward by this amount`}
            >
              <select
                onChange={(event) =>
                  prioritize(
                    defenseBonus,
                    setDefenseBonus,
                    event.target.value,
                    armorHP,
                    setArmorHP,
                    soakBonus,
                    setSoakBonus
                  )
                }
                value={defenseBonus}
              >
                <option value="A">
                  A (
                  {plusOrMinus(
                    path(
                      [outfitForm, 'A', 'defenseBonus'],
                      outfitValues
                    ) as number
                  )}
                  )
                </option>
                <option value="B">
                  B (
                  {plusOrMinus(
                    path(
                      [outfitForm, 'B', 'defenseBonus'],
                      outfitValues
                    ) as number
                  )}
                  )
                </option>
                <option value="C">
                  C (
                  {plusOrMinus(
                    path(
                      [outfitForm, 'C', 'defenseBonus'],
                      outfitValues
                    ) as number
                  )}
                  )
                </option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput
              label="Armor HP"
              help={
                'A number of points that function like normal HP, are lost before normal HP, and are restored to full at the end of each combat encounter'
              }
            >
              <select
                onChange={(event) =>
                  prioritize(
                    armorHP,
                    setArmorHP,
                    event.target.value,
                    defenseBonus,
                    setDefenseBonus,
                    soakBonus,
                    setSoakBonus
                  )
                }
                value={armorHP}
              >
                <option value="A">
                  A (
                  {path([outfitForm, 'A', 'armorHP'], outfitValues) as number})
                </option>
                <option value="B">
                  B (
                  {path([outfitForm, 'B', 'armorHP'], outfitValues) as number})
                </option>
                <option value="C">
                  C (
                  {path([outfitForm, 'C', 'armorHP'], outfitValues) as number})
                </option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput
              label="Soak Bonus"
              help={'Increase the result of all Soak rolls by this amount'}
            >
              <select
                onChange={(event) =>
                  prioritize(
                    soakBonus,
                    setSoakBonus,
                    event.target.value,
                    defenseBonus,
                    setDefenseBonus,
                    armorHP,
                    setArmorHP
                  )
                }
                value={soakBonus}
              >
                <option value="A">
                  A (
                  {plusOrMinus(
                    path([outfitForm, 'A', 'soakBonus'], outfitValues) as number
                  )}
                  )
                </option>
                <option value="B">
                  B (
                  {plusOrMinus(
                    path([outfitForm, 'B', 'soakBonus'], outfitValues) as number
                  )}
                  )
                </option>
                <option value="C">
                  C (
                  {plusOrMinus(
                    path([outfitForm, 'C', 'soakBonus'], outfitValues) as number
                  )}
                  )
                </option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput label="Mod" help={outfitModValues[outfitMod].value}>
              <select
                onChange={(event) => setOutfitMod(parseInt(event.target.value))}
                value={outfitMod}
              >
                {outfitModValues.map((mod, index) => (
                  <option key={index} value={index}>
                    {mod.name}
                  </option>
                ))}
              </select>
            </GenericInput>
          </div>
          <div className="column has-text-centered">
            <button
              className="button is-primary mx-2"
              onClick={() => randomizeSettings()}
            >
              Random
            </button>
          </div>
        </div>
      </div>
      <div className="box block">
        <p>
          <em>Click on the name or description to edit them.</em>
        </p>
        <p
          className="has-background-primary clickable"
          onClick={() => renameOutfit()}
        >
          <span className="is-size-3">{outfitName}</span>
        </p>
        <p
          className="has-background-grey-lighter clickable"
          onClick={() => describeOutfit()}
        >
          {outfitDesc}
        </p>
        <p>
          <em>{outfitForm} Outfit</em> ◯{' '}
          <em>{outfitModValues[outfitMod].name}</em>
        </p>
        <p>
          <strong>Defense Bonus:</strong> {plusOrMinus(finalDefenseBonus)}
          {defenseBonusAnnotation},&nbsp;
          <strong>Armor HP:</strong> {finalArmorHP},&nbsp;
          <strong>Soak Bonus:</strong> {plusOrMinus(finalSoakBonus)}
          {soakAnnotation},&nbsp;
          <strong>Inventory Points:</strong> {finalInventoryPoints}
        </p>
        <div className="has-background-grey-lighter">
          <div>
            {outfitForm === 'Heavy' ? (
              <>
                <strong>Heavy:</strong>&nbsp; Disadvantage on Move & Sneak
                tests.
              </>
            ) : (
              <></>
            )}
          </div>
          <div>
            <strong>{outfitModValues[outfitMod].name}: </strong>
            {outfitModValues[outfitMod].value}
          </div>
        </div>
        <div className="mt-2">
          <ImportExportModal exportedText={copyableOutfitText} />
        </div>
      </div>
    </>
  )
}

export default OutfitPage
