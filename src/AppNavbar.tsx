import React from "react";
import { NavLink } from "react-router-dom";

export const DICE_PATH = "/"
export const LOADOUTS_PATH = "/loadouts"

const activeNavbarItem = ({ isActive }) => isActive ? "navbar-item has-background-white" : "navbar-item"

function AppNavbar() {
  return (
    <nav className="navbar block has-background-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item">
                MEGALOS
            </a>
        </div>
        <div className="navbar-menu">
            <div className="navbar-start">
                <NavLink className={activeNavbarItem} to={DICE_PATH}>
                    Dice
                </NavLink>
                <NavLink className={activeNavbarItem} to={LOADOUTS_PATH}>
                    Loadouts
                </NavLink>
            </div>
        </div>
    </nav>
  );
}

export default AppNavbar;
