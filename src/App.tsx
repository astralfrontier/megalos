import React, { useState } from 'react'

import './App.sass'
import DiceRoller from './DiceRoller'

function App() {
  return (
    <div className='container'>
      <DiceRoller />
      <footer className='footer'>
        Dice font is "gems": <a href="https://herror.itch.io/gems" target="_blank">https://herror.itch.io/gems</a>
      </footer>
    </div>
  )
}

export default App
