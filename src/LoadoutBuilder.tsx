import React, { useEffect, useState } from "react";

import GenericInput from "./GenericInput";

const outfitValues = {
  Light: {
    defenseBonus: 0,
    inventoryPoints: 8,
    restrictions: "Light outfits can be worn by Support & Striker callings",
    A: {
      defenseBonus: 2,
      armorHP: 15,
      soakBonus: 1
    },
    B: {
      defenseBonus: 1,
      armorHP: 10,
      soakBonus: 0
    },
    C: {
      defenseBonus: 0,
      armorHP: 5,
      soakBonus: -1
    },
  },
  Medium: {
    defenseBonus: 1,
    inventoryPoints: 5,
    restrictions: "Medium outfits can be worn by Striker & Tank callings",
    A: {
      defenseBonus: 3,
      armorHP: 15,
      soakBonus: 2
    },
    B: {
      defenseBonus: 2,
      armorHP: 10,
      soakBonus: 1
    },
    C: {
      defenseBonus: 1,
      armorHP: 5,
      soakBonus: 0
    },
  },
  Heavy: {
    defenseBonus: 2,
    inventoryPoints: 4,
    restrictions: "Heavy outfits can be worn by Tank callings",
    A: {
      defenseBonus: 2,
      armorHP: 20,
      soakBonus: 2
    },
    B: {
      defenseBonus: 1,
      armorHP: 15,
      soakBonus: 1
    },
    C: {
      defenseBonus: 0,
      armorHP: 7,
      soakBonus: 0
    },
  },
}

const mods = [
  {
    name: "Attuned",
    value: "Witches only. +2 on Aether Charge rolls."
  },
  {
    name: "Bodyguard",
    value: "+1 Physical & Toxic Soak."
  },
  {
    name: "Cargo",
    value: "+2 maximum Inventory Points (or +3 for Light Outfits)."
  },
  {
    name: "Deflective",
    value: "+1 bonus to Dodge Defense."
  },
  {
    name: "Flexible",
    value: "Gain Advantage on Move tests."
  },
  {
    name: "Fluxing",
    value: "◇: +/- 1 to a single Aether Current die's value, once per round on my turn."
  },
  {
    name: "Hexagrammatic",
    value: "+1 bonus to Ward Defense"
  },
  {
    name: "Reinforced",
    value: "+4 bonus Armor HP (or +5 for Heavy Outfits)."
  },
  {
    name: "Silent",
    value: "Gain Advantage on Sneak tests."
  },
  {
    name: "Spellthreaded",
    value: "+1 Astral & Umbral Soak."
  },
]

function plusOrMinus(value: number): string {
  return (value > 0) ? `+${value}` : `${value}`
}

function LoadoutBuilder() {
  const [outfitForm, setOutfitForm] = useState<string>("Light")
  const [defenseBonus, setDefenseBonus] = useState<string>("A")
  const [armorHP, setArmorHP] = useState<string>("B")
  const [soakBonus, setSoakBonus] = useState<string>("C")
  const [mod, setMod] = useState<number>(0)

  return (
    <>
      <div className="box block">
        <h1 className="title">Outfit Builder</h1>
        <div className="columns">
          <div className="column">
            <GenericInput label="Outfit Form" help={outfitValues[outfitForm].restrictions}>
              <select onChange={(event) => setOutfitForm(event.target.value)} value={outfitForm}>
                <option>Light</option>
                <option>Medium</option>
                <option>Heavy</option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput label="Defense Bonus" help={"How much of a priority this stat should be"}>
              <select onChange={(event) => setDefenseBonus(event.target.value)} value={defenseBonus}>
                <option value="A">A ({plusOrMinus(outfitValues[outfitForm].A.defenseBonus)})</option>
                <option value="B">B ({plusOrMinus(outfitValues[outfitForm].B.defenseBonus)})</option>
                <option value="C">C ({plusOrMinus(outfitValues[outfitForm].C.defenseBonus)})</option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput label="Armor HP" help={"How much of a priority this stat should be"}>
              <select onChange={(event) => setArmorHP(event.target.value)} value={armorHP}>
                <option value="A">A ({(outfitValues[outfitForm].A.armorHP)})</option>
                <option value="B">B ({(outfitValues[outfitForm].B.armorHP)})</option>
                <option value="C">C ({(outfitValues[outfitForm].C.armorHP)})</option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput label="Soak Bonus" help={"How much of a priority this stat should be"}>
              <select onChange={(event) => setSoakBonus(event.target.value)} value={soakBonus}>
                <option value="A">A ({plusOrMinus(outfitValues[outfitForm].A.soakBonus)})</option>
                <option value="B">B ({plusOrMinus(outfitValues[outfitForm].B.soakBonus)})</option>
                <option value="C">C ({plusOrMinus(outfitValues[outfitForm].C.soakBonus)})</option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <GenericInput label="Mod" help={mods[mod].value}>
              <select onChange={(event) => setMod(parseInt(event.target.value))} value={mod}>
                {mods.map((mod, index) => (
                  <option key={index} value={index}>{mod.name}</option>
                ))}
              </select>
            </GenericInput>
          </div>
        </div>
      </div>
      <div className="box block">
        {(defenseBonus == armorHP || armorHP == soakBonus || defenseBonus == soakBonus) ? <>
          <p className="has-background-danger">
            <span className="is-size-3">Please make sure priorities are correctly set</span>  
          </p>
        </> : <></>}
        <p className="has-background-primary">
          <span className="is-size-3">My New Outfit</span>
        </p>
        <p className="has-background-grey-lighter">My outfit's description</p>
        <p>
          {outfitForm} Outfit
        </p>
        <p>
          <strong>Defense Bonus:</strong> {plusOrMinus(outfitValues[outfitForm].defenseBonus + outfitValues[outfitForm][defenseBonus].defenseBonus)},&nbsp;
          <strong>Armor HP:</strong> {outfitValues[outfitForm][armorHP].armorHP},&nbsp;
          <strong>Soak Bonus:</strong> {plusOrMinus(outfitValues[outfitForm][soakBonus].soakBonus)},&nbsp;
          <strong>Inventory Points:</strong> {outfitValues[outfitForm].inventoryPoints}
        </p>
        <p className="has-background-grey-lighter">
          <div>
            {outfitForm === "Heavy" ? <>
              <strong>Heavy:</strong>&nbsp;
              Disadvantage on Move & Sneak tests.
            </> : <></>}
          </div>
          <div>
            <strong>{mods[mod].name}: </strong>{mods[mod].value}
          </div>
        </p>
      </div>
    </>
  );
}

export default LoadoutBuilder;
