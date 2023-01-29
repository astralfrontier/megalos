import React, { useContext, useEffect, useState } from 'react';

import { DiceContext } from './DiceWrapper';
import FormInput from './FormInput';

interface DiceSettingsShelfProps {
    rerolls: number;
    setRerolls: React.Dispatch<React.SetStateAction<number>>;
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

function DiceSettingsShelf(props: DiceSettingsShelfProps) {
    const { diceCount, setDiceCount, setRolls, difficulty, setDifficulty, resistance, setResistance, presets, setPresets } = useContext(DiceContext)
    const { rerolls, setRerolls} = props

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
        const presetName = prompt("Enter a name for this preset", "New Preset")
        if (presetName != null) {
            const newPresets = [...presets]
            newPresets.push({
                label: presetName,
                diceCount: diceCount,
                difficulty: difficulty,
                resistance: resistance
            })
            setPresets(newPresets)
        }
    }

    return (
        <>
            <div className='columns'>
            <div className='column has-text-centered'>
                    <button className='button is-primary mx-2' onClick={() => rollAndShow()}>Roll</button>
                    <button className='button is-warning mx-2' onClick={() => resetRolls()}>Reset</button>
                    <br />
                    Rerolls Used: {rerolls}
                    <br />
                    <button className='button is-info' onClick={() => savePreset()}>Save</button>
                </div>
                <div className='column'>
                    <FormInput label={'Dice'} min={0} max={8} getter={diceCount} setter={setDiceCount}>
                        Your skill rating, or the dice rating of your weapon, plus Advantage, minus Disadvantage
                    </FormInput>
                </div>
                <div className='column'>
                    <FormInput label={'Difficulty'} min={1} max={21} getter={difficulty} setter={setDifficulty}>
                        The default value is 15 for checks, or the opponent's Dodge or Ward for attacks
                    </FormInput>
                </div>
                <div className='column'>
                    <FormInput label={'Resistance'} min={1} max={8} getter={resistance} setter={setResistance}>
                        The default value is 1, +1 each for magickal effects, Stressed Out, unfavorable conditions, and GM ruling
                    </FormInput>
                </div>
            </div>
        </>
    )
}

export default DiceSettingsShelf
