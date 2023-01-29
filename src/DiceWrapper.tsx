import React, { createContext, useState } from 'react'

export interface DiceState {
    diceCount: number;
    setDiceCount: React.Dispatch<React.SetStateAction<number>>;
    rolls: number[];
    setRolls: React.Dispatch<React.SetStateAction<number[]>>;
    difficulty: number;
    setDifficulty: React.Dispatch<React.SetStateAction<number>>;
    resistance: number;
    setResistance: React.Dispatch<React.SetStateAction<number>>;
}

interface DiceWrapperProps {
    children?: React.ReactNode;
}

export const DiceContext = createContext<DiceState>({
    diceCount: 0,
    setDiceCount: () => {},
    rolls: [],
    setRolls: () => {},
    difficulty: 0,
    setDifficulty: () => {},
    resistance: 0,
    setResistance: () => {}
})

function DiceWrapper(props: DiceWrapperProps) {
    const [diceCount, setDiceCount] = useState<number>(1)
    const [rolls, setRolls] = useState<number[]>([1])
    const [difficulty, setDifficulty] = useState<number>(15)
    const [resistance, setResistance] = useState<number>(1)

    const value = {diceCount, setDiceCount, rolls, setRolls, difficulty, setDifficulty, resistance, setResistance}

    return (
        <DiceContext.Provider value={value}>
            {props.children}
        </DiceContext.Provider>
    )
}

export default DiceWrapper