import React from "react"

import { Arabesque } from "./patterns/arabesque/Arabesque"
import { Triangle } from "./patterns/triangle/Triangle"

import { Canvas } from "./components/canvas/Canvas"

export const App = () => {
  const arabesque = new Arabesque()
  const triangle = new Triangle()

  // TODO: add sliders and see how it works

  return <Canvas width={600} height={600} callback={triangle.fillCanvas()} />
}
