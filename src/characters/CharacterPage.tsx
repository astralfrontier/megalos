import React, { useState } from 'react'
import slugify from 'slugify'

import ClassCallingChooser from './ClassCallingChooser'
import FinalSheet from './FinalSheet'
import HomelandChooser from './HomelandChooser'
import PowersTalentsChooser from './PowersTalentsChooser'
import SkillsChooser from './SkillsChooser'
import TraitsChooser from './TraitsChooser'

const activeSteps = [
  {
    name: 'Homeland',
    element: <HomelandChooser />,
  },
  {
    name: 'Traits',
    element: <TraitsChooser />,
  },
  {
    name: 'Skills',
    element: <SkillsChooser />,
  },
  {
    name: 'Class and Calling',
    element: <ClassCallingChooser />,
  },
  {
    name: 'Powers and Talents',
    element: <PowersTalentsChooser />,
  },
  {
    name: 'Sheet',
    element: <FinalSheet />,
  },
]

function CharacterPage() {
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <>
      <div className="box block">
        <div className="tabs">
          <ul>
            {activeSteps.map((step, i) => (
              <li id={`character-tab-${slugify(step.name)}`} className={activeStep == i ? 'is-active' : ''}>
                <a onClick={() => setActiveStep(i)}>{step.name}</a>
              </li>
            ))}
          </ul>
        </div>
        {activeSteps.map((step, i) => (
          <div className={activeStep == i ? '' : 'is-hidden'}>
            {step.element}
          </div>
        ))}
      </div>
    </>
  )
}

export default CharacterPage
