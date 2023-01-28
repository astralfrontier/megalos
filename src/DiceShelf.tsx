import React from 'react';

import './App.sass'

interface DiceShelfProps {
  rolls: number[];
  onClick: (index: number) => void;
}

function DiceShelf(props: DiceShelfProps) {
    return (
      <div className='box block has-text-white has-background-info'>
        <div className='columns is-centered is-vcentered is-mobile is-multiline'>
          {props.rolls.map((roll, index) => (
            <div className='column' key={index}>
              <div className='has-text-centered clickable dice' onClick={() => props.onClick(index)}>
                <span className='is-size-1'>{roll}</span>
              </div>
            </div>
          ))}
          {props.rolls.length > 0 ? <></> : <div className='column is-centered is-vcentered'>There are no dice</div>}
        </div>
      </div>
    )
}

export default DiceShelf
