import { find, propEq } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'

interface TableRowProps {
  label: string
  value: string
}

function TableRow(props: TableRowProps) {
  const { label, value } = props
  return (
    <div className="column is-full">
      <p>
        <span className="tag is-primary">{label}</span>
      </p>
      {value}
    </div>
  )
}

function benefit(label: string, value: number | undefined) {
  return (
    value ?
    <>
      <p><strong>{label}:</strong> {value}</p>
    </> : <></>
  )
}

function ClassCallingPane() {
  const { character } = useContext(CharacterContext)

  return (
    <>
      <article className="message">
        <div className="message-header">
          <p>Class Stats</p>
        </div>
        <div className="message-body">
          {benefit("Invocations", character.class.benefits.invocations)}
          {benefit("Arcana", character.class.benefits.arcana)}
          {benefit("Strikes", character.class.benefits.strikes)}
          {benefit("Counters", character.class.benefits.counters)}
          {benefit("Sorceries", character.class.benefits.sorceries)}
          {benefit("Cantrips", character.class.benefits.cantrips)}
          {benefit("Talents", character.class.benefits.talents)}
        </div>
      </article>
      <article className="message">
        <div className="message-header">
          <p>Calling Stats</p>
        </div>
        <div className="message-body">
          <p>
            <strong>Role:</strong> {character.calling.benefits.role}
          </p>
          {benefit("Base HP", character.calling.benefits.baseHp)}
          {benefit("Base Dodge", character.calling.benefits.baseDodge)}
          {benefit("Base Ward", character.calling.benefits.baseWard)}
          {benefit("Base Damage", character.calling.benefits.baseDamage)}
          {benefit("Recovery", character.calling.benefits.recovery)}
        </div>
      </article>
    </>
  )
}

export default ClassCallingPane
