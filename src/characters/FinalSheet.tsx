import { filter, has, pluck, reduce } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import ImportExportModal from '../ImportExportModal'
import CharacterProfilePane from './CharacterProfilePane'
import ClassCallingPane from './ClassCallingPane'
import { CharacterMutator, MegalosCharacter } from './data'
import PowersTalentsPane from './PowersTalentsPane'
import SkillsPane from './SkillsPane'
import TraitsPane from './TraitsPane'

function characterToJson(character: MegalosCharacter): string {
  return JSON.stringify(character, null, 2)
}

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
      <div className="block">
        <ImportExportModal exportedText={characterToJson(character)} />
      </div>
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
