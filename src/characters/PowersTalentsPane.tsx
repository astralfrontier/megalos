import { map } from 'ramda'
import React, { useState } from 'react'

import { MegalosCharacter, MegalosPower } from './data'
import classes from './PowersTalentsPane.module.css'
import { describe } from '../visuals'

interface PowersTalentsPaneProps {
  character: MegalosCharacter
}

interface PowerDisplayProps {
  power: MegalosPower
}

function PowerDisplay(props: PowerDisplayProps) {
  const [showDescription, setShowDescription] = useState<boolean>(false)

  const { power } = props
  return (
    <div className="block">
      <div
        className={`columns is-vcentered ${classes.powerDisplay}`}
        key={power.name}
      >
        <div
          className={`column is-narrow ${classes.powerType} ${
            classes[`powerType${power.type}`]
          }`}
        >
          <span className="tag is-primary">{power.type}</span>
        </div>
        <div
          className="column clickable"
          onClick={() => setShowDescription(!showDescription)}
        >
          {power.name}
        </div>
      </div>
      {showDescription ? (
        <div className="columns">
          <div className="column">{describe(power.description)}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

function PowersTalentsPane(props: PowersTalentsPaneProps) {
  const { character } = props

  return (
    <>
      <article className="message">
        <div className="message-header">
          <p>Talents and Powers</p>
        </div>
        <div className="message-body">
          {map(
            (power) => (
              <PowerDisplay key={power.name} power={power} />
            ),
            character.powers
          )}
          <p>
            <em>Click on a power name to see a full description</em>
          </p>
        </div>
      </article>
    </>
  )
}

export default PowersTalentsPane
