import {
  allPass,
  assoc,
  assocPath,
  concat,
  difference,
  either,
  filter,
  includes,
  indexOf,
  map,
  pathEq,
  pluck,
  prop,
  propEq,
  reject,
  sortBy,
  uniqBy,
} from 'ramda'

import { Description } from '../visuals'

export type MegalosClassName = 'Throne' | 'Invoker' | 'Witch'

export type MegalosCallingName =
  | 'Arklight'
  | 'Champion'
  | 'Shadowblade'
  | 'Astromancer'
  | 'Chanter'
  | 'Raconteur'
  | 'Draloi'
  | 'Psythe'
  | 'Rune Magus'

export type MegalosSkillName =
  | ''
  | 'Attune'
  | 'Bargain'
  | 'Create'
  | 'Drive'
  | 'Finesse'
  | 'Force'
  | 'Hunt'
  | 'Inspect'
  | 'Learn'
  | 'Move'
  | 'Perform'
  | 'Restore'
  | 'Sneak'
  | 'Survive'
  | 'Talk'
  | 'Watch'
  | 'Cautious (Cutscene)'
  | 'Clever (Cutscene)'
  | 'Forceful (Cutscene)'
  | 'Quick (Cutscene)'

export type MegalosTrait = string

export interface MegalosTraits {
  background: MegalosTrait
  mental: MegalosTrait
  physical: MegalosTrait
  special: MegalosTrait
}

export interface Homeland {
  name: string
  description: Description
  startingSkills: MegalosSkillName[]
}

export enum MegalosRole {
  STRIKER = 'Striker',
  SUPPORT = 'Support',
  TANK = 'Tank',
}

export interface MegalosClassBenefits {
  invocations?: number
  arcana?: number
  strikes?: number
  counters?: number
  sorceries?: number
  cantrips?: number
  talents?: number
}

export interface MegalosCallingBenefits {
  baseHp: number
  baseDodge: number
  baseWard: number
  baseDamage: number
  recovery: number
}

// TODO: aether current rules
export interface MegalosClass {
  name: MegalosClassName
  description: Description
  benefits: MegalosClassBenefits
}

export interface MegalosCalling {
  name: MegalosCallingName
  description: Description
  role: MegalosRole
  roleDescription: string
  benefits: MegalosCallingBenefits
}

export enum MegalosSkillType {
  // Regular skills
  ACTIVE,

  // Cutscene approaches
  CUTSCENE,
}

export interface MegalosSkill {
  name: MegalosSkillName
  type: MegalosSkillType
  description: Description
  uses: string[]
}

// Effective rank is what's shown on the sheet
// It includes homeland skill picks
export interface RankedSkill {
  skill: MegalosSkillName
  rank: number
  effectiveRank: number
}

/**
 * Any function that returns true or false if a character meets some condition,
 * e.g. is a class or calling, or has a power.
 */
export type CharacterFilter = (character: MegalosCharacter) => boolean

/**
 * Any function that mutates the character during display,
 * e.g. a power that changes your role
 */
export type CharacterMutator = (character: MegalosCharacter) => MegalosCharacter

export type MegalosPowerName = string

export enum MegalosPowerType {
  INVOCATION = 'Invocation',
  ARCANA = 'Arcana',
  CHARGED_STRIKE = 'Charged Strike',
  COMBO_STRIKE = 'Combo Strike',
  COUNTER = 'Counter',
  FINISHER = 'Finisher',
  SORCERY = 'Sorcery',
  CANTRIP = 'Cantrip',
  TALENT = 'Talent',
  CALLING_BONUS = 'Bonus',
}

export interface MegalosPower {
  name: MegalosPowerName
  mandatory: boolean
  type: MegalosPowerType
  prerequisites: CharacterFilter[]
  costs: MegalosClassBenefits
  // TODO: description
  effect?: CharacterMutator
}

export interface MegalosCharacter {
  name: string
  pronouns: string
  homeland: Homeland
  homelandSkills: MegalosSkillName[]
  class: MegalosClass
  calling: MegalosCalling
  skills: RankedSkill[]
  powers: MegalosPower[]
  traits: MegalosTraits
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
  {
    name: 'Unique Homeland',
    description: [
      `Create your own homeland, or pick one from the Oradam Rift setting.`,
    ],
    startingSkills: [
      'Attune',
      'Bargain',
      'Create',
      'Drive',
      'Finesse',
      'Force',
      'Hunt',
      'Inspect',
      'Learn',
      'Move',
      'Perform',
      'Restore',
      'Sneak',
      'Survive',
      'Talk',
      'Watch',
    ],
  },
]

