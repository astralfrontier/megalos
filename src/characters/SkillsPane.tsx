import { map, times } from 'ramda'
import React from 'react'

import { CharacterContext } from '../GameStateProvider'

import type { MegalosCharacter } from './data'

interface SkillsPaneProps {
  character: MegalosCharacter
}

interface TableRowProps {
  label: string
  rank: number
  effectiveRank: number
}

function SolidCircle() {
  return (
    <>
      <i className="fa-solid fa-circle"></i>{' '}
    </>
  )
}

function EffectiveCircle() {
  return (
    <>
      <i className="fa-solid fa-circle-plus"></i>{' '}
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
  const { label, rank, effectiveRank } = props
  return (
    <div className="columns" key={label}>
      <div
        className="column is-half"
        id={`skill-pane-${label.toLowerCase()}`}
        data-rank={rank}
        data-effective-rank={effectiveRank}
      >
        {label}
      </div>
      <div className="column is-half">
        {times(
          () => (
            <SolidCircle />
          ),
          Math.min(5, rank)
        )}
        {times(
          () => (
            <EffectiveCircle />
          ),
          Math.max(0, effectiveRank - rank)
        )}
        {times(
          () => (
            <EmptyCircle />
          ),
          Math.max(0, 5 - Math.max(rank, effectiveRank))
        )}
      </div>
    </div>
  )
}

function SkillsPane(props: SkillsPaneProps) {
  const { character } = props

  return (
    <>
      <article className="message" id="skills-pane">
        <div className="message-header">
          <p>Skills</p>
        </div>
        <div className="message-body">
          {map(
            (skill) => (
              <TableRow
                label={skill.skill}
                rank={skill.rank}
                effectiveRank={skill.effectiveRank}
              />
            ),
            character.skills
          )}
          <TableRow label={'ALL OTHERS'} rank={1} effectiveRank={1} />
        </div>
      </article>
    </>
  )
}

export default SkillsPane
