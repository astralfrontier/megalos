import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CharacterPage from './characters/CharacterPage'
import DefaultLayout from './DefaultLayout'
import DicePage from './dice/DicePage'
import GameStateProvider from './GameStateProvider'
import OutfitPage from './OutfitPage'
import WeaponPage from './WeaponPage'

import './App.sass'

export const DICE_PATH = '/'
export const CHARACTER_PATH = '/character'
export const OUTFITS_PATH = '/outfits'
export const WEAPONS_PATH = '/weapons'

const router = createBrowserRouter([
  {
    path: DICE_PATH,
    element: (
      <DefaultLayout>
        <DicePage />
      </DefaultLayout>
    ),
  },
  {
    path: CHARACTER_PATH,
    element: (
      <DefaultLayout>
        <CharacterPage />
      </DefaultLayout>
    ),
  },
  {
    path: OUTFITS_PATH,
    element: (
      <DefaultLayout>
        <OutfitPage />
      </DefaultLayout>
    ),
  },
  {
    path: WEAPONS_PATH,
    element: (
      <DefaultLayout>
        <WeaponPage />
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
