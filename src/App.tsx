import React, { useState } from 'react'

import './App.sass'
import DiceRoller from './DiceRoller'

function App() {
  return (
    <div className='container'>
      <DiceRoller />
      <footer className='footer block'>
        <div className='content'>
          <p>MEGALOS rules: <a href="https://mataramg.itch.io/megalos" target="_blank">https://mataramg.itch.io/megalos</a></p>
          <p>Source code: <a href="https://github.com/astralfrontier/megalos" target="_blank">https://github.com/astralfrontier/megalos</a></p>
        </div>
      </footer>
    </div>
  )
}

export default App
