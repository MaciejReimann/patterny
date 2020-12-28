import React, { useState, useEffect, useMemo } from "react"

import { FabricCanvas } from "./lib/fabric-wrappers"
import { Pattern, PatternConfig } from "./patterns/common/pattern"
import { Arabesque } from "./patterns/arabesque/Arabesque"
import { TrianglePattern } from "./patterns/triangle/triangle-pattern"

import { Canvas } from "./components/canvas/Canvas"

export const App = () => {
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>()

  // const arabesque = new Arabesque()
  // const triangle = new Triangle()

  // const [pattern, setPattern] = useState<number>(50)
  const [density, setDensity] = useState<number>(80)
  const [deviation, setDeviation] = useState<number>(10)

  const pattern = useMemo(() => {
    const patternConfig: PatternConfig = {
      density,
      deviation,
      shouldClearOnRender: true,
    }
    const pattern = new Pattern(new TrianglePattern(), patternConfig)
    return pattern
  }, [density, deviation])

  const handleDensityChange = (v: number) => {
    setDensity(v)
  }

  const handleDeviationChange = (v: number) => {
    setDeviation(v)
  }

  useEffect(() => {
    if (fabricCanvas) {
      pattern.draw(fabricCanvas)
    }
  }, [fabricCanvas, pattern, density])

  return (
    <>
      <div>Current density: {density}</div>
      <Canvas width={600} height={600} setCanvas={setFabricCanvas} />
      <div>
        <button onClick={() => handleDensityChange(20)}> Density 20</button>
        <button onClick={() => handleDensityChange(50)}>Density 50</button>
        <button onClick={() => handleDensityChange(100)}>Density 100</button>
      </div>
      <div>
        <button onClick={() => handleDeviationChange(20)}> Deviation 20</button>
        <button onClick={() => handleDeviationChange(50)}>Deviation 50</button>
        <button onClick={() => handleDeviationChange(100)}>
          Deviation 100
        </button>
      </div>
    </>
  )
}
