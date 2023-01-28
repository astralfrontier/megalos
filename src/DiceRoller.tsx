import React, { useEffect } from 'react';
import { useState } from 'react'

import DiceShelf from './DiceShelf';

interface DiceRollerProps {
}

function rollDie(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
}

function rollDice(diceCount: number): number[] {
    const results: number[] = []
    for (let i = 0; i < diceCount; i++) {
        results.push(rollDie(1, 20))
    }
    return results
}

function DiceRoller(props: DiceRollerProps) {
    const [diceCount, setDiceCount] = useState<number>(6)
    const [rolls, setRolls] = useState<number[]>(rollDice(diceCount))

    return (
        <div>
            <DiceShelf face="d20" rolls={rolls} onClick={(index: number) => {
                const newRolls = [...rolls]
                newRolls.splice(index, 1, rollDie(1,20))
                setRolls(newRolls)
            }} />
        </div>
    )
}

export default DiceRoller
