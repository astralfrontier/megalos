import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import CharacterProfilePane from './CharacterProfilePane'
import ClassCallingPane from './ClassCallingPane'
import PowersTalentsPane from './PowersTalentsPane'
import SkillsPane from './SkillsPane'
import TraitsPane from './TraitsPane'

function FinalSheet() {
  const { character } = useContext(CharacterContext)

  return (
    <>
      <div className="tile is-ancestor">
        <div className="tile is-vertical">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <div className="tile is-child">
                <CharacterProfilePane character={character} />
              </div>
              <div className="tile is-child">
                <TraitsPane character={character} />
              </div>
              <div className="tile is-child">
                <SkillsPane character={character} />
              </div>
            </div>
            <div className="tile is-parent is-vertical">
              <div className="tile is-child">
                <ClassCallingPane character={character} />
              </div>
              <div className="tile is-child">
                <PowersTalentsPane character={character} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FinalSheet
