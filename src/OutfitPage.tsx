import React, { useState } from 'react'

import GenericInput from './GenericInput'
import ImportExportModal from './ImportExportModal'
import { rollDie } from './utilities'

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

const modValues = [
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

function plusOrMinus(value: number): string {
  return value > 0 ? `+${value}` : `${value}`
}

function OutfitPage() {
  const [outfitForm, setOutfitForm] = useState<string>('Light')
  const [defenseBonus, setDefenseBonus] = useState<string>('A')
  const [armorHP, setArmorHP] = useState<string>('B')
  const [soakBonus, setSoakBonus] = useState<string>('C')
  const [mod, setMod] = useState<number>(0)
  const [outfitName, setOutfitName] = useState<string>('My New Outfit')
  const [outfitDesc, setOutfitDesc] = useState<string>(
    "My outfit's description"
  )

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
    getter,
    setter,
    value,
    firstGetter,
    firstSetter,
    secondGetter,
    secondSetter
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
    setMod(rollDie(1, modValues.length) - 1)
  }

  let finalDefenseBonus =
    outfitValues[outfitForm].defenseBonus +
    outfitValues[outfitForm][defenseBonus].defenseBonus
  let defenseBonusAnnotation = ''
  let finalArmorHP = outfitValues[outfitForm][armorHP].armorHP
  let finalSoakBonus = outfitValues[outfitForm][soakBonus].soakBonus
  let soakAnnotation = ''
  let finalInventoryPoints = outfitValues[outfitForm].inventoryPoints

  switch (modValues[mod].name) {
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
${outfitForm} Outfit ◯ ${modValues[mod].name}
Defense Bonus: ${plusOrMinus(
    finalDefenseBonus
  )} ${defenseBonusAnnotation}, Armor HP: ${finalArmorHP}, Soak Bonus: ${plusOrMinus(
    finalSoakBonus
  )} ${soakAnnotation}, Inventory Points: ${finalInventoryPoints}
${
  outfitForm === 'Heavy' ? `Heavy: Disadvantage on Move & Sneak tests.\n` : ''
}${modValues[mod].name}: ${modValues[mod].value}
`

  return (
    <>
      <div className="box block">
        <h1 className="title">Outfit Builder</h1>
        <div className="columns">
          <div className="column">
            <GenericInput
              label="Outfit Form"
              help={outfitValues[outfitForm].restrictions}
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
              help={'Increase your Calling’s base Dodge & Ward by this amount'}
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
                  A ({plusOrMinus(outfitValues[outfitForm].A.defenseBonus)})
                </option>
                <option value="B">
                  B ({plusOrMinus(outfitValues[outfitForm].B.defenseBonus)})
                </option>
                <option value="C">
                  C ({plusOrMinus(outfitValues[outfitForm].C.defenseBonus)})
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
                  A ({outfitValues[outfitForm].A.armorHP})
                </option>
                <option value="B">
                  B ({outfitValues[outfitForm].B.armorHP})
                </option>
                <option value="C">
                  C ({outfitValues[outfitForm].C.armorHP})
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
                  A ({plusOrMinus(outfitValues[outfitForm].A.soakBonus)})
                </option>
                <option value="B">
                  B ({plusOrMinus(outfitValues[outfitForm].B.soakBonus)})
                </option>
                <option value="C">
                  C ({plusOrMinus(outfitValues[outfitForm].C.soakBonus)})
                </option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput label="Mod" help={modValues[mod].value}>
              <select
                onChange={(event) => setMod(parseInt(event.target.value))}
                value={mod}
              >
                {modValues.map((mod, index) => (
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
          <em>{outfitForm} Outfit</em> ◯ <em>{modValues[mod].name}</em>
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
            <strong>{modValues[mod].name}: </strong>
            {modValues[mod].value}
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
