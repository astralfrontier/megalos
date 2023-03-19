import { map } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import { MegalosPower } from './data'
import classes from "./PowersTalentsPane.module.css"

interface PowerDisplayProps {
  power: MegalosPower
  children?: React.ReactNode
}

export function PowerDisplay(props: PowerDisplayProps) {
  const { power, children } = props
  return (
    <div className={`block columns is-vcentered ${classes.powerDisplay}`} key={power.name}>
      <div className={`column is-narrow ${classes.powerType} ${classes[`powerType${power.type}`]}`}>
        <span className="tag is-primary">{power.type}</span>
      </div>
      <div className="column">{power.name}</div>
      {children}
    </div>
  )
}

function PowersTalentsPane() {
  const { character } = useContext(CharacterContext)

  return (
    <>
      <article className="message">
        <div className="message-header">
          <p>Talents and Powers</p>
        </div>
        <div className="message-body">
          {map(
            (power) => (
              <PowerDisplay
                power={power}
              />
            ),
            character.powers
          )}
        </div>
      </article>
    </>
  )
}

export default PowersTalentsPane
