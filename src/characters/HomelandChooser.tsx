import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'

function HomelandChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  return (
    <>
      <div>
        TODO Homeland
      </div>
    </>
  )
}

export default HomelandChooser
