import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'

function SkillsChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  return (
    <>
      <div>
        TODO Skills
      </div>
    </>
  )
}

export default SkillsChooser
