import { append, difference, intersection, map, pluck, prop, reject, sortBy } from "ramda"

export type MegalosClassName = "" | "Throne" | "Invoker" | "Witch"

export type MegalosCallingName = "" |
  "Arklight" | "Champion" | "Shadowblade" |
  "Astromancer" | "Chanter" | "Raconteur" |
  "Draloi" | "Psythe" | "Rune Magus"

export type MegalosSkillName = "" |
  "Attune" | "Bargain" | "Create" | "Drive" | "Finesse" |
  "Force" | "Hunt" | "Inspect" | "Learn" | "Move" |
  "Perform" | "Restore" | "Sneak" | "Survive" | "Talk" |
  "Watch"

export type MegalosTrait = string

export interface Homeland {
  name: string
  description: string[]
  startingSkills: MegalosSkillName[]
}

// TODO: aether current rules
export interface MegalosClass {
  name: MegalosClassName
  callings: MegalosCallingName[]
}

// TODO: base damage, hp, defenses, soak, recovery, and bonus power
// TODO: finishers, thrones
export interface MegalosCalling {
  name: MegalosCallingName
}

// TODO: description
export interface MegalosSkill {
  name: MegalosSkillName
}

// Effective rank is what's shown on the sheet
// It includes homeland skill picks
export interface RankedSkill {
  skill: MegalosSkillName
  rank: number
  effectiveRank: number
}

export interface MegalosCharacter {
  name: string
  pronouns: string
  homeland: string
  homelandSkills: MegalosSkillName[]
  class: MegalosClassName
  calling: MegalosCallingName
  skills: RankedSkill[]
  traits: MegalosTrait[]
}

export const homelands: Homeland[] = [
  {
    name: 'The August Magocracy',
    description: [
      `A mighty city-state ruled by a council of
      elder wizards, a powerful & enchanting
      witchregent, a secretive conclave of
      sorcerers, or an imperious college of
      mages. It may even be a region home
      to a powerful corporation or guild (or
      consortium of such) which regulates &
      controls magick & its use. The August
      Magocracy is an arrogant land of high
      culture & magick made wealthy and
      powerful on the broken backs of the
      poor & magickless.`,
    ],
    startingSkills: ['Attune', 'Create', 'Inspect', 'Learn', 'Restore'],
  },
  {
    name: 'The Embattled Borderlands',
    description: [
      `The Lands Between. The Seam. The
      Embattled Borderlands are a place of
      near-constant warfare & horror, and yet
      people live there. People have to live
      there. Whether it's economic and
      societal pressures, the road's many
      dangers, or the fact that your neighbors
      have no interest in your wellbeing.
      There is nowhere to run. Nowhere else
      to live. Something inevitably boxes your
      people in and forces them to live on the
      fringe of civilization amidst an
      unending series of bloody conflicts.`,
    ],
    startingSkills: ['Force', 'Hunt', 'Restore', 'Sneak', 'Survive'],
  },
  {
    name: 'The Grasping Theocracy',
    description: [
      `The Grasping Theocracy is built on
      tradition. A tradition of wanting what it
      has not earned & crushing any dissent,
      heterodoxy, or variance in belief. The
      Grasping Theocracy is rich & powerful,
      but can barely provide for its people
      because all of that wealth has been
      stolen from its people to be spent on
      maintaining the appearance of power
      & divine favor.`,
      `The Grasping Theocracy is a bitter land
      obsessed with ideological purity and
      punishing perceived humiliations. They
      burn their own people as readily as
      others burn veridium fuel. The people's
      lives are the Grasping Theocracy's coin.`,
    ],
    startingSkills: ['Force', 'Hunt', 'Perform', 'Talk', 'Watch'],
  },
  {
    name: 'The Guildstate',
    description: [
      `The Guildstate may have begun with a
      courageous act of laborers organizing
      for representation against the abuses
      and exploitation of wealthy aristocrats.
      Or it may have sprung from a society
      that never had a monarchical or
      authoritarian "phase", one in which the
      collective power of specialized groups
      was always the lowest common
      denominator of social capital. However
      it came to be, the Guildstate has ever
      been a difficult balancing act. No true
      democracy, the Guildstate is a place
      where rights & enfranchisement in the
      political process are determined by
      favor with an organization.`,
    ],
    startingSkills: ['Bargain', 'Create', 'Finesse', 'Inspect', 'Talk'],
  },
  {
    name: 'The Humble Village',
    description: [
      `By far the most common homeland is
      the Humble Village. They are detached
      and distantly rural or else segregated
      from- but still imposed upon by- any
      nearby cities. These places are mostly
      communities of physical laborers. Most
      of the folks living here farm, mine for
      ore and crystals, or work primarily in
      some large factory making glass, steel,
      or some other good used elsewhere.
      The rest of the town works in various
      support capacities to these other
      laborers: tool shops & provisioners,
      restaurants & grocers, etc. Humble
      Villages are always industrial or
      agrarian in nature.`,
      `The Humble Village is a small,
      seemingly idyllic town with more than
      its fair share of secrets. Villages like
      these are often victimized by aristocrats
      or large cities who claim to own them,
      while rarely if ever performing anything
      close to an act of stewardship.`,
    ],
    startingSkills: ['Bargain', 'Drive', 'Hunt', 'Inspect', 'Restore'],
  },
  {
    name: 'The Old Empire',
    description: [
      `The Old Empire is one of the true
      superpowers of eld, having existed in
      some form or another since just after
      the last days of the "Classical Era". The
      Old Empire has warred and fought and
      brutally crushed its way through
      history, and though it pays lip service to
      modernity it does so with a sarcastic
      grin. The people here are as free as they
      are anywhere, just as long as they
      harbor no dissenting opinions,
      seditious thoughts, dangerous ideas,
      or- gods forfend- signs of foreignness.
      The Old Empire clothes itself in the
      trappings of an even older empire;
      perhaps even an empire which
      masqueraded as a democracy- all the
      better to feign offense when accused of
      repression.`,
      `The Old Empire is a terrifying engine of
      war once used to plunder the world for
      the benefit of the few, now gently
      moldering in wretched decline. Its
      death spasms have lasted for centuries.`,
    ],
    startingSkills: ['Attune', 'Bargain', 'Learn', 'Perform', 'Talk'],
  },
  {
    name: 'The Remote Mountains',
    description: [
      `A community of survivors in close-knit
      clans spread out over a vast &
      unknowably ancient landscape. Some
      dwell in the dark below the elder
      mountains while others live in the sun-
      bathed world above. The faith of the
      mountain folk is strong, old traditions
      and superstitions are commonplace-
      usually vestiges of woodswise
      strategies for surviving in the beautiful,
      but dangerously rugged environs.`,
      `The Remote Mountains have many
      needs, and are usually quite self-
      sufficient, but they are largely ignored
      by the rest of the world until something
      the outside world wants is found inside
      their mountains. Crystals, gold, iron,
      coal, whatever it may be. The
      mountains and their people are only
      thought of at all when they have
      something of use to outsiders`,
    ],
    startingSkills: ['Create', 'Drive', 'Force', 'Move', 'Survive'],
  },
  {
    name: 'The Undying Lands',
    description: [
      `Far from most of the inhabited (what
      some laughably call "civilized") world
      lies the unspoiled natural beauty of the
      Undying Lands. It is a realm of magick,
      nature, and great stillness. To outsiders,
      the mysteries of the Undying Lands are
      manifold and their people are
      commonly regarded by others as alien
      & inscrutable. To some who live within
      the Undying Lands, their homes are
      places of stifling tradition, expectation,
      and resistance to new ideas.`,
      `The Undying Lands are a society at one
      with nature to a degree undreamed of
      by most, a primordial wilderness as
      pristine as can be while still supporting
      people.`,
    ],
    startingSkills: ['Hunt', 'Move', 'Sneak', 'Survive', 'Watch'],
  },
  {
    name: 'The Wastelands',
    description: [
      `The desert is a harsh place for most life,
    but some are very well adapted to its
    arid expanses. The Wastelands,
    however, are no mere desert. They are
    vast tracts of devastation left over by a
    magickal war, human-made cataclysm,
    or other disaster. They are an artifact of
    mortal hubris. What was left after
    daring met folly.`,
      `And yet people live there still, because
    they must. The Wastelands have lived
    through an apocalypse, and continue
    to suffer the fallout of that event every
    single day. The rest of the world sees
    them as a stain or a scar upon the face
    of the earth. Their very home is- at best-
    a wound to be healed. At worst, it is a
    diseased wretch to be shunned and
    avoided lest they catch its ailment.`,
    ],
    startingSkills: ['Attune', 'Create', 'Hunt', 'Inspect', 'Survive'],
  },
]

