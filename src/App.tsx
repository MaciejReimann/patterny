import React from "react"

import { Arabesque } from "./patterns/arabesque/Arabesque"

import { Canvas } from "./components/canvas/Canvas"

export const App = () => {
  const arabesque = new Arabesque()

  return <Canvas width={600} height={600} callback={arabesque.fillCanvas()} />
}
