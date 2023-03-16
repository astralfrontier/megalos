import { find, map, propEq } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import GenericInput from '../GenericInput'
import { describe } from '../visuals'
import ClassCallingPane from './ClassCallingPane'
import { callings, classes } from './data'

function ClassCallingChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  const currentClass = find(propEq('name', character.class), classes)
  const currentCalling = find(
    propEq('name', character.calling),
    callings[character.class.name] || []
  )

  function classSetter(event) {
    const newClass = find(propEq('name', event.currentTarget.value), classes)
    if (newClass) {
      setCharacter({
        ...character,
        class: newClass,
        calling: callings[newClass.name][0]
      })  
    }
  }

  function callingSetter(event) {
    const newCalling = find(propEq('name', event.currentTarget.value), callings[character.class.name])
    if (newCalling) {
      setCharacter({
        ...character,
        calling: newCalling
      })  
    }
  }

  return (
    <>
      <div className="columns">
        <div className="column">
          <div className="columns">
            <div className="column">
              <GenericInput
                label={'Class'}
                help={'Select a class for your character'}
              >
                <select onChange={classSetter} value={character.class.name}>
                  {map(
                    (cls) => (
                      <option key={cls.name} value={cls.name}>
                        {cls.name}
                      </option>
                    ),
                    classes
                  )}
                </select>
              </GenericInput>
            </div>
            <div className="column">
              <GenericInput
                label={'Calling'}
                help={'Select a calling within your chosen class'}
              >
                <select onChange={callingSetter} value={character.calling.name}>
                  {map(
                    (calling) => (
                      <option key={calling.name} value={calling.name}>
                        {calling.name}
                      </option>
                    ),
                    callings[character.class.name] || []
                  )}
                </select>
              </GenericInput>
            </div>
          </div>
          <div className="content">
            <article className="message">
              <div className="message-header">
                <p>Your Class</p>
              </div>
              <div className="message-body">
                {describe(character.class.description)}
              </div>
            </article>
            <article className="message">
              <div className="message-header">
                <p>Your Calling</p>
              </div>
              <div className="message-body">
                {describe(character.calling.description)}
              </div>
            </article>
          </div>
        </div>
        <div className="column">
          <ClassCallingPane />
        </div>
      </div>
    </>
  )
}

export default ClassCallingChooser
