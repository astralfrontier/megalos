import React, { useState } from 'react'

function GmPage() {
  const [grit, setGrit] = useState<number>(0)

  return (
    <>
      <div className="box block">
        <div className="columns is-vcentered">
          <div className="column is-narrow">
            <h3 className="title">Grit</h3>
            <button
              id="skill-minus-button"
              className="button is-primary"
              onClick={() => setGrit(Math.max(0, grit - 1))}
              disabled={grit < 1}
            >
              -
            </button>
            <button className="button">{grit}</button>
            <button
              id="skill-plus-button"
              className="button is-primary"
              onClick={() => setGrit(Math.max(0, grit + 1))}
            >
              +
            </button>
          </div>
          <div className="column is-full">
            <div className="content">
              <ul>
                <li>
                  Gain Grit when a Main Character <strong>fails</strong> a test
                  (including attacks and saves)
                </li>
                <li>
                  Spend Grit <strong>before</strong> a roll to gain bonus dice
                </li>
                <li>
                  Spend Grit <strong>after</strong> a roll to reduce Difficulty
                  by 3, or change damage by +/- 3
                </li>
                <li>
                  No more points of Grit than number of Main Characters in play
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GmPage