export const classes: MegalosClass[] = [
  {
    name: 'Invoker',
    description: [
      `Invokers are occult scholars with great
    knowledge of the higher and lower
    emanations of the Wellspring and its
    Path of Emanations. Though not
    always, Invokers are often holyfolk and
    priests of the various religions, gods,
    and cults of the Worlds of MEGALOS.
    Their magick calls to forces beyond
    their own world, that they might
    benefit from communion with such
    otherworldly powers. Invokers are able
    to draw forth immense power from the
    transcendent aether of the void
    between worlds.`,
    ],
    benefits: {
      invocations: 2,
      arcana: 2,
      talents: 2,
    },
  },
  {
    name: 'Throne',
    description: [
      `Thrones are warriors whose mastery
    over their own bodily essence is
    unmatched. They use their own life-force,
    their biogenic aether or cœr, as a
    weapon, a shield, and a tool. They are
    unrivaled martial masters. Some
    Thrones belong to long traditions of
    martial artists with codified practices
    dating back centuries, while others are
    self-taught warriors.`,
      `Cœr is the refined aether of a creature's
    soul cultivated and coaxed into a
    blazing, roaring aura called their cœrona.
    Cœronas are highly personal and individualized.
    A Throne can't exactly
    choose what their cœrona will look like,
    but it is nevertheless an expression of
    their soul's truest form.`,
      `Thrones start strong, but the longer a
    fight goes on the less power they have
    to work with. It's in their best interest,
    therefore, to end fights quickly.`,
    ],
    benefits: {
      strikes: 2,
      counters: 2,
      talents: 1,
    },
  },
  {
    name: 'Witch',
    description: [
      `Witches are battle mages par
    excellence, practical magicians whose
    approach to the mysteries of the
    eldritch & divine is one both pragmatic
    & joyful. They are aetherologists who
    ask how a particular spellform is
    materially useful, rather than bothering
    with heady philosophies & conceptual
    alchemy. As such, they are scorned by
    wealthy, classically-trained occultists
    from the balconies of their ivory towers.`,
      `The name "Witch" was originally meant
    to be insulting, intending to connote a
    wild & earthy sort of spellcaster; a
    peasant dabbling in magicks. Witches
    took to the name gladly, turning it into
    a badge of honor to differentiate
    themselves from the magocratic elite.
    They're punk rock spellcasters devoted
    to the democratization of magick and
    an egalitarian future for aetherology.`,
    ],
    benefits: {
      sorceries: 2,
      cantrips: 1,
      talents: 1,
    },
  },
]

