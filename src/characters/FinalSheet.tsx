import { compose, filter, has, map, reduce } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import CharacterProfilePane from './CharacterProfilePane'
import ClassCallingPane from './ClassCallingPane'
import { CharacterMutator, MegalosPower } from './data'
import PowersTalentsPane from './PowersTalentsPane'
import SkillsPane from './SkillsPane'
import TraitsPane from './TraitsPane'

function FinalSheet() {
  const { character } = useContext(CharacterContext)

  const effects = map((power: MegalosPower) => power.effect, filter(has("effect"), character.powers)) as CharacterMutator[]
  const finalCharacter = reduce(
    (character, effect) => effect(character),
    character,
    effects
  )

  return (
    <>
      <div className="tile is-ancestor">
        <div className="tile is-vertical">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <div className="tile is-child">
                <CharacterProfilePane character={finalCharacter} />
              </div>
              <div className="tile is-child">
                <TraitsPane character={finalCharacter} />
              </div>
              <div className="tile is-child">
                <SkillsPane character={finalCharacter} />
              </div>
            </div>
            <div className="tile is-parent is-vertical">
              <div className="tile is-child">
                <ClassCallingPane character={finalCharacter} />
              </div>
              <div className="tile is-child">
                <PowersTalentsPane character={finalCharacter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FinalSheet
