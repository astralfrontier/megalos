import React from 'react';
import { useState } from 'react'

import './App.sass'

interface DiceShelfProps {
  face: string;
  rolls: number[];
  onClick: (index: number) => void;
}

function DiceShelf(props: DiceShelfProps) {
    return (
      <div className='box block has-text-white has-background-info'>
        <div className='columns is-centered'>
          {props.rolls.map((roll, index) => (
            <div className='column is-centered is-vcentered' key={index}>
              <div className='has-text-centered clickable dice' onClick={() => props.onClick(index)}>{props.face}.{roll}</div>
            </div>
          ))}
          {props.rolls.length > 0 ? <></> : <div className='column is-centered is-vcentered'>There are no dice</div>}
        </div>
      </div>
    )
}

export default DiceShelf