export const callings: Record<MegalosClassName, MegalosCalling[]> = {
  Invoker: [
    {
      name: 'Astromancer',
      description: [
        `Astromancers are occult mages who utilize ancient (and often actively forbidden or
        suppressed) taboo rituals to call upon false divinities formed by the interaction
        between mortal minds and astral radiance. The many signs of the almagest, the zodiacal
        godhead of MEGALOS, is clothed in mental constructs and flesh made of cosmic
        aether. These star-creatures Astromancers summon are called Eidolons.`,
        `The Astromancer's art is outlawed in many jurisdictions, as many people fear the
        consequences of drawing the gaze of the stars. Some religions see Eidolons as false
        gods or daemons and so the Astromancer is often cast as an arch-heretic`,
      ],
      role: MegalosRole.STRIKER,
      roleDescription: 'Flexible Artillery',
      benefits: {
        baseHp: 24,
        baseDodge: 8,
        baseWard: 8,
        baseDamage: 6,
        recovery: 4,
      },
    },
    {
      name: 'Chanter',
      description: [
        `Chanters intone otherworldly hymns that act as keys in the locks of their divine seals,
      turning to release the energy within. They summon the angelic Speakers, entities
      from an unknown higher emanation who are believed to serve as messengers of the
      gods. The language of Speakers is, tragically, unknowable by mortalkind. Even Invokers
      struggle to parse more than a few basic concepts.`,
        `What is known with certainty is that the Speakers willingly treat with mortals, that
      they wish to serve as our guides, and that they regard us as "children". The specific
      forms speakers take vary widely, but always include a pair of large feathered wings.`,
      ],
      role: MegalosRole.SUPPORT,
      roleDescription: 'Occult Healer',
      benefits: {
        baseHp: 28,
        baseDodge: 7,
        baseWard: 9,
        baseDamage: 4,
        recovery: 8,
      },
    },
    {
      name: 'Raconteur',
      description: [
        `Raconteurs are necromancers, folk magicians, storytelling bards, and possessed
      spirit-warriors. They protect the histories and stories of their people, collect knowledge
      of the past, and serve as a link between the dead and the living. They tap into
      the immortal memory of the dead in the River of Souls, the Cosmo-Memory, to
      dredge up and give life to legends and myths from across time. Their Memory pow-
      ers allow them to embody legends by channeling those forces- essentially summon-
      ing a being into themselves where other Invokers summon beings into the world.`,
        `Raconteurs' magick is often called mythomancy or story magick.`,
      ],
      role: MegalosRole.TANK,
      roleDescription: 'Heavy Fighter-Mage',
      benefits: {
        baseHp: 32,
        baseDodge: 10,
        baseWard: 10,
        baseDamage: 4,
        recovery: 4,
      },
    },
  ],
  Throne: [
    {
      name: 'Arklight',
      description: [
        `Arklights are devoted to a rigid path of personal fulfillment through moral cultivation.
      They are warrior monks who see their purpose in the world as the vanquishing
      or redemption of "evil" and the protection and cultivation of "good". They protect
      those who cannot protect themselves, work to prevent exploitation of marginalized
      peoples by those who hold power over them, try to empower communities to
      defend themselves, and seek out and destroy unjust structures.`,
        `Arklights are so-called because their carefully cultivated cœr shines from within
      them with an almost divine radiance to heal the sick and protect the disempowered.`,
      ],
      role: MegalosRole.TANK,
      roleDescription: 'Battlegroup Leader',
      benefits: {
        baseHp: 32,
        baseDodge: 10,
        baseWard: 10,
        baseDamage: 4,
        recovery: 4,
      },
    },
    {
      name: 'Champion',
      description: [
        `The Champion is a Throne whose whole life is about adventure, excitement, and
      perfecting their martial technique. Champions don't usually see fighting and violence
      as merely methods of solving problems or exercising power as others do. Nothing so
      coldly utilitarian. To a Champion, fighting is their hobby, their livelihood, and their
      favorite pastime.`,
        `Champions learn their styles in many places, but many join together in informal
      schools called palaestra. They scour the world for knowledge of new techniques to
      learn, new palaestra to join, and new foes and rivals who can give them a good fight.`,
      ],
      role: MegalosRole.STRIKER,
      roleDescription: 'Mobile Brawler',
      benefits: {
        baseHp: 24,
        baseDodge: 9,
        baseWard: 7,
        baseDamage: 6,
        recovery: 4,
      },
    },
    {
      name: 'Shadowblade',
      description: [
        `Shadowblades are avenging angels, dark knights, and shadowy assassins who bring
      justice to those who believed themselves untouchable. You are a vigilante who
      protects the innocent by punishing the wicked. Their cœr powers manifest through
      their shadow selves, or Darksides, phantasmal forces into which they pour their malice
      for the wicked. Through pacts and negotiations, their Darkside becomes a being
      in its own right, ever gaining greater and greater personhood and awareness.`,
        `Eventually, if the Shadowblade is careful, their Darkside becomes a companion and
      a partner. Careless Shadowblades, however, are often slain by their own Darksides.`,
      ],
      role: MegalosRole.STRIKER,
      roleDescription: 'Darkside Skirmisher',
      benefits: {
        baseHp: 24,
        baseDodge: 9,
        baseWard: 7,
        baseDamage: 6,
        recovery: 4,
      },
    },
  ],
  Witch: [
    {
      name: 'Draloi',
      description: [
        `The Draloi are masters of biomantic magicks. The body's physical and aetheric
      humors are intertwined in a delicate balance. Draloi pull at the threads which make up
      their enemies' bodies and souls and use what they extract to heal and fortify their
      allies. In many Worlds of MEGALOS, the practices of the Draloi are forbidden, widely
      feared, or tightly regulated. Their ability to draw the life force out of a living thing is
      frequently far more feared than their ability to heal with that lifeforce is valued.`,
        `In that twilight realm between lauded physician and feared mad scientist stands the
      Draloi. More than a few of them actually revel in this aspect, choosing to lean into
      vampiric aesthetics if for no other reason than the fun of it.`,
      ],
      role: MegalosRole.SUPPORT,
      roleDescription: 'Drain Healer',
      benefits: {
        baseHp: 28,
        baseDodge: 8,
        baseWard: 8,
        baseDamage: 4,
        recovery: 8,
      },
    },
    {
      name: 'Psythe',
      description: [
        `Psythes are psychic spellcasters. Psythes see themselves as the next step in
      magickal evolution, from the "dark ages" practices of the Elder Arts into the light of a
      brave new day. Their magick is derived from their understanding of the mortal mind
      and its workings, and they wield their mind-magicks with alacrity and precision.`,
        `Their methods differ from traditional spells mostly in how they are created, though
      their effects would seem no different to most layfolk. Psythes don't use elaborate
      incantations, magickal materials, and exotic gestures, but instead visualize and
      prepare their spells entirely within their own minds, and then use the power of their
      imaginations to make their envisioned spells a reality.`,
      ],
      role: MegalosRole.STRIKER,
      roleDescription: 'Psychic Duelist',
      benefits: {
        baseHp: 24,
        baseDodge: 8,
        baseWard: 8,
        baseDamage: 6,
        recovery: 4,
      },
    },
    {
      name: 'Rune Magus',
      description: [
        `Rune Magi are egalitarian glyph mages who fight the oppressive traditions of the
      wealthy and powerful to bring magick to the masses. Their art is relatively easy to
      learn, though just as difficult to master as any trade or art. Rune magick is most
      effective in the hands of mages who are thoughtful, careful, and prepared.`,
        `Because it can be learned fairly easily by anyone who can read (and even works well
      as an introduction to literacy), practitioners of the so-called "High Arts" have always
      looked down on rune magick. In the past, a shadow-war was fought to eradicate all
      record of it. Today, Rune Magi are widely seen as a threat to magocratic regimes
      whose grip on power relies on tightly controlling the people's access to magick.`,
      ],
      role: MegalosRole.STRIKER,
      roleDescription: 'Magick Artillery',
      benefits: {
        baseHp: 24,
        baseDodge: 8,
        baseWard: 8,
        baseDamage: 6,
        recovery: 4,
      },
    },
  ],
}

