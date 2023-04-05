import { assocPath, without } from 'ramda'
import React, { useContext, useState } from 'react'
import slugify from 'slugify'

import { CharacterContext } from '../GameStateProvider'
import { rollDie } from '../utilities'
import { MegalosTrait } from './data'
import TraitsPane from './TraitsPane'

interface TraitInputProps {
  label: string
  placeholder: string
  getter: string
  setter: any
  suggestions: MegalosTrait[]
}

const exampleBackgroundTraits: MegalosTrait[] = [
  'Cloudraft pilot',
  'Consumed by someone else’s revenge',
  'Desert mekari scavenger',
  'Exiled wanderer',
  'Former soldier',
  'Ivory tower dropout',
  'Mining Guild yeoman',
  'Raised by magehunters',
  'Student of a lost Throne Palaestra',
  'Wanted sky pirate',
]

const exampleMentalTraits: MegalosTrait[] = [
  'Always watchful',
  'Classically educated',
  'Clever engineer',
  'Fast learner',
  'Incorrigible gossip',
  "Linguist's ear",
  '“My head is full of bees”',
  '“No thoughts, head empty”',
  'Occult enthusiast',
  'Puzzle solver',
]

const examplePhysicalTraits: MegalosTrait[] = [
  'Born sprinter',
  'Captivating beauty',
  'Delicate precision',
  'Eagle eyed',
  'Practiced acrobat',
  'Quick & quiet',
  'Rolls with the punches',
  'Strong as an aurochs',
  'Unexpected speed',
  '"You ever smoke one of these?"',
]

const exampleSpecialTraits: MegalosTrait[] = [
  'Alien anatomy',
  'Blood of the Ancients',
  'Cat-like features',
  'Forgotten past',
  'Haunted by spirits',
  'Living construct',
  'Menacing aura',
  'Reptilian traits',
  'Touched by the Howling',
  'Truly unbelievable singing voice',
]

function randomTrait(
  currentTrait: MegalosTrait,
  suggestions: MegalosTrait[]
): MegalosTrait {
  const curatedSuggestions = without([currentTrait], suggestions)
  const dieRoll = rollDie(1, curatedSuggestions.length)
  return curatedSuggestions[dieRoll - 1]
}

function TraitInput(props: TraitInputProps) {
  const { label, placeholder, getter, setter, suggestions } = props
  return (
    <div className="field is-horizontal">
      <div className="field-label">{label}</div>
      <div className="field-body">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              id={`trait-input-${slugify(label.toLowerCase())}`}
              className="input"
              type="text"
              placeholder={placeholder}
              value={getter}
              onChange={(event) => setter(event.currentTarget.value)}
            />
          </div>
          <div className="control">
            <button
              id={`trait-randomize-${slugify(label.toLowerCase())}`}
              onClick={() => setter(randomTrait(getter, suggestions))}
            >
              <span className="icon">
                <i className="fa-solid fa-dice"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TraitsChooser() {
  const { character, setCharacter } = useContext(CharacterContext)

  function setTrait(name: string) {
    return (value: MegalosTrait) =>
      setCharacter(assocPath(['traits', name], value, character))
  }

  function randomizeEverything() {
    setCharacter({
      ...character,
      traits: {
        background: randomTrait(
          character.traits.background,
          exampleBackgroundTraits
        ),
        mental: randomTrait(character.traits.mental, exampleMentalTraits),
        physical: randomTrait(character.traits.physical, examplePhysicalTraits),
        special: randomTrait(character.traits.special, exampleSpecialTraits),
      },
    })
  }

  return (
    <>
      <div className="columns">
        <div className="column">
          <TraitInput
            label="Background"
            placeholder="Choose a background trait"
            getter={character.traits.background}
            setter={setTrait('background')}
            suggestions={exampleBackgroundTraits}
          />
          <TraitInput
            label="Mental"
            placeholder="Choose a mental trait"
            getter={character.traits.mental}
            setter={setTrait('mental')}
            suggestions={exampleMentalTraits}
          />
          <TraitInput
            label="Physical"
            placeholder="Choose a physical trait"
            getter={character.traits.physical}
            setter={setTrait('physical')}
            suggestions={examplePhysicalTraits}
          />
          <TraitInput
            label="Special"
            placeholder="Choose a special trait"
            getter={character.traits.special}
            setter={setTrait('special')}
            suggestions={exampleSpecialTraits}
          />

          <p>
            <button
              className="button is-primary"
              onClick={() => randomizeEverything()}
            >
              Random
            </button>
          </p>
        </div>
        <div className="column">
          <div className="content">
            <p>
              Main characters have four traits, which serve as both roleplaying
              cues and mechanical bonuses to skill tests that are in any way
              associated with or could benefit from a trait. You should design
              each trait to represent some essential element of your character.
              Your character isn't only their traits, but their traits should be
              four of their most prominent aspects. The four categories of
              traits are Background, Physical, Mental, and Special.
            </p>
            <p>
              Background traits deal with your character's past & training;
              Physical & Mental with their habits of body & mind; and Special
              covers anything from unusual biology to uncommon supernatural
              heritage.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TraitsChooser
