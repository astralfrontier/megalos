import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'

function PowersTalentsChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  return (
    <>
      <div>
        TODO Powers & Talents
      </div>
    </>
  )
}

export default PowersTalentsChooser
