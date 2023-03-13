import { append, filter, find, findIndex, map, max, propEq, reduce } from 'ramda'
import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'
import GenericInput from '../GenericInput'
import { ACTIVE_SKILLS, CUTSCENE_SKILLS, MegalosSkillName, RankedSkill, recalculateSkills, skills } from './data'
import SkillsPane from './SkillsPane'

function sanityCheck(condition: boolean, message: string) {
  return condition ? (
    <div className="notification is-danger">{message}</div>
  ) : (
    <></>
  )
}

function skillPointsTotal(skills: RankedSkill[]) {
  return reduce((sum, skill) => sum + skill.rank - 1, 0, skills)
}

function SkillsChooser() {
  const { character, setCharacter } = useContext(CharacterContext)
  const [currentSkill, setCurrentSkill] = useState<MegalosSkillName>(
    skills[0].name
  )

  const currentRankedSkill = findIndex(
    propEq('skill', currentSkill),
    character.skills
  )
  const currentRank = character.skills[currentRankedSkill]?.rank || 1
  //const effectiveRank = character.skills[currentRankedSkill]?.effectiveRank || 1
  const currentSkillDetails = find(propEq('name', currentSkill), skills)

  const rankedActive = filter(skill => ACTIVE_SKILLS.includes(skill.skill), character.skills)
  const rankedCutscene = filter(skill => CUTSCENE_SKILLS.includes(skill.skill), character.skills)

  const activePointsUsed = skillPointsTotal(rankedActive)
  const cutscenePointsUsed = skillPointsTotal(rankedCutscene)

  const maxRanks = reduce(
    (max, rankedSkill) => Math.max(max, rankedSkill.effectiveRank),
    0,
    character.skills
  )

  function modifySkill(amount: number) {
    if (currentRankedSkill == -1) {
      // We're modifying a new skill
      const newSkills = append(
        {
          skill: currentSkill,
          rank: 1 + amount,
          effectiveRank: 1 + amount,
        },
        character.skills
      )
      setCharacter({
        ...character,
        skills: recalculateSkills(
          character,
          newSkills,
          character.homelandSkills
        ),
      })
    } else {
      // Update an existing skill
      character.skills[currentRankedSkill].rank =
        character.skills[currentRankedSkill].rank + amount
      setCharacter({
        ...character,
        skills: recalculateSkills(
          character,
          character.skills,
          character.homelandSkills
        ),
      })
    }
  }

  return (
    <>
      <div className="columns">
        <div className="column">
          <div className="columns is-vcentered">
            <div className="column is-narrow">
              <GenericInput label={'Skill'} help={'Select a skill to modify'}>
                <select
                  onChange={(event) =>
                    setCurrentSkill(
                      event.currentTarget.value as MegalosSkillName
                    )
                  }
                  value={currentSkill}
                >
                  {skills.map((skill) => (
                    <option key={skill.name}>{skill.name}</option>
                  ))}
                </select>
              </GenericInput>
            </div>
            <div className="column is-narrow">
              <button
                className="button is-primary"
                onClick={() => modifySkill(-1)}
                disabled={currentRank < 2}
              >
                -
              </button>
              <button className="button">{currentRank}</button>
              <button
                className="button is-primary"
                onClick={() => modifySkill(1)}
                disabled={currentRank >= 5}
              >
                +
              </button>
            </div>
            <div className='column'>
              {activePointsUsed}/6 active points<br />
              {cutscenePointsUsed}/3 cutscene points
            </div>
          </div>
          <div className="content">
            {map(
              (line) => (
                <p key={line}>{line}</p>
              ),
              currentSkillDetails?.description || []
            )}
            {currentSkillDetails?.uses.length ? (
              <>
                <p>
                  <strong>Use {currentSkill} to:</strong>
                </p>
                <ul>
                  {map(
                    (use) => (
                      <li key={use}>{use}</li>
                    ),
                    currentSkillDetails?.uses || []
                  )}
                </ul>
              </>
            ) : (
              <></>
            )}
          </div>
          {sanityCheck(
            activePointsUsed > 6,
            'You cannot spend more than 6 points on skills'
          )}
          {sanityCheck(
            cutscenePointsUsed > 3,
            'You cannot spend more than 3 points on cutscene skills'
          )}
          {sanityCheck(
            maxRanks > 3,
            'You cannot have a skill ranked higher than 3'
          )}
        </div>
        <div className="column">
          <SkillsPane />
        </div>
      </div>
    </>
  )
}

export default SkillsChooser