export const skills: MegalosSkill[] = [
  {
    name: 'Attune',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Learning about the local aether, identifying magick and spellcraft, and controlling magickal devices.`,
    ],
    uses: [
      "Attune to the magickal energies of a complex enchanted object to learn what it's for and how to use it.",
      "Discern how recently magick was used in an area and what that magick's overall aspect was.",
      "Bring yourself in sync with a teleportation device, circle, or crystal, so that you can recall yourself to it later, a bit like learning someone's phone number or address. You may only be attuned to one such thing at a time.",
      'Get an impression of the aetheric “vibe check” of a creature, place, or thing.',
    ],
  },
  {
    name: 'Bargain',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Make and alter deals, convince others
      to behave in a way they'd rather not in
      exchange for something that you do or
      give them. In order to bargain effectively,
      you must have something to offer to or withhold from the other party.
      How much leverage you have (or they
      believe you have) directly affects the
      overall effectiveness of a successful
      Bargain test.`,
    ],
    uses: [
      "Get a more favorable price on items you're buying or selling.",
      'Get people to bend the rules for you in exchange for doing (or not doing) something for them.',
      'Renegotiate a deal for better terms once the balance of power has shifted between the relevant parties.',
    ],
  },
  {
    name: 'Create',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Engineering solutions to problems,
      crafting new objects from raw materi-
      als, and making all manner of artistic or
      useful objects. Used as the skill for
      coalescence crafting`,
    ],
    uses: [
      "To evaluate the relative skill of an object's crafters.",
      'To theorize or design a practical item of some sort.',
      'Coalescence (Rest Activity): To create or repair a piece of equipment or art.',
    ],
  },
  {
    name: 'Drive',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Riding, piloting, or steering any sort of
    vehicle. Some vehicles may require
    more than one operator, but there's
    usually just one actual driver.`,
    ],
    uses: [
      'Steer a humble mek-walker or airboat.',
      'Pilot a powerful war-walker or airship.',
      'Win a race through straightforward skill and white-knuckle grit.',
      'Recognize something out of place or exceptional about a particular vehicle.',
    ],
  },
  {
    name: 'Finesse',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Using carefully applied pressures and
      leverage to interact with your environment.
      This is used whenever you carefully and precisely interact with creatures and objects.`,
    ],
    uses: [
      'Pick locks & disable complex devices.',
      'Agilely reverse a grapple.',
      'Carefully dismantle traps.',
    ],
  },
  {
    name: 'Force',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Using brute force to interact with your
    environment. This is used whenever
    you push, lift, drag, bend, or break
    something.`,
    ],
    uses: [
      'Lift or move heavy stuff.',
      'Bash, crash, and break things.',
      'Hold onto something & not let go.',
    ],
  },
  {
    name: 'Hunt',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Finding people and animals, tracking
    movement based on clues left behind
    in the environment, and killing critters
    for food and other supplies.`,
    ],
    uses: [
      'Track down prey by its leavings & trail.',
      "Recognize when a creature is wounded or has other things going on with it based on what it's left in its wake.",
      'Provide food for the group when roughing it out in the wilderness.',
    ],
  },
  {
    name: 'Inspect',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Deducing details about an object, person, or place that you are currently
    holding, observing, or within. Inspect is
    based on your own internal knowledge
    and logical processes`,
    ],
    uses: [
      'Discern when something which should be there is missing.',
      "Discern when something which shouldn't be there is present.",
      'Discover details and intuit the history of an object, person, or location based on its current state.',
      'Discover forensic information.',
    ],
  },
  {
    name: 'Learn',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Searching for knowledge through gossip, by poring over texts, and generally
      finding out what you don't already
      know by means of libraries, crowds, interviews, etc.`,
    ],
    uses: [
      "Learn things you didn't know before.",
      "Search a large trove of information, whether it's digging through a library or canvassing a group of people.",
    ],
  },
  {
    name: 'Move',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Moving yourself quickly or skillfully
    through space. This includes things like
    running, jumping, climbing, and swimming. It also covers acrobatic pursuits
    as well.`,
    ],
    uses: [
      'Win a foot race through speed & agility.',
      'Swim against a powerful current.',
      'Maintain your balance across a narrow, slippery, or otherwise treacherous span.',
      'Tumble, leap, climb, and otherwise parkour through an environment.',
    ],
  },
  {
    name: 'Perform',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Engaging in a physical, visual and/or
    auditory performance art. This covers
    everything from singing and acting to
    playing instruments and dancing. This
    skill is also used to assume a false identity - not to be confused with acts of
    one-off deception (which would be Talk
    instead).`,
    ],
    uses: [
      'Perform a song, oratory, dance, or other performance art routine.',
      "Judge the relative skill of another performer's artistry.",
      'Impersonate someone by taking on a wholly false persona.',
      'Entertain (Rest Activity): Use your skills to help others relax & regain resources.',
    ],
  },
  {
    name: 'Restore',
    type: MegalosSkillType.ACTIVE,
    description: [
      `To heal bodies and minds, and to mend
    fraying relationships. Use Restore to fix
    what's broken or breaking in people
    the way you would use Create to fix
    what's broken or breaking in objects.`,
    ],
    uses: [
      'Diagnose afflictions like poisons, curses, and diseases.',
      'Treat emotional wounds and trauma with therapeutic techniques and counseling over a long period of time.',
      'Act as a mediator between two or more groups with significant disputes and badly frayed relations.',
      'First Aid (Rest Activity): Care for a wounded patient to restore some HP. You spend 1 Recovery; Injured targets regain HP equal to their Recovery Base (p. 43) while non-Injured ones regain HP equal to (RB * 2).',
    ],
  },
  {
    name: 'Sneak',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Hiding, moving silently, stealing things
    without being caught, and engaging in
    all manner of general skulduggery.`,
    ],
    uses: [
      'Remain unseen while moving or hiding.',
      'Hide in plain sight, seeming to just “blend in” with a crowd.',
      'Steal something while being observed but without anyone noticing.',
      'Perform acts of sleight of hand like close-up magic, palming objects, etc.',
    ],
  },
  {
    name: 'Survive',
    type: MegalosSkillType.ACTIVE,
    description: [
      `The combined knowledge and behavior or skills required to survive in an inhospitable environment or without the
    normal support structures of civilization.`,
    ],
    uses: [
      'Recognize different plants & animals, as well as their properties as relates to humanity (i.e. “is this edible?”, “is this animal generally aggressive?”, etc.).',
      'Build camps & structures to protect against the local elements.',
      'Determine direction, distance traveled, approximate location based on maps & landmarks, etc.',
      'Scavenge (Rest Activity): Source medicinal or practical resources from your immediate environment.',
    ],
  },
  {
    name: 'Talk',
    type: MegalosSkillType.ACTIVE,
    description: [
      `Expressing yourself clearly. Use Talk to
    convince, cajole, bully, or deceive others
    into acting in a way they'd otherwise
    not based only on your words`,
    ],
    uses: [
      'Explain and express yourself adequately, especially to people predisposed to distrust or misunderstand you.',
      'Convince others who are convincible that your point of view is the correct one.',
      'Conceal truths & information behind deceptions & omissions without your evasiveness being readily apparent.',
      'Intimidate or pressure people with words & threats alone.',
    ],
  },
  {
    name: 'Watch',
    type: MegalosSkillType.ACTIVE,
    description: [
      `To remain vigilant and react to changes
    in your environment. The Watch skill is
    often used reactively, but you can
    proactively keep careful vigil as well.`,
    ],
    uses: [
      'Notice when someone is sneaking up on you or your group.',
      "Detect changes in your environment which signal something that's about to happen.",
      "Remain vigilant for long periods of time such that you're able to react in a timely manner when something happens.",
      "Watch someone for signs of evasiveness or deception while they're talking.",
      'Stand Watch (Rest Activity): You stay alert enough to know if your group is going to get ambushed during a rest.',
    ],
  },
  {
    name: 'Cautious (Cutscene)',
    type: MegalosSkillType.CUTSCENE,
    description: [
      `Characters that favor the Cautious
    approach tend to be protective, defensive,
    and ungiven to rash action. Often these
    are Arklights, Chanters, Draloi, or Shad-
    owblades. A Cautious approach favors
    waiting for an ideal opportunity or else
    not taking what seems like an unnec-
    essary risk.`,
      `An example of a Cautious approach's
    outcome would be settling for less
    information than you might otherwise
    get by continuing to spy on an enemy
    for longer, in order to get out while the
    getting's good.`,
    ],
    uses: [],
  },
  {
    name: 'Clever (Cutscene)',
    type: MegalosSkillType.CUTSCENE,
    description: [
      `Characters that favor the Clever approach tend to be studious, insightful,
    and meditative. Often these are Raconteurs, Arklights, Draloi, Rune Magi, or
    Psythes. A Clever approach favors planning things out ahead of time, and
    working smarter, not harder.`,
      `An example of a Clever approach's outcome would be facing down a mekari
    construct with a specially-tuned device
    designed to nullify the thing's strongest weapons or weaken its protective
    shields`,
    ],
    uses: [],
  },
  {
    name: 'Forceful (Cutscene)',
    type: MegalosSkillType.CUTSCENE,
    description: [
      `Characters that favor the Forceful approach tend to be brash, powerful, and
    assertive. Often these are Champions,
    Raconteurs, Astromancers, and Rune
    Magi. A Forceful approach favors powering through the opposition and never
    listening to naysayers & defeatists.`,
      `An example of a Forceful approach's
    outcome would be audaciously forcing
    your way in to speak with a monarch
    whose courts' byzantine laws demanded you linger in a bureaucratic
    purgatory for ages before your case
    could be pled.`,
    ],
    uses: [],
  },
  {
    name: 'Quick (Cutscene)',
    type: MegalosSkillType.CUTSCENE,
    description: [
      `Characters that favor the Quick approach tend to be lithe, agile, and
    quick-witted. Often Shadowblades, Astromancers, Champions, or Psythes. A
    Quick approach favors getting "in &
    out" unscathed, preferring subtlety &
    speed to precision, innovation, or raw
    power.`,
      `An example of a Quick approach's outcome would be making it through a
    gauntlet of enemy artillery unharmed
    to deliver an important message to a
    camp cut off from the front lines.`,
    ],
    uses: [],
  },
]

