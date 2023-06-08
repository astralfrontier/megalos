import { assoc, find, map, propEq } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import GenericInput from '../GenericInput'
import { describe } from '../visuals'
import ClassCallingPane from './ClassCallingPane'
import { callings, classes, recalculatePowers } from './data'

function ClassCallingChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  const classSetter: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newClass = find(propEq('name', event.currentTarget.value), classes)
    if (newClass) {
      const newCharacter = {
        ...character,
        class: newClass,
        calling: callings[newClass.name][0],
        powers: [],
      }
      setCharacter(
        assoc('powers', recalculatePowers(newCharacter, []), newCharacter)
      )
    }
  }

  const callingSetter: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const newCalling = find(
      propEq('name', event.currentTarget.value),
      callings[character.class.name]
    )
    if (newCalling) {
      const newCharacter = {
        ...character,
        calling: newCalling,
        powers: [],
      }
      setCharacter(
        assoc('powers', recalculatePowers(newCharacter, []), newCharacter)
      )
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
            <h1 className="title has-text-white has-background-primary p-1">
              Your Class
            </h1>
            {describe(character.class.description)}
            <h1 className="title has-text-white has-background-primary p-1">
              Your Calling
            </h1>
            {describe(character.calling.description)}
          </div>
        </div>
        <div className="column">
          <ClassCallingPane character={character} />
        </div>
      </div>
    </>
  )
}

export default ClassCallingChooser
