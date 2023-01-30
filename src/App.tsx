import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AppFooter from "./AppFooter";
import AppNavbar, { DICE_PATH, OUTFITS_PATH, WEAPONS_PATH } from "./AppNavbar";
import DiceRoller from "./DiceRoller";
import DiceWrapper from "./DiceWrapper";
import OutfitBuilder from "./OutfitBuilder";

import "./App.sass";

function ErrorPage(_props) {
  return (
    <div className="box block has-background-danger">
      <h1 className="title">Not Found</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container">
        <DiceWrapper>
          <Routes>
            <Route path={DICE_PATH} element={<DiceRoller />} />
            <Route path={OUTFITS_PATH} element={<OutfitBuilder />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </DiceWrapper>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