// Cache the set of skills by type, for use in the skills chooser (where we track points separately)
const skillFilter = (type: MegalosSkillType) =>
  pluck('name', filter(propEq('type', type), skills) as MegalosSkill[])

export const ACTIVE_SKILLS = skillFilter(MegalosSkillType.ACTIVE)
export const CUTSCENE_SKILLS = skillFilter(MegalosSkillType.CUTSCENE)

// Cache the names of skills for quick sorting
const skillNames = pluck('name', skills)

// Sort skills by appearance in the skills list, thus putting cutscenes at the end
const skillSortCriteria = (skill: RankedSkill) =>
  indexOf(skill.skill, skillNames)
// const skillSortCriteria = (skill: RankedSkill) => prop("skill")

const skillSorter = sortBy(skillSortCriteria)

/**
 * Given a list of ranked skills,
 * return a list sorted by name,
 * with effective ranks computed
 * @param skills
 */
export function recalculateSkills(
  _character: MegalosCharacter,
  newSkills: RankedSkill[],
  newHomelandSkills: MegalosSkillName[]
): RankedSkill[] {
  // Add skills already found on the sheet
  let updatedSkills: RankedSkill[] = map(
    (rankedSkill) => ({
      skill: rankedSkill.skill,
      rank: rankedSkill.rank,
      effectiveRank:
        rankedSkill.rank +
        (newHomelandSkills.includes(rankedSkill.skill) ? 1 : 0),
    }),
    newSkills
  )

  // Add any homeland skills that we didn't invest points into otherwise
  const homelandSkillsWithoutRanks = difference(
    newHomelandSkills,
    pluck('skill', newSkills)
  )

  updatedSkills = concat(
    updatedSkills,
    map(
      (newSkill) => ({
        skill: newSkill,
        rank: 1,
        effectiveRank: 2,
      }),
      homelandSkillsWithoutRanks
    )
  )

  // Hide any resulting skills with a rank of 1, as that's the default
  updatedSkills = reject(
    (skill: RankedSkill) => skill.effectiveRank < 2,
    updatedSkills
  )

  return skillSorter(updatedSkills)
}

