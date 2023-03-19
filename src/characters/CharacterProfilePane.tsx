import React from 'react'

import { MegalosCharacter } from './data'

interface CharacterProfilePaneProps {
  character: MegalosCharacter
}

function CharacterProfilePane(props: CharacterProfilePaneProps) {
  const { character } = props

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
