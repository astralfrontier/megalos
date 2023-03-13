import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'

function ClassCallingChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  return (
    <>
      <div>
        TODO Classes & Callings
      </div>
    </>
  )
}

export default ClassCallingChooser
