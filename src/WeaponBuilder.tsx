import React, { useState } from "react";

import GenericInput from "./GenericInput";
import { plusOrMinus, rollDie } from './utilities';

const weaponValues = {
  size: [
    {
      label: "Light",
      damageBonus: 3,
      weaponDice: 3
    },
    {
      label: "Heavy",
      damageBonus: 6,
      weaponDice: 2
    }
  ],
  range: [
    {
      label: "Melee",
      damageBonus: 1,
      range: 0
    },
    {
      label: "Ranged",
      damageBonus: 0,
      range: 3
    }
  ],
  weaponType: [
    {
      label: "Accurate",
      help: "Gain Advantage on the attack roll with Basic Attacks like Strike & Flurry of Strikes actions"
    },
    {
      label: "Deadly",
      help: "+1 damage bonus (or +2 for Heavy Weapons)"
    },
    {
      label: "Focus",
      help: "Gain +1 bonus to Ward Defense"
    },
    {
      label: "Magickal",
      help: "Basic Attacks with this weapon are rolled against the target's Ward Defense instead of their Dodge Defense"
    },
    {
      label: "Reach",
      help: "Weapon gains +1 Range"
    },
    {
      label: "Shield",
      help: "Gain +1 bonus to Dodge Defense"
    }
  ]
}

const modValues = [
  {
    name: "Astral",
    value: "Basic Attacks inflict Astral damage instead of Physical"
  },
  {
    name: "Balanced",
    value: "Add +2 to the attack result of one rolled Weapon Die"
  },
  {
    name: "Bloodthirsty",
    value: "Melee only. Increase Surge range by +1. By default this makes Surges generate on rolls of 19-20"
  },
  {
    name: "Crushing",
    value: "Spend 1 Surge: 1 target of the attack rolls their Soak with Disadvantage"
  },
  {
    name: "Execution",
    value: "Increase Core Damage by +2 vs Injured targets"
  },
  {
    name: "Parrying",
    value: "Increase Soak against Physical damage by +1"
  },
  {
    name: "Seeking",
    value: "Ranged only. Weapon ignores cover, add +1 to the result of all rolled Weapon Dice"
  },
  {
    name: "Shredding",
    value: "Spend 1 Surge: Inflict WOUNDED (5) on one target"
  },
  {
    name: "Umbral",
    value: "Basic Attacks inflict Umbral damage instead of Physical"
  },
  {
    name: "Venomous",
    value: "Spend 1 Surge: Inflict SICK (5) on one target"
  },
]

function WeaponBuilder() {
  const [size, setSize] = useState<number>(0)
  const [range, setRange] = useState<number>(0)
  const [weaponType, setWeaponType] = useState<number>(0)
  const [mod, setMod] = useState<number>(0)
  const [weaponName, setWeaponName] = useState<string>("My New Weapon")
  const [weaponDesc, setWeaponDesc] = useState<string>("My weapon's description")

  function renameWeapon() {
    const value = prompt("Enter a new name for the outfit", weaponName);
    if (value) {
      setWeaponName(value)
    }
  }

  function describeWeapon() {
    const value = prompt("Enter a description for the outfit", weaponDesc);
    if (value) {
      setWeaponDesc(value)
    }
  }

  function randomizeSettings() {
    setSize(rollDie(1, weaponValues.size.length) - 1)
    setRange(rollDie(1, weaponValues.range.length) - 1)
    setWeaponType(rollDie(1, weaponValues.weaponType.length) - 1)
    setMod(rollDie(1, modValues.length) - 1)
  }

  let sizeLabel = weaponValues.size[size].label
  let finalWeaponDice = weaponValues.size[size].weaponDice
  let finalDamageBonus = weaponValues.size[size].damageBonus + weaponValues.range[range].damageBonus
  let finalRange = weaponValues.range[range].range

  switch (weaponValues.weaponType[weaponType].label) {
    case "Deadly":
      finalDamageBonus = finalDamageBonus + (sizeLabel == "Heavy" ? 2 : 1)
      break;
    case "Reach":
      finalRange = finalRange + 1
  }

  return (
    <>
      <div className="box block">
        <h1 className="title">Weapon Builder</h1>
        <div className="columns">
          <div className="column">
            <GenericInput label="Size" help={"The size of the weapon"}>
              <select onChange={(event) => setSize(parseInt(event.target.value))} value={size}>
                {weaponValues.size.map((value, index) => (
                  <option key={value.label} value={index}>{value.label} ({plusOrMinus(value.damageBonus)} damage bonus, {value.weaponDice} Weapon Dice)</option>
                ))}
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput label="Range" help={"The range of the weapon"}>
              <select onChange={(event) => setRange(parseInt(event.target.value))} value={range}>
                {weaponValues.range.map((value, index) => (
                  <option key={value.label} value={index}>{value.label} ({plusOrMinus(value.damageBonus)} damage bonus, Range {value.range}</option>
                ))}
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput label="Weapon Type" help={weaponValues.weaponType[weaponType].help}>
              <select onChange={(event) => setWeaponType(parseInt(event.target.value))} value={weaponType}>
                {weaponValues.weaponType.map((value, index) => (
                  <option key={value.label} value={index}>{value.label}</option>
                ))}
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput label="Mod" help={modValues[mod].value}>
              <select onChange={(event) => setMod(parseInt(event.target.value))} value={mod}>
                {modValues.map((mod, index) => (
                  <option key={index} value={index}>{mod.name}</option>
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
        <p><em>Click on the name or description to edit them.</em></p>
        <p className="has-background-primary clickable" onClick={() => renameWeapon()}>
          <span className="is-size-3">{weaponName}</span>
        </p>
        <p className="has-background-grey-lighter clickable" onClick={() => describeWeapon()}>{weaponDesc}</p>
        <p>
          <em>
            {weaponValues.size[size].label} Weapon ✧&nbsp;
            {weaponValues.range[range].label},&nbsp;
            {weaponValues.weaponType[weaponType].label},&nbsp;
            {modValues[mod].name}
          </em>
        </p>
        <p>
          <strong>Weapon Dice:</strong> {plusOrMinus(finalWeaponDice)},&nbsp;
          <strong>Damage Bonus:</strong> {plusOrMinus(finalDamageBonus)},&nbsp;
          <strong>Range:</strong> {finalRange}
        </p>
        <div className="has-background-grey-lighter">
          <div>
            <strong>{weaponValues.weaponType[weaponType].label}: </strong>{weaponValues.weaponType[weaponType].help}
          </div>
          <div>
            <strong>{modValues[mod].name}: </strong>{modValues[mod].value}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeaponBuilder;
