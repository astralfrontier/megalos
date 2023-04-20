import { assoc, evolve, filter, has, map, pluck, reduce } from 'ramda'
import React, { useContext } from 'react'

import { CharacterContext, LoadoutContext } from '../GameStateProvider'
import ImportExportModal from '../ImportExportModal'
import { calculateOutfitValues } from '../OutfitPage'
import { Description } from '../visuals'
import { calculateWeaponValues } from '../WeaponPage'
import CharacterProfilePane from './CharacterProfilePane'
import ClassCallingPane from './ClassCallingPane'
import { CharacterMutator, MegalosCharacter, MegalosPower } from './data'
import PowersTalentsPane from './PowersTalentsPane'
import SkillsPane from './SkillsPane'
import TraitsPane from './TraitsPane'
import { OUTFITS_PATH, WEAPONS_PATH } from '../App'
import { Link } from 'react-router-dom'

// Do a quick and dirty sanitization of Markdown in power descriptions
// by stripping out ** and _, which is the markdown we happen to use there.

function stripMarkdownFromDescription(
  text: Description | undefined
): Description {
  return map(
    (line) => line.replaceAll('**', '').replaceAll('_', ''),
    text || []
  )
}
function stripMarkdownFromPowerDescription(power: MegalosPower): MegalosPower {
  return assoc(
    'description',
    stripMarkdownFromDescription(power.description),
    power
  )
}

const characterFilter = evolve({
  powers: map(stripMarkdownFromPowerDescription),
})

function characterToJson(character: MegalosCharacter, extra: any): string {
  const limited = characterFilter(character)
  return JSON.stringify({ ...limited, ...extra }, null, 2)
}

function FinalSheet() {
  const { character } = useContext(CharacterContext)
  const {
    size,
    range,
    weaponType,
    weaponMod,
    weaponName,
    weaponDesc,
    outfitForm,
    defenseBonus,
    armorHP,
    soakBonus,
    outfitMod,
    outfitName,
    outfitDesc,
  } = useContext(LoadoutContext)

  const effects = pluck('effect')(
    filter(has('effect'), character.powers)
  ) as CharacterMutator[]
  const finalCharacter = reduce(
    (character, effect) => effect(character),
    character,
    effects
  )

  const exportedText = characterToJson(finalCharacter, {
    weapon: {
      weaponName,
      weaponDesc,
      ...calculateWeaponValues(
        size,
        range,
        weaponType,
        weaponMod,
        weaponName,
        weaponDesc
      ),
    },
    armor: {
      outfitName,
      outfitDesc,
      ...calculateOutfitValues(
        outfitName,
        outfitDesc,
        outfitForm,
        defenseBonus,
        armorHP,
        soakBonus,
        outfitMod
      ),
    },
  })

  return (
    <>
      <div className="block">
        <div className="columns is-vcentered">
          <div className="column is-narrow">
            <ImportExportModal exportedText={exportedText} />
          </div>
          <div className="column">
            <strong>
              Don't forget to create a <Link to={WEAPONS_PATH}>Weapon</Link> and{' '}
              <Link to={OUTFITS_PATH}>Outfit</Link> before exporting your
              character!
            </strong>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <CharacterProfilePane character={finalCharacter} />
          <TraitsPane character={finalCharacter} />
          <SkillsPane character={finalCharacter} />
        </div>
        <div className="column">
          <ClassCallingPane character={finalCharacter} />
          <PowersTalentsPane character={finalCharacter} />
        </div>
      </div>
    </>
  )
}

export default FinalSheet
