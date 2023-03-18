import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import PowersTalentsPane from './PowersTalentsPane'
import SkillsPane from './SkillsPane'
import TraitsPane from "./TraitsPane"

function FinalSheet() {
  const { character } = useContext(CharacterContext)

  return (
    <>
      <div className="columns is-multiline">
        <div className="column is-half">
          <article className="message">
            <div className="message-header">
              <p>Character Profile</p>
            </div>
            <div className="message-body">
              <p><strong>Name:</strong></p>
              <p><strong>Homeland:</strong> {character.homeland.name}</p>
              <p><strong>Pronouns:</strong></p>
              <p><strong>Class &amp; Calling:</strong> {character.class.name} - {character.calling.name}</p>
            </div>
          </article>
        </div>
        <div className='column is-half'>
          <TraitsPane />
        </div>
        <div className='column is-half'>
          <SkillsPane />
        </div>
        <div className='column is-half'>
          <PowersTalentsPane />
        </div>
      </div>
    </>
  )
}

export default FinalSheet
