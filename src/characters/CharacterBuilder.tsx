import React, { useContext, useState } from 'react'

import { CharacterContext } from '../GameStateProvider'
import HomelandChooser from './HomelandChooser'
import TraitsChooser from './TraitsChooser'
import SkillsChooser from './SkillsChooser'
import ClassCallingChooser from './ClassCallingChooser'
import PowersTalentsChooser from './PowersTalentsChooser'
import BondChooser from './BondChooser'

const activeSteps = [
  {
    name: "Homeland",
    element: <HomelandChooser />
  },
  {
    name: "Traits",
    element: <TraitsChooser />
  },
  {
    name: "Skills",
    element: <SkillsChooser />
  },
  {
    name: "Class and Calling",
    element: <ClassCallingChooser />
  },
  {
    name: "Powers and Talents",
    element: <PowersTalentsChooser />
  },
  {
    name: "Bonds",
    element: <BondChooser />
  },
]

function CharacterBuilder() {
  const { character, setCharacter } = useContext(CharacterContext)
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <>
      <div className="box block">
        <nav
          className="breadcrumb has-arrow-separator"
          aria-label="breadcrumbs"
        >
          <ul>
            {activeSteps.map(
              (step, i) => (
                <li className={activeStep == i ? "is-active" : ""}><a onClick={() => setActiveStep(i)}>{step.name}</a></li>
              )
            )}
          </ul>
        </nav>
        {activeSteps.map(
          (step, i) => (
            <div className={activeStep == i ? "" : "is-hidden"}>
              {step.element}
            </div>
          )
        )}
      </div>
    </>
  )
}

export default CharacterBuilder
