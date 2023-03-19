import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'

function CharacterProfilePane() {
  const { character } = useContext(CharacterContext)

  return (
    <>
      <article className="message">
        <div className="message-header">
          <p>Character Profile</p>
        </div>
        <div className="message-body">
          <p>
            <strong>Name:</strong>
          </p>
          <p>
            <strong>Homeland:</strong> {character.homeland.name}
          </p>
          <p>
            <strong>Pronouns:</strong>
          </p>
          <p>
            <strong>Class &amp; Calling:</strong> {character.class.name} -{' '}
            {character.calling.name}
          </p>
        </div>
      </article>
    </>
  )
}

export default CharacterProfilePane
