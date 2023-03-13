import React, { useContext, useEffect, useState } from 'react';

import DiceSettingsShelf from './DiceSettingsShelf';
import DiceShelf from './DiceShelf';
import { DiceContext } from './DiceWrapper';
import PresetShelf from './PresetShelf';

interface DiceRollerProps {
    children?: React.ReactNode;
}

import {rollDie} from './utilities';

function avrae(diceCount: number, difficulty: number, resistance: number): React.ReactNode {
    return `!r ${diceCount}d20k>${difficulty-1} ${resistance} hits needed`
}

function DiceRoller(_props: DiceRollerProps) {
    const { diceCount, rolls, setRolls, difficulty, resistance } = useContext(DiceContext)

    const [rerolls, setRerolls] = useState<number>(0)
    const [summary, setSummary] = useState<string>("")

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
                ` (${hits.join(' ')})`
            ]
            if ((totalHits - resistance) > 0) {
                msg.push(`, ${totalHits - resistance} excess`)
            }
            setSummary(msg.join(''))
        }
    }, [rolls, difficulty, resistance])

    return (
        <>
            <div className='box block has-text-white has-background-info'>
                <DiceShelf rolls={rolls} onClick={(index: number) => {
                    const newRolls = [...rolls]
                    newRolls.splice(index, 1, rollDie(1,20))
                    setRolls(newRolls)
                    setRerolls(rerolls + 1)
                }} />
            </div>
             <div className='box block'>
                <p className='is-size-3'>{summary}</p>
                <p>Click on a single die to reroll it.</p>
                <p>Avrae command: <span className='is-family-code'>{avrae(diceCount, difficulty, resistance)}</span></p>
            </div>
            <div className='box block'>
                <DiceSettingsShelf rerolls={rerolls} setRerolls={setRerolls} />
            </div>
            <div className='box block'>
                <PresetShelf />
            </div>
        </>
    )
}

export default DiceRoller
