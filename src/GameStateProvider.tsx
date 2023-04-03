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
  name: string
  type: CombatantType
  // Only used for MCs
  fast: boolean
  ap: number
  acted: boolean
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

interface InitiativeState {
  grit: number
  setGrit: React.Dispatch<React.SetStateAction<number>>
  initiativeOrder: Combatant[][]
  setInitiativeOrder: React.Dispatch<React.SetStateAction<Combatant[][]>>
}

export const InitiativeContext = createContext<InitiativeState>({
  grit: 0,
  setGrit: () => {},
  initiativeOrder: [[], [], [], []],
  setInitiativeOrder: () => {},
})

function GameStateProvider(props: GameStateProviderProps) {
  const [diceCount, setDiceCount] = useState<number>(1)
  const [rolls, setRolls] = useState<number[]>([1])
  const [difficulty, setDifficulty] = useState<number>(15)
  const [resistance, setResistance] = useState<number>(1)
  const [presets, setPresets] = useState<Preset[]>([])
  const [character, setCharacter] = useState<MegalosCharacter>(newCharacter)
  const [grit, setGrit] = useState<number>(0)
  const [initiativeOrder, setInitiativeOrder] = useState<Combatant[][]>([
    [],
    [],
    [],
    [],
  ])

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

  const initiativeContextProviderValue = {
    grit,
    setGrit,
    initiativeOrder,
    setInitiativeOrder,
  }

  return (
    <DiceContext.Provider value={diceContextProviderValue}>
      <CharacterContext.Provider value={characterContextProviderValue}>
        <InitiativeContext.Provider value={initiativeContextProviderValue}>
          {props.children}
        </InitiativeContext.Provider>
      </CharacterContext.Provider>
    </DiceContext.Provider>
  )
}

export default GameStateProvider
