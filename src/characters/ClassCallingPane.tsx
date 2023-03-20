import React from 'react'

import { MegalosCharacter, MegalosRole } from './data'

interface ClassCallingPaneProps {
  character: MegalosCharacter
}

function roleText(character: MegalosCharacter): string {
  let text = `${character.calling.role} - ${character.calling.roleDescription}`
  switch (character.calling.role) {
    case MegalosRole.STRIKER:
      text = `${text}. As a Striker calling, you gain +4 damage from being Set Up,
        EMPOWERED, or when exploiting the EXPOSED status, instead of
        +2. The bonus from EMPOWERED becomes +2 for AoE & Multi-target attacks, instead
        of +1. You can only use Light or Medium Armor.`
      break
    case MegalosRole.SUPPORT:
      text = `${text}. You can only use Light Armor. ◇: Support callings
      can spend 1 Recovery to Heal (RB) to themselves or 1 ally in range 1. Limit 1/round.`
      break
    case MegalosRole.TANK:
      text = `${text}. ◇: Tank Callings can inflict TAUNTED on one foe in
      range 1, once per turn. You can only use Medium or Heavy Armor.`
  }
  return text
}

function benefit(label: string, value: number | undefined) {
  return value ? (
    <>
      <p>
        <strong>{label}:</strong> {value}
      </p>
    </>
  ) : (
    <></>
  )
}

function ClassCallingPane(props: ClassCallingPaneProps) {
  const { character } = props

  return (
    <>
      <article className="message">
        <div className="message-header">
          <p>Class Stats</p>
        </div>
        <div className="message-body">
          {benefit('Invocations', character.class.benefits.invocations)}
          {benefit('Arcana', character.class.benefits.arcana)}
          {benefit('Strikes', character.class.benefits.strikes)}
          {benefit('Counters', character.class.benefits.counters)}
          {benefit('Sorceries', character.class.benefits.sorceries)}
          {benefit('Cantrips', character.class.benefits.cantrips)}
          {benefit('Talents', character.class.benefits.talents)}
        </div>
      </article>
      <article className="message">
        <div className="message-header">
          <p>Calling Stats</p>
        </div>
        <div className="message-body">
          <p>
            <strong>Role:</strong> {roleText(character)}
          </p>
          <p>
            <strong>Soak:</strong>{' '}
            {character.calling.role == MegalosRole.TANK ? '2d6' : '1d6'}
          </p>
          {benefit('Base HP', character.calling.benefits.baseHp)}
          {benefit('Base Dodge', character.calling.benefits.baseDodge)}
          {benefit('Base Ward', character.calling.benefits.baseWard)}
          {benefit('Base Damage', character.calling.benefits.baseDamage)}
          {benefit('Recovery', character.calling.benefits.recovery)}
          {benefit('Recovery Base (RB)', character.calling.benefits.baseHp / 4)}
        </div>
      </article>
    </>
  )
}

export default ClassCallingPane
