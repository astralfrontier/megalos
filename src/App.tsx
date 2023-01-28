import React, { useState } from 'react'

import './App.sass'
import DiceRoller from './DiceRoller'

function App() {
  return (
    <div className='container'>
      <DiceRoller />
      <div className='box block'>
        <div className='columns'>
          <div className='column'>
            <div className='content'>
              <p>MEGALOS rules: <a href="https://mataramg.itch.io/megalos" target="_blank">https://mataramg.itch.io/megalos</a></p>
              <p>Source code: <a href="https://github.com/astralfrontier/megalos" target="_blank">https://github.com/astralfrontier/megalos</a></p>

              <p>
                This tool was independently developed and is not affiliated with the author of MEGALOS.
                This tool is available under an MIT license.
              </p>

              <p>
                Images are licensed from Shutterstock and are not covered by the MIT license.
              </p>
            </div>
          </div>
          <div className='column is-narrow'>
            <img src="/src/assets/shutterstock_1158872473.jpg" width="250" height="250" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
