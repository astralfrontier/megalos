import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppFooter from './AppFooter'
import AppNavbar, { DICE_PATH, OUTFITS_PATH, WEAPONS_PATH } from './AppNavbar'
import DiceRoller from './dice/DiceRoller'
import DiceWrapper from './dice/DiceWrapper'
import OutfitBuilder from './OutfitBuilder'
import WeaponBuilder from './WeaponBuilder'

import './App.sass'
import DefaultLayout from './DefaultLayout'

const router = createBrowserRouter([
  {
    path: DICE_PATH,
    element: (
      <DefaultLayout>
        <DiceRoller />
      </DefaultLayout>
    ),
  },
  {
    path: OUTFITS_PATH,
    element: (
      <DefaultLayout>
        <OutfitBuilder />
      </DefaultLayout>
    ),
  },
  {
    path: WEAPONS_PATH,
    element: (
      <DefaultLayout>
        <WeaponBuilder />
      </DefaultLayout>
    ),
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

function ErrorPage(_props) {
  return (
    <div className="box block has-background-danger">
      <h1 className="title">Not Found</h1>
    </div>
  )
}

export default function App() {
  return (
    <DiceWrapper>
      <RouterProvider router={router} />
    </DiceWrapper>
  )
}
