import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'

function BondChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  return (
    <>
      <div>TODO Bonds</div>
    </>
  )
}

export default BondChooser
