import { filter, has, pluck, reduce } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import CharacterProfilePane from './CharacterProfilePane'
import ClassCallingPane from './ClassCallingPane'
import { CharacterMutator } from './data'
import PowersTalentsPane from './PowersTalentsPane'
import SkillsPane from './SkillsPane'
import TraitsPane from './TraitsPane'

function FinalSheet() {
  const { character } = useContext(CharacterContext)

  const effects = pluck('effect')(
    filter(has('effect'), character.powers)
  ) as CharacterMutator[]
  const finalCharacter = reduce(
    (character, effect) => effect(character),
    character,
    effects
  )

  return (
    <>
      <div className="columns">
        <div className="column">
          <CharacterProfilePane character={finalCharacter} />
          <TraitsPane character={finalCharacter} />
          <SkillsPane character={finalCharacter} />
        </div>
        <div className="column">
          <ClassCallingPane character={finalCharacter} />
          <PowersTalentsPane character={finalCharacter} />
        </div>
      </div>
    </>
  )
}

export default FinalSheet