// Some filtering functions for writing power prerequisites.
// Each of these functions takes a character object
// and returns true (if the requirements are satisfied)
// or false (if they are not)

export function isClass(name: MegalosClassName): CharacterFilter {
  return (character: MegalosCharacter) =>
    pathEq(['class', 'name'], name, character)
}

export function isCalling(name: MegalosCallingName): CharacterFilter {
  return (character: MegalosCharacter) =>
    pathEq(['calling', 'name'], name, character)
}

export function hasPower(name: MegalosPowerName) {
  return (character: MegalosCharacter) =>
    includes(name, pluck('name', character.powers))
}

export const isInvoker = isClass('Invoker')
export const isThrone = isClass('Throne')
export const isWitch = isClass('Witch')

export const isAstromancer = isCalling('Astromancer')
export const isChanter = isCalling('Chanter')
export const isRaconteur = isCalling('Raconteur')

export const isArklight = isCalling('Arklight')
export const isChampion = isCalling('Champion')
export const isShadowblade = isCalling('Shadowblade')

export const isDraloi = isCalling('Draloi')
export const isPsythe = isCalling('Psythe')
export const isRuneMagus = isCalling('Rune Magus')

/**
 * For a given character, return a function that
 * for a given power, returns true if all prerequisites are met
 */
export function meetsPrerequisites(character: MegalosCharacter) {
  return (power: MegalosPower) => {
    return allPass(power.prerequisites)(character)
  }
}

// The master list of talents and powers

const bonusPower = (
  name: MegalosPowerName,
  requiredCalling: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: true,
  type: MegalosPowerType.CALLING_BONUS,
  prerequisites: [requiredCalling],
  costs: {},
})

const classTalent = (
  name: MegalosPowerName,
  requiredClass: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: false,
  type: MegalosPowerType.TALENT,
  prerequisites: [requiredClass],
  costs: {
    talents: 1,
  },
})

const invocation = (
  name: MegalosPowerName,
  requiredCalling: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: false,
  type: MegalosPowerType.INVOCATION,
  prerequisites: [requiredCalling],
  costs: {
    invocations: 1,
  },
})

const arcanum = (
  name: MegalosPowerName,
  requiredInvocation: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: false,
  type: MegalosPowerType.ARCANA,
  prerequisites: [requiredInvocation],
  costs: {
    arcana: 1,
  },
})

const chargedStrike = (
  name: MegalosPowerName,
  requiredCalling: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: false,
  type: MegalosPowerType.CHARGED_STRIKE,
  prerequisites: [requiredCalling],
  costs: {
    strikes: 1,
  },
})

const comboStrike = (
  name: MegalosPowerName,
  requiredCalling: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: false,
  type: MegalosPowerType.COMBO_STRIKE,
  prerequisites: [requiredCalling],
  costs: {
    strikes: 1,
  },
})

const counter = (
  name: MegalosPowerName,
  requiredCalling: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: false,
  type: MegalosPowerType.COUNTER,
  prerequisites: [requiredCalling],
  costs: {
    counters: 1,
  },
})

const finisher = (
  name: MegalosPowerName,
  requiredCalling: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: true,
  type: MegalosPowerType.FINISHER,
  prerequisites: [requiredCalling],
  costs: {},
})

const cantrip = (
  name: MegalosPowerName,
  requiredCalling: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: false,
  type: MegalosPowerType.CANTRIP,
  prerequisites: [requiredCalling],
  costs: {
    cantrips: 1,
  },
})

const sorcery = (
  name: MegalosPowerName,
  requiredCalling: CharacterFilter
): MegalosPower => ({
  name,
  mandatory: false,
  type: MegalosPowerType.SORCERY,
  prerequisites: [requiredCalling],
  costs: {
    sorceries: 1,
  },
})

