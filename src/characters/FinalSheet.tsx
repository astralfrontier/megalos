import React from 'react'

import CharacterProfilePane from './CharacterProfilePane'
import ClassCallingPane from './ClassCallingPane'
import PowersTalentsPane from './PowersTalentsPane'
import SkillsPane from './SkillsPane'
import TraitsPane from './TraitsPane'

function FinalSheet() {
  return (
    <>
      <div className="tile is-ancestor">
        <div className="tile is-vertical">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <div className="tile is-child">
                <CharacterProfilePane />
              </div>
              <div className="tile is-child">
                <TraitsPane />
              </div>
              <article className="tile is-child">
                <SkillsPane />
              </article>
            </div>
            <div className="tile is-parent is-vertical">
              <div className="tile is-child">
                <ClassCallingPane />
              </div>
              <div className="tile is-child">
                <PowersTalentsPane />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FinalSheet