export const classes: MegalosClass[] = [
  {
    name: 'Invoker',
    callings: ["Astromancer", "Chanter", "Raconteur"]
  },
  {
    name: 'Throne',
    callings: [
      "Arklight", "Champion", "Shadowblade"
    ]
  },
  {
    name: 'Witch',
    callings: [
      "Draloi", "Psythe", "Rune Magus"
    ]
  },
]

/**
 * Given a list of ranked skills,
 * return a list sorted by name,
 * with effective ranks computed
 * @param skills 
 */
export function recalculateSkills(character: MegalosCharacter, newHomelandSkills: MegalosSkillName[]): RankedSkill[] {
  // Which skills does the character have as homeland skills,
  // but has not assigned any ranks to? We'll need to append these to the end
  const homelandSkillsWithoutRanks = difference(newHomelandSkills, pluck("skill", character.skills))

  let newSkills: RankedSkill[] = map(
    rankedSkill => ({
      skill: rankedSkill.skill,
      rank: rankedSkill.rank,
      effectiveRank: rankedSkill.rank + (newHomelandSkills.includes(rankedSkill.skill) ? 1 : 0)
    }),
    character.skills
  )

  for (let newSkill of homelandSkillsWithoutRanks) {
    newSkills = append({
      skill: newSkill,
      rank: 1,
      effectiveRank: 2
    }, newSkills)
  }

  // Hide any resulting skills with a rank of 1, as that's the default
  newSkills = reject(
    (skill: RankedSkill) => skill.effectiveRank < 2,
    newSkills
  )

  return sortBy(prop("skill"), newSkills)
}

export function newCharacter(): MegalosCharacter {
  return {
    name: 'New Character',
    pronouns: 'they/them',
    homeland: homelands[0].name,
    homelandSkills: [],
    class: '',
    calling: '',
    skills: [],
    traits: [],
  }
}
