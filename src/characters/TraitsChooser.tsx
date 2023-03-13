import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'

function TraitsChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  return (
    <>
      <div>
        TODO Traits
      </div>
    </>
  )
}

export default TraitsChooser
