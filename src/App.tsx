import React, { useState, useEffect, useMemo } from "react"

import { FabricCanvas } from "./lib/fabric-wrappers"
import {
  PatternFacade,
  PatternName,
  PatternConfig,
} from "./patterns/common/pattern"
import { Arabesque } from "./patterns/arabesque/Arabesque"

import { Canvas } from "./components/canvas/Canvas"

export const App = () => {
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null)

  const [density, setDensity] = useState<number>(50)
  const [deviation, setDeviation] = useState<number>(50)

  const [pattern, setPattern] = useState<PatternFacade | null>(null)

  useEffect(() => {
    if (fabricCanvas) {
      const pattern = new PatternFacade(fabricCanvas, PatternName.Trangle)
      setPattern(pattern)
    }
  }, [fabricCanvas])

  const patternConfig = useMemo(() => {
    const patternConfig: PatternConfig = {
      density,
      deviation,
      shouldClearOnRender: true,
    }
    return patternConfig
  }, [density, deviation])

  const handleDensityChange = (v: number) => {
    setDensity(v)
  }

  const handleDeviationChange = (v: number) => {
    setDeviation(v)
  }

  useEffect(() => {
    if (fabricCanvas && pattern) {
      pattern.draw(patternConfig)
    }
  }, [fabricCanvas, pattern, patternConfig])

  return (
    <>
      <div>Current density: {density}</div>
      <Canvas width={600} height={600} setCanvas={setFabricCanvas} />
      <div>
        <button onClick={() => handleDensityChange(0)}> Density 0</button>
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