export const powers: MegalosPower[] = [
  // Invoker
  classTalent('Binding of Five', isInvoker),
  classTalent('Blood Seals', isInvoker),
  classTalent('Choir of Benediction', isChanter),
  classTalent('Closed Circuit', isInvoker),
  classTalent('Cosmic Bond', isInvoker),
  classTalent('Flesh of Legends', isRaconteur),
  classTalent('In the Arms of Angels', isInvoker),
  classTalent('Keymaster', isAstromancer),
  classTalent('Medicus', isChanter),
  classTalent('Occult Priest', isInvoker),
  classTalent('Protective Eidolons', isAstromancer),
  classTalent('Seals of Life', isInvoker),
  classTalent('Shattered Seals', isInvoker),
  classTalent('Starry Divinations', isAstromancer),
  classTalent('Sermons & Stories', isRaconteur),
  classTalent('Temple Knight', isChanter),
  classTalent('Unraveling Rapids', isInvoker),
  classTalent('Warrior Priest', isInvoker),

  // Astromancer
  bonusPower('Cosmic Siphon', isAstromancer),
  invocation('Gygus, Sign of Earth', isAstromancer),
  arcanum('Crushing Gaol of Stone', hasPower('Gygus, Sign of Earth')),
  invocation('Hajmaul, Sign of Lightning', isAstromancer),
  arcanum('Tyranny of the Storm', hasPower('Hajmaul, Sign of Lightning')),
  invocation('Quecklain, Sign of Water', isAstromancer),
  arcanum('Aqua Regia', hasPower('Quecklain, Sign of Water')),
  invocation('Safira, Sign of Ice', isAstromancer),
  arcanum('Diamond Dust', hasPower('Safira, Sign of Ice')),
  invocation('Veliath, Sign of Wind', isAstromancer),
  arcanum('Shearing Gyre', hasPower('Veliath, Sign of Wind')),
  invocation('Zalraam, Sign of Fire', isAstromancer),
  arcanum('Aetheric Volatility', hasPower('Zalraam, Sign of Fire')),

  // Chanter
  bonusPower('Chant of Eld', isChanter),
  invocation('Blade Herald', isChanter),
  arcanum('A Rain of Blades', hasPower('Blade Herald')),
  invocation('Lawgiver', isChanter),
  arcanum('Divine Rebuke', hasPower('Lawgiver')),
  invocation('Reaper of Souls', isChanter),
  arcanum('Mortal Swath', hasPower('Reaper of Souls')),
  invocation('Riverspeaker', isChanter),
  arcanum('Mortal Reprieve', hasPower('Riverspeaker')),
  invocation('Stormspeaker', isChanter),
  arcanum('Stormweaver', hasPower('Stormspeaker')),
  invocation('Word-Bearer', isChanter),
  arcanum('The Golden Word', hasPower('Word-Bearer')),

  // Raconteur
  bonusPower('Undertow', isRaconteur),
  invocation('The Faerie King', isRaconteur),
  arcanum('The Faerie King', hasPower("The Faerie's Kiss")),
  invocation('The Judge', isRaconteur),
  arcanum("The Judge's Verdic", hasPower('The Judge')),
  invocation('The Outsider', isRaconteur),
  arcanum("The Outsider's Claim", hasPower('The Outsider')),
  invocation('The Parent', isRaconteur),
  arcanum("The Parent's Sacrifice", hasPower('The Parent')),
  invocation('The Spider', isRaconteur),
  arcanum("The Spider's Trick", hasPower('The Spider')),
  invocation('The Warrior', isRaconteur),
  arcanum(" The Warrior's Ríastrad", hasPower('The Warrior')),

  // Throne
  classTalent('Artillerist', isThrone),
  classTalent('Aura of Might', isThrone),
  classTalent('Crisis Cœr', isThrone),
  {
    ...classTalent('Darkest Knight', isShadowblade),
    effect: (character) => ({
      ...character,
      calling: {
        ...character.calling,
        role: MegalosRole.TANK,
        benefits: {
          ...character.calling.benefits,
          baseHp: 32,
          baseDamage: 4,
        },
      },
    }),
  },
  classTalent('Envenomed Blades', isShadowblade),
  classTalent('Flesh of Spirit, Spirit of Flesh', isThrone),
  classTalent('Greased Lightning', isThrone),
  classTalent('Heart of Darkness', isShadowblade),
  classTalent('Heart of Iron', isChampion),
  classTalent('Heart of Light', isArklight),
  classTalent('Inferno Division', isChampion),
  classTalent('Liftoff', isThrone),
  classTalent('Multiattack', isThrone),
  classTalent('One-Two Punch', isChampion),
  classTalent('Resurgence', isThrone),
  classTalent('Snap Kick', isThrone),
  classTalent('Sneak Attack', isShadowblade),
  classTalent('Solid Cœr', isThrone),
  classTalent('Sword & Board', either(isArklight, hasPower('Darkest Knight'))),
  classTalent('Wings of the Savior', isArklight),

  // Arklight
  bonusPower('Aegis of Light', isArklight),
  finisher('Warrior of Light', isArklight),
  counter('Arken Glow', isArklight),
  counter('Falcon Dive', isArklight),
  counter("Lord's Paces", isArklight),
  counter('Under Wing', isArklight),
  counter('Wings of Conviction', isArklight),
  counter('Wings of Divinity', isArklight),
  counter('Wings of Wrath', isArklight),
  comboStrike('Battle Brand', isArklight),
  comboStrike('Endless Waltz', isArklight),
  comboStrike('Royal Arms', isArklight),
  comboStrike("Thundergod's Steel", isArklight),
  chargedStrike("Armiger's Wrath", isArklight),
  chargedStrike("Confessor's Strike", isArklight),
  chargedStrike('Desolating Verdict', isArklight),
  chargedStrike("Hospitaler's Cry", isArklight),
  chargedStrike('Northswain Slash', isArklight),

  // Champion
  bonusPower('Wild Charge', isChampion),
  finisher('Aetherdrive Breaker!', isChampion),
  counter('Absolute Denial', isChampion),
  counter('Carnage', isChampion),
  counter('Devil Deflection', isChampion),
  counter('Imperial Cancel', isChampion),
  counter('Suckerpunch', isChampion),
  counter('Takedown', isChampion),
  counter('Turnabout', isChampion),
  comboStrike('Aerial Charge', isChampion),
  comboStrike('Meteor Drop', isChampion),
  comboStrike('Outrager', isChampion),
  comboStrike('Tides of Iron', isChampion),
  chargedStrike('Astral Drive', isChampion),
  chargedStrike('Overwhelm', isChampion),
  chargedStrike('Perfect Slash', isChampion),
  chargedStrike('Powerbomb', isChampion),
  chargedStrike('Umbral Cinders', isChampion),

  // Shadowblade
  bonusPower(
    'Soul Eater',
    (character) =>
      isShadowblade(character) && !hasPower('Darkest Knight')(character)
  ),
  bonusPower('Gathering Shadows', hasPower('Darkest Knight')),
  finisher('Darkside Release', isShadowblade),
  counter('Blade Twisting', isShadowblade),
  counter('Bloody Mess', isShadowblade),
  counter("Drakul's Grasp", isShadowblade),
  counter('Embrace of Night', isShadowblade),
  counter('Shadow Nemesis', isShadowblade),
  counter('Wraithwalker', isShadowblade),
  comboStrike('Abyssal Venom', isShadowblade),
  comboStrike('Carving Strike', isShadowblade),
  comboStrike('Chaos Swarm', isShadowblade),
  comboStrike('Cloak & Dagger', isShadowblade),
  chargedStrike('Abyssal Crush', isShadowblade),
  chargedStrike('Blackfire Blast', isShadowblade),
  chargedStrike('Flickering Guillotine', isShadowblade),
  chargedStrike('Steel Exorcism', isShadowblade),
  chargedStrike("Vassago's Scythe", isShadowblade),

  // Witch
  classTalent('Armor of Runes', isRuneMagus),
  classTalent('Balanced Humors', isDraloi),
  classTalent('Cauldron Bubble', isWitch),
  classTalent('Collage Macabre', isPsythe),
  classTalent('Ego Shield', isPsythe),
  classTalent('Howling Pact', isWitch),
  classTalent('Familiar', isWitch),
  classTalent('Flight Incantation', isWitch),
  classTalent("L'appel du Vide", isPsythe),
  classTalent('Lesser Glyphspells', isRuneMagus),
  classTalent('Ominous Signifiers', isRuneMagus),
  classTalent('Paroxysm', isDraloi),
  classTalent('Psychic Network', isPsythe),
  classTalent('Sang Réal', isDraloi),
  classTalent('Some for the Doctor', isDraloi),
  classTalent('Telekine Technique', isWitch),
  classTalent("Witch's Cackle", isWitch),
  classTalent('Xenoglossy', isRuneMagus),

  // Draloi
  bonusPower('Redistribute', isDraloi),
  cantrip('Bloody Physick', isDraloi),
  cantrip('Drain Aether', isDraloi),
  cantrip('Drain Blood', isDraloi),
  cantrip('Drain Soul', isDraloi),
  cantrip('Red Flash', isDraloi),
  cantrip('Sanguine Pavise', isDraloi),
  sorcery('Blood Alchemy', isDraloi),
  sorcery('Boiling Bile', isDraloi),
  sorcery('Chirurgy', isDraloi),
  sorcery('Conveyance', isDraloi),
  sorcery('Haemonculus', isDraloi),
  sorcery('Insanguinate', isDraloi),
  sorcery('Liquefaction', isDraloi),
  sorcery('Revivify', isDraloi),

  // Psythe
  bonusPower('The Pledge', isPsythe),
  cantrip('Bio-Shock', isPsythe),
  cantrip('Fog of War', isPsythe),
  cantrip('Haunt', isPsythe),
  cantrip('Mind Blades', isPsythe),
  cantrip('Phantasmagoria', isPsythe),
  cantrip('The Turn', isPsythe),
  sorcery('Blade Dance', isPsythe),
  sorcery('Kinetic Throw', isPsythe),
  sorcery('Marching Orders', isPsythe),
  sorcery('Marionette', isPsythe),
  sorcery('Mirage Arcana', isPsythe),
  sorcery('The Prestige', isPsythe),
  sorcery('Psychic Surgery', isPsythe),
  sorcery('Psything Mind', isPsythe),

  // Rune Magis
  bonusPower('Xenosyntax', isRuneMagus),
  cantrip('Anex Malecar (Lesser Truth: Curse of Gravity)', isRuneMagus),
  cantrip('En Vai Bruma (Lesser Mneme: Harsh Winter)', isRuneMagus),
  cantrip('En Vai Mani (Lesser Mneme: Compassion)', isRuneMagus),
  cantrip('Sigil of the Baleful Eye', isRuneMagus),
  cantrip('Sigil of Combustion', isRuneMagus),
  cantrip('Sigil of Entanglement', isRuneMagus),
  sorcery('Asanex Gravos (Greater Truth: Burden of Time)', isRuneMagus),
  sorcery('En Vas Pyroth (Greater Mneme: Wildfire)', isRuneMagus),
  sorcery('Logos: Concentrativity', isRuneMagus),
  sorcery('Logos: Eruption', isRuneMagus),
  sorcery('Logos: Gravitation', isRuneMagus),
  sorcery('Logos: Geoglyphic Convergence', isRuneMagus),
  sorcery('Paracausal Darkness', isRuneMagus),
  sorcery('Paracausal Light', isRuneMagus),
]

