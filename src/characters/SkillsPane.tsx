import { map, times } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'

interface TableRowProps {
  label: string
  rank: number
}

function SolidCircle() {
  return (
    <>
    <i className="fa-solid fa-circle"></i>{' '}
    </>
  )
}

function EmptyCircle() {
  return (
    <>
    <i className="fa-regular fa-circle"></i>{' '}
    </>
  )
}

function TableRow(props: TableRowProps) {
  const { label, rank } = props
  return (
    <div className="columns" key={label}>
      <div className="column is-half">{label}</div>
      <div className="column is-half">
        {times(() => <SolidCircle />, rank)}
        {times(() => <EmptyCircle />, 5 - rank)}
      </div>
    </div>
  )
}

function SkillsPane() {
  const { character } = useContext(CharacterContext)

  const skills = character.skills
  for (let skill of character.homelandSkills) {
    for (let rank of skills) {
    }
  }

  return (
    <>
      <article className="message">
        <div className="message-header">
          <p>Skills</p>
        </div>
        <div className="message-body">
            {map(
              (skill) => (
                <TableRow label={skill.skill} rank={skill.effectiveRank} />
              ),
              character.skills
            )}
            <TableRow label={'ALL OTHERS'} rank={1} />
        </div>
      </article>
    </>
  )
}

export default SkillsPane
