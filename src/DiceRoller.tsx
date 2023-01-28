// import localforage from 'localforage';
import React, { useEffect } from 'react';
import { useState } from 'react'

import DiceShelf from './DiceShelf';
import FormInput from './FormInput';

interface DiceRollerProps {
}

interface Preset {
    label: string;
    diceCount: number;
    difficulty: number;
    resistance: number;
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
    const [diceCount, setDiceCount] = useState<number>(1)
    const [rolls, setRolls] = useState<number[]>(rollDice(diceCount))
    const [difficulty, setDifficulty] = useState<number>(15)
    const [resistance, setResistance] = useState<number>(1)
    const [rerolls, setRerolls] = useState<number>(0)
    const [summary, setSummary] = useState<string>("")
    const [presets, setPresets] = useState<Preset[]>([])

    function rollAndShow() {
        setRerolls(0)
        setRolls(rollDice(diceCount > 0 ? diceCount : 2))
    }

    // useEffect(() => {
    //     try {
    //         localforage.ready().then(() => {
    //             localforage.getItem("presets").then(value => {
    //                 setPresets(value as Preset[] || [])
    //             })
    //         })    
    //     } catch (err) {
    //         alert("Error fetching presets")
    //     }
    // }, [])

    // Summarize the results
    useEffect(() => {
        let computedRolls = rolls

        // Check for disadvantage
        if (diceCount == 0) {
            computedRolls = [Math.min(...rolls)]
        }

        let hits = computedRolls.filter(roll => roll >= difficulty)
        let strongHits = computedRolls.filter(roll => roll === 20)

        // Check for failure
        if(hits.length === 0) {
            if(strongHits.length === 0) {
                setSummary("FAIL: No successes")
                return
            } else {
                hits = strongHits
                strongHits = []
            }
        }

        const totalHits = hits.length + strongHits.length

        if (totalHits < resistance) {
            setSummary(`FAIL: Needed ${resistance} hits to succeed, got ${totalHits}`)
        } else {
            const hitType = strongHits.length > 0 ? "STRONG HIT" : "HIT"
            const msg = [
                hitType,
                `: Needed ${resistance} hit(s) to succeed, got ${totalHits} hit(s)`
            ]
            if ((totalHits - resistance) > 0) {
                msg.push(`, with ${totalHits - resistance} excess hit(s)`)
            }
            setSummary(msg.join(''))
        }
    }, [rolls, difficulty, resistance])

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
            <DiceShelf rolls={rolls} onClick={(index: number) => {
                const newRolls = [...rolls]
                newRolls.splice(index, 1, rollDie(1,20))
                setRolls(newRolls)
                setRerolls(rerolls + 1)
            }} />
             <div className='box block'>
                <p className='is-size-3'>{summary}</p>
                <p>Click on a single die to reroll it.</p>
            </div>
            <div className='box block'>
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
            </div>
            <div className='box block'>
                {presets.map((preset, index) => (
                    <div className='columns is-multiline is-vcentered'>
                        <div className='column is-narrow'>
                            <button className='button is-primary' onClick={() => usePreset(index)}>Use</button>
                        </div>
                        <div className='column is-narrow'>
                            <button className='button is-warning' onClick={() => deletePreset(index)}>Delete</button>
                        </div>
                        <div className='column'>
                            {preset.label} ({preset.difficulty}/{preset.resistance}, {preset.diceCount} dice)
                        </div>
                    </div>
                ))}
                {presets.length ? <></> : <p className='subtitle'>No presets (click "Save" to create one)</p>}
            </div>
        </>
    )
}

export default DiceRoller
