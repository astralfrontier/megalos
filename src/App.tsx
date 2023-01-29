import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppFooter from "./AppFooter";
import DiceRoller from "./DiceRoller";
import DiceWrapper from "./DiceWrapper";

import "./App.sass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WrappedDiceRoller />,
    errorElement: <ErrorPage />
  },
]);

function WrappedDiceRoller(_props) {
  return (
    <DiceWrapper>
      <DiceRoller />
    </DiceWrapper>
  );
}

function ErrorPage(_props) {
  return (
    <div className="box block has-background-danger">
      <h1 className="title">Not Found</h1>
    </div>
  )
}

function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
      <AppFooter />
    </div>
  );
}

export default App;
