import { find, map, propEq } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import GenericInput from '../GenericInput'
import { classes } from './data'
import { describe } from '../visuals'

function ClassCallingChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  const currentClass = find(propEq('name', character.class), classes)
  const currentCalling = find(
    propEq('name', character.calling),
    currentClass?.callings || []
  )

  function classSetter(event) {
    const newClass = find(propEq('name', event.currentTarget.value), classes)
    setCharacter({
      ...character,
      class: newClass?.name || '',
      calling: newClass?.callings[0].name || '',
    })
  }

  function callingSetter(event) {
    setCharacter({
      ...character,
      calling: event.currentTarget.value,
    })
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
                <select onChange={classSetter} value={character.class}>
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
                <select onChange={callingSetter} value={character.calling}>
                  {map(
                    (calling) => (
                      <option key={calling.name} value={calling.name}>
                        {calling.name}
                      </option>
                    ),
                    currentClass?.callings || []
                  )}
                </select>
              </GenericInput>
            </div>
          </div>
          <div className="content">
            {describe(currentClass?.description)}
            {describe(currentCalling?.description)}
          </div>
        </div>
        <div className="column">TODO</div>
      </div>
    </>
  )
}

export default ClassCallingChooser
