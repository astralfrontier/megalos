import { append, find, intersection, map, propEq, without } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import GenericInput from '../GenericInput'
import { describe } from '../visuals'
import { homelands, MegalosSkillName, recalculateSkills } from './data'
import SkillsPane from './SkillsPane'

function HomelandChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  /**
   * When changing homeland, only keep eligible homeland skills
   * @param event
   */
  const homelandSetter: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const newHomeland = find(
      propEq('name', event.currentTarget.value),
      homelands
    )
    if (newHomeland) {
      setCharacter({
        ...character,
        homeland: newHomeland,
        homelandSkills: intersection(
          character.homelandSkills,
          newHomeland.startingSkills || []
        ),
      })
    }
  }

  const homelandSkillSetter: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const skillName = event.currentTarget.value as MegalosSkillName
    const newHomelandSkills = (
      event.currentTarget.checked ? append(skillName) : without([skillName])
    )(character.homelandSkills)
    setCharacter({
      ...character,
      homelandSkills: newHomelandSkills,
      skills: recalculateSkills(character, character.skills, newHomelandSkills),
    })
  }

  return (
    <>
      <div className="columns">
        <div className="column">
          <GenericInput
            label={'Homeland'}
            help={'Select a homeland for your character'}
          >
            <select
              id="homeland-name-select"
              onChange={homelandSetter}
              value={character.homeland.name}
            >
              {homelands.map((homeland) => (
                <option key={homeland.name} value={homeland.name}>
                  {homeland.name}
                </option>
              ))}
            </select>
          </GenericInput>

          <div className="content">
            {describe(character.homeland.description)}
            <p>
              <strong>Signature Skills:</strong> Characters from this homeland
              choose 2 of the following skills to gain +1 rating.
            </p>
          </div>

          <div className="columns">
            {map((skill) => {
              const isChecked = character.homelandSkills.includes(skill)
              return (
                <div className="column">
                  <label className="checkbox">
                    <input
                      id={`homeland-skill-checkbox-${skill.toLowerCase()}`}
                      type="checkbox"
                      value={skill}
                      disabled={
                        !isChecked && character.homelandSkills.length >= 2
                      }
                      checked={isChecked}
                      onChange={homelandSkillSetter}
                    />{' '}
                    <strong>{skill}</strong>
                  </label>
                </div>
              )
            }, character.homeland.startingSkills)}
          </div>
        </div>
        <div className="column">
          <SkillsPane character={character} />
        </div>
      </div>
    </>
  )
}

export default HomelandChooser
