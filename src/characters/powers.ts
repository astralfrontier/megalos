import { includes, pathEq, pluck } from 'ramda'

import { CharacterFilter, MegalosCallingName, MegalosCharacter, MegalosClassName, MegalosPower, MegalosPowerName, MegalosPowerType } from './data'

// Some filtering functions for writing power prerequisites.
// Each of these functions takes a character object
// and returns true (if the requirements are satisfied)
// or false (if they are not)

export function isClass(name: MegalosClassName): CharacterFilter {
  return (character: MegalosCharacter) => pathEq(['class', 'name'], name, character)
}

export const isInvoker = isClass("Invoker")
export const isThrone = isClass("Throne")
export const isWitch = isClass("Witch")

export function isCalling(name: MegalosCallingName): CharacterFilter {
  return (character: MegalosCharacter) => pathEq(['calling', 'name'], name, character)
}

export function hasPower(name: MegalosPowerName) {
  return (character: MegalosCharacter) => includes(name, pluck("name", character.powers))
}

// The masater list of talents and powers

const invokerTalent = (name: MegalosPowerName) => ({
  name,
  type: MegalosPowerType.TALENT,
  prerequisites: [
    isInvoker
  ],
  costs: {
    talents: 1
  }
})

const astromancerTalent = (name: MegalosPowerName) => ({
  ...invokerTalent(name),
  prerequisites: [
    isCalling("Astromancer")
  ]
})

const chanterTalent = (name: MegalosPowerName) => ({
  ...invokerTalent(name),
  prerequisites: [
    isCalling("Chanter")
  ]
})

const raconteurTalent = (name: MegalosPowerName) => ({
  ...invokerTalent(name),
  prerequisites: [
    isCalling("Raconteur")
  ]
})

export const powers: MegalosPower[] = [
  invokerTalent("Binding of Five"),
  invokerTalent("Blood Seals"),
  chanterTalent("Choir of Benediction"),
  invokerTalent("Closed Circuit"),
  invokerTalent("Cosmic Bond"),
  raconteurTalent("Flesh of Legends"),
  invokerTalent("In the Arms of Angels"),
  astromancerTalent("Keymaster"),
  chanterTalent("Medicus"),
  invokerTalent("Occult Priest"),
  astromancerTalent("Protective Eidolons"),
  invokerTalent("Seals of Life"),
  invokerTalent("Shattered Seals"),
  astromancerTalent("Starry Divinations"),
  raconteurTalent("Sermons & Stories"),
  chanterTalent("Temple Knight"),
  invokerTalent("Unraveling Rapids"),
  invokerTalent("Warrior Priest")
]