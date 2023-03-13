import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import DefaultLayout from './DefaultLayout'
import DiceRoller from './dice/DiceRoller'
import GameStateProvider from './GameStateProvider'
import OutfitBuilder from './OutfitBuilder'
import WeaponBuilder from './WeaponBuilder'

import './App.sass'
import CharacterBuilder from './characters/CharacterBuilder'

export const DICE_PATH = '/'
export const CHARACTER_PATH = '/character'
export const OUTFITS_PATH = '/outfits'
export const WEAPONS_PATH = '/weapons'

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
    path: CHARACTER_PATH,
    element: (
      <DefaultLayout>
        <CharacterBuilder />
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
    <GameStateProvider>
      <RouterProvider router={router} />
    </GameStateProvider>
  )
}
