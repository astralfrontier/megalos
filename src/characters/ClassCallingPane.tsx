import { find, propEq } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext } from '../GameStateProvider'
import { classes } from './data'

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

  const currentClass = find(propEq("name", character.class), classes)
  const currentCalling = find(propEq("name", character.calling), currentClass?.callings || [])

  return (
    <>
      <article className="message">
        <div className="message-header">
          <p>Class Stats</p>
        </div>
        <div className="message-body">
          {benefit("Invocations", currentClass?.benefits.invocations)}
          {benefit("Arcana", currentClass?.benefits.arcana)}
          {benefit("Strikes", currentClass?.benefits.strikes)}
          {benefit("Counters", currentClass?.benefits.counters)}
          {benefit("Sorceries", currentClass?.benefits.sorceries)}
          {benefit("Cantrips", currentClass?.benefits.cantrips)}
          {benefit("Talents", currentClass?.benefits.talents)}
        </div>
      </article>
      <article className="message">
        <div className="message-header">
          <p>Calling Stats</p>
        </div>
        <div className="message-body">
          <p>
            <strong>Role:</strong> {currentCalling?.benefits.role}
          </p>
          {benefit("Base HP", currentCalling?.benefits.baseHp)}
          {benefit("Base Dodge", currentCalling?.benefits.baseDodge)}
          {benefit("Base Ward", currentCalling?.benefits.baseWard)}
          {benefit("Base Damage", currentCalling?.benefits.baseDamage)}
          {benefit("Reovery", currentCalling?.benefits.recovery)}
        </div>
      </article>
    </>
  )
}

export default ClassCallingPane
