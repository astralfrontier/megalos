import React, { createContext, useState } from 'react'

import { MegalosCharacter, newCharacter } from './characters/data'

export interface Preset {
  label: string
  diceCount: number
  difficulty: number
  resistance: number
}

export enum CombatantType {
  MC = 'MC',
  ELITE = 'Elite',
  BOSS = 'Boss',
  MINION = 'Minion',
}

export interface Combatant {
  order?: number
  name: string
  type: CombatantType
  // Only used for MCs
  fast: boolean
  acted: boolean
  actedBonus: boolean
  notes: string
}

export interface DiceState {
  diceCount: number
  setDiceCount: React.Dispatch<React.SetStateAction<number>>
  rolls: number[]
  setRolls: React.Dispatch<React.SetStateAction<number[]>>
  difficulty: number
  setDifficulty: React.Dispatch<React.SetStateAction<number>>
  resistance: number
  setResistance: React.Dispatch<React.SetStateAction<number>>
  presets: Preset[]
  setPresets: React.Dispatch<React.SetStateAction<Preset[]>>
}

interface GameStateProviderProps {
  children?: React.ReactNode
}

export const DiceContext = createContext<DiceState>({
  diceCount: 0,
  setDiceCount: () => {},
  rolls: [],
  setRolls: () => {},
  difficulty: 0,
  setDifficulty: () => {},
  resistance: 0,
  setResistance: () => {},
  presets: [],
  setPresets: () => {},
})

interface CharacterState {
  character: MegalosCharacter
  setCharacter: React.Dispatch<React.SetStateAction<MegalosCharacter>>
}

export const CharacterContext = createContext<CharacterState>({
  character: newCharacter(),
  setCharacter: () => {},
})

interface LoadoutState {
  size: number
  setSize: React.Dispatch<React.SetStateAction<number>>
  range: number
  setRange: React.Dispatch<React.SetStateAction<number>>
  weaponType: number
  setWeaponType: React.Dispatch<React.SetStateAction<number>>
  weaponMod: number
  setWeaponMod: React.Dispatch<React.SetStateAction<number>>
  weaponName: string
  setWeaponName: React.Dispatch<React.SetStateAction<string>>
  weaponDesc: string
  setWeaponDesc: React.Dispatch<React.SetStateAction<string>>
  outfitForm: string
  setOutfitForm: React.Dispatch<React.SetStateAction<string>>
  defenseBonus: string
  setDefenseBonus: React.Dispatch<React.SetStateAction<string>>
  armorHP: string
  setArmorHP: React.Dispatch<React.SetStateAction<string>>
  soakBonus: string
  setSoakBonus: React.Dispatch<React.SetStateAction<string>>
  outfitMod: number
  setOutfitMod: React.Dispatch<React.SetStateAction<number>>
  outfitName: string
  setOutfitName: React.Dispatch<React.SetStateAction<string>>
  outfitDesc: string
  setOutfitDesc: React.Dispatch<React.SetStateAction<string>>
}

export const LoadoutContext = createContext<LoadoutState>({
  size: 0,
  setSize: () => {},
  range: 0,
  setRange: () => {},
  weaponType: 0,
  setWeaponType: () => {},
  weaponMod: 0,
  setWeaponMod: () => {},
  weaponName: '',
  setWeaponName: () => {},
  weaponDesc: '',
  setWeaponDesc: () => {},
  outfitForm: '',
  setOutfitForm: () => {},
  defenseBonus: '',
  setDefenseBonus: () => {},
  armorHP: '',
  setArmorHP: () => {},
  soakBonus: '',
  setSoakBonus: () => {},
  outfitMod: 0,
  setOutfitMod: () => {},
  outfitName: '',
  setOutfitName: () => {},
  outfitDesc: '',
  setOutfitDesc: () => {},
})

interface InitiativeState {
  grit: number
  setGrit: React.Dispatch<React.SetStateAction<number>>
  combatants: Combatant[]
  setCombatants: React.Dispatch<React.SetStateAction<Combatant[]>>
}

export const InitiativeContext = createContext<InitiativeState>({
  grit: 0,
  setGrit: () => {},
  combatants: [],
  setCombatants: () => {},
})

interface LoadoutState {}

function GameStateProvider(props: GameStateProviderProps) {
  // Dice
  const [diceCount, setDiceCount] = useState<number>(1)
  const [rolls, setRolls] = useState<number[]>([1])
  const [difficulty, setDifficulty] = useState<number>(15)
  const [resistance, setResistance] = useState<number>(1)
  const [presets, setPresets] = useState<Preset[]>([])

  // Character
  const [character, setCharacter] = useState<MegalosCharacter>(newCharacter)

  // Weapons
  const [size, setSize] = useState<number>(0)
  const [range, setRange] = useState<number>(0)
  const [weaponType, setWeaponType] = useState<number>(0)
  const [weaponMod, setWeaponMod] = useState<number>(0)
  const [weaponName, setWeaponName] = useState<string>('My New Weapon')
  const [weaponDesc, setWeaponDesc] = useState<string>(
    "My weapon's description"
  )

  // Outfits
  const [outfitForm, setOutfitForm] = useState<string>('Light')
  const [defenseBonus, setDefenseBonus] = useState<string>('A')
  const [armorHP, setArmorHP] = useState<string>('B')
  const [soakBonus, setSoakBonus] = useState<string>('C')
  const [outfitMod, setOutfitMod] = useState<number>(0)
  const [outfitName, setOutfitName] = useState<string>('My New Outfit')
  const [outfitDesc, setOutfitDesc] = useState<string>(
    "My outfit's description"
  )

  // Initiative
  const [grit, setGrit] = useState<number>(0)
  const [combatants, setCombatants] = useState<Combatant[]>([])

  const diceContextProviderValue = {
    diceCount,
    setDiceCount,
    rolls,
    setRolls,
    difficulty,
    setDifficulty,
    resistance,
    setResistance,
    presets,
    setPresets,
  }

  const characterContextProviderValue = {
    character,
    setCharacter,
  }

  const loadoutContextProviderValue = {
    size,
    setSize,
    range,
    setRange,
    weaponType,
    setWeaponType,
    weaponMod,
    setWeaponMod,
    weaponName,
    setWeaponName,
    weaponDesc,
    setWeaponDesc,
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
  }

  const initiativeContextProviderValue = {
    grit,
    setGrit,
    combatants,
    setCombatants,
  }

  return (
    <DiceContext.Provider value={diceContextProviderValue}>
      <CharacterContext.Provider value={characterContextProviderValue}>
        <LoadoutContext.Provider value={loadoutContextProviderValue}>
          <InitiativeContext.Provider value={initiativeContextProviderValue}>
            {props.children}
          </InitiativeContext.Provider>
        </LoadoutContext.Provider>
      </CharacterContext.Provider>
    </DiceContext.Provider>
  )
}

export default GameStateProvider
