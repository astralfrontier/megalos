import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { CHARACTER_PATH, DICE_PATH, GM_SHEET_PATH, OUTFITS_PATH, SOAK_PATH, WEAPONS_PATH } from './App'

const activeNavbarItem = ({ isActive }) =>
  isActive ? 'navbar-item has-background-white' : 'navbar-item'

function AppNavbar() {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <nav
      className="navbar block has-background-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item">MEGALOS</a>
        <a
          role="button"
          className={isActive ? 'navbar-burger is-active' : 'navbar-burger'}
          aria-label="menu"
          aria-expanded="false"
          data-target="appNavbarItems"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        className={isActive ? 'navbar-menu is-active' : 'navbar-menu'}
        id="appNavbarItems"
      >
        <div className="navbar-start">
          <NavLink
            className={activeNavbarItem}
            to={DICE_PATH}
            onClick={() => setIsActive(false)}
          >
            Dice
          </NavLink>
          <NavLink
            className={activeNavbarItem}
            to={SOAK_PATH}
            onClick={() => setIsActive(false)}
          >
            Soak
          </NavLink>
          <NavLink
            className={activeNavbarItem}
            to={CHARACTER_PATH}
            onClick={() => setIsActive(false)}
          >
            Character
          </NavLink>
          <NavLink
            className={activeNavbarItem}
            to={OUTFITS_PATH}
            onClick={() => setIsActive(false)}
          >
            Outfits
          </NavLink>
          <NavLink
            className={activeNavbarItem}
            to={WEAPONS_PATH}
            onClick={() => setIsActive(false)}
          >
            Weapons
          </NavLink>
          <NavLink
            className={activeNavbarItem}
            to={GM_SHEET_PATH}
            onClick={() => setIsActive(false)}
          >
            GM Tools
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default AppNavbar
