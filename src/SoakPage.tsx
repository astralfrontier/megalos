import { join, times } from 'ramda'
import React, { useState } from 'react'

import GenericInput from './GenericInput'
import { plusOrMinus, rollDie } from './utilities'

type DamageType = 'Astral' | 'Physical' | 'Piercing' | 'Toxic' | 'Umbral'

interface FormInputProps {
  label: string
  help: string
  children?: React.ReactNode
}

function NumberInput(props: FormInputProps) {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">{props.children}</div>
      <p className="help">{props.help}</p>
    </div>
  )
}

function SoakPage() {
  const [soakDice, setSoakDice] = useState<number>(1)
  const [astralSoak, setAstralSoak] = useState<number>(0)
  const [physicalSoak, setPhysicalSoak] = useState<number>(0)
  const [toxicSoak, setToxicSoak] = useState<number>(0)
  const [umbralSoak, setUmbralSoak] = useState<number>(0)
  const [damageType, setDamageType] = useState<DamageType>('Physical')
  const [damageAmount, setDamageAmount] = useState<number>(0)
  const [summary, setSummary] = useState<string>('')

  function rollSoak() {
    let bonus
    switch (damageType) {
      case 'Astral':
        bonus = astralSoak
        break
      case 'Physical':
        bonus = physicalSoak
        break
      case 'Piercing':
        setSummary('You cannot soak piercing damage, take the full amount')
        return
      case 'Toxic':
        bonus = toxicSoak
        break
      case 'Umbral':
        bonus = umbralSoak
        break
    }
    const dice = times((_) => rollDie(1, 6), soakDice)
    const total = Math.max(...dice) + bonus

    setSummary(
      `You soak (${join(' ', dice)}) ${plusOrMinus(bonus)} and take ${Math.max(
        0,
        damageAmount - total
      )} damage`
    )
  }

  function resetSoak() {
    setDamageType('Physical')
    setDamageAmount(0)
  }

  return (
    <>
      <div className="box block">
        <div className="columns">
          <div className="column">
            <GenericInput
              label={'Soak Dice'}
              help={'2d6 for Tanks, 1d6 for Strikers and Support'}
            >
              <select
                onChange={(event) =>
                  setSoakDice(parseInt(event.currentTarget.value))
                }
                value={soakDice}
              >
                <option value={1}>1d6</option>
                <option value={2}>2d6</option>
              </select>
            </GenericInput>
          </div>
          <div className="column">
            <NumberInput
              label={'Astral Soak'}
              help={'Your soak bonus against this damage type'}
            >
              <input
                className="input"
                type={'number'}
                value={astralSoak}
                onChange={(event) =>
                  setAstralSoak(parseInt(event.currentTarget.value))
                }
              />
            </NumberInput>
          </div>
          <div className="column">
            <NumberInput
              label={'Physical Soak'}
              help={'Your soak bonus against this damage type'}
            >
              <input
                className="input"
                type={'number'}
                value={physicalSoak}
                onChange={(event) =>
                  setPhysicalSoak(parseInt(event.currentTarget.value))
                }
              />
            </NumberInput>
          </div>
          <div className="column">
            <NumberInput
              label={'Toxic Soak'}
              help={'Your soak bonus against this damage type'}
            >
              <input
                className="input"
                type={'number'}
                value={toxicSoak}
                onChange={(event) =>
                  setToxicSoak(parseInt(event.currentTarget.value))
                }
              />
            </NumberInput>
          </div>
          <div className="column">
            <NumberInput
              label={'Umbral Soak'}
              help={'Your soak bonus against this damage type'}
            >
              <input
                className="input"
                type={'number'}
                value={umbralSoak}
                onChange={(event) =>
                  setUmbralSoak(parseInt(event.currentTarget.value))
                }
              />
            </NumberInput>
          </div>
        </div>
      </div>
      <div className="box block">
        <div className="columns is-vcentered">
          <div className="column is-narrow">
            <GenericInput
              label={'Damage Type'}
              help={'What kind of damage are you soaking?'}
            >
              <select
                onChange={(event) =>
                  setDamageType(event.currentTarget.value as DamageType)
                }
                value={damageType}
              >
                <option value={'Astral'}>Astral</option>
                <option value={'Physical'}>Physical</option>
                <option value={'Piercing'}>Piercing</option>
                <option value={'Toxic'}>Toxic</option>
                <option value={'Umbral'}>Umbral</option>
              </select>
            </GenericInput>
          </div>
          <div className="column is-narrow">
            <NumberInput
              label={'Damage Amount'}
              help={'How much damage are you soaking?'}
            >
              <input
                className="input"
                type={'number'}
                value={damageAmount}
                onChange={(event) =>
                  setDamageAmount(parseInt(event.currentTarget.value))
                }
              />
            </NumberInput>
          </div>
          <div className="column is-narrow">
            <button className="button is-primary" onClick={rollSoak}>
              Roll
            </button>{' '}
            <button className="button is-warning" onClick={resetSoak}>
              Reset
            </button>
          </div>
          <div className="column is-narrow">{summary}</div>
        </div>
      </div>
    </>
  )
}

export default SoakPage