const allMandatoryPowers = filter((power) => prop('mandatory', power), powers)

/**
 * For a given character, find all starting powers and return those.
 * Currently this is all calling bonus powers for which they qualify.
 * @param character
 */
export function recalculatePowers(
  character: MegalosCharacter,
  newPowers: MegalosPower[]
): MegalosPower[] {
  const newCharacter = assoc('powers', newPowers, character)

  // Add any mandatory powers the character ought to have
  const addedMandatoryPowers = concat(
    newPowers,
    filter(meetsPrerequisites(newCharacter), allMandatoryPowers)
  )

  // Remove any newly disqualifying powers
  const qualifyingPowers = filter(
    meetsPrerequisites(newCharacter),
    addedMandatoryPowers
  )

  // Sort powers by their appearance in the master powers list
  return uniqBy(
    prop('name'),
    sortBy((power) => indexOf(power, powers), qualifyingPowers)
  )
}

export function newCharacter(): MegalosCharacter {
  const character: MegalosCharacter = {
    name: 'New Character',
    pronouns: 'they/them',
    homeland: homelands[0],
    homelandSkills: [],
    class: classes[0],
    calling: callings[classes[0].name][0],
    skills: [],
    powers: [],
    traits: {
      background: '',
      mental: '',
      physical: '',
      special: '',
    },
  }
  return assoc(
    'powers',
    recalculatePowers(character, character.powers),
    character
  )
}
