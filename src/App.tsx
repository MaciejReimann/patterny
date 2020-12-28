import React, { useState } from "react"

import { ColorPalettes } from "./ui/utils/color-palettes/color-palettes"

import { ColorPalette } from "./ui/components/atoms/ColorPalette"
import { Canvas } from "./ui/components/atoms/Canvas" // this will be in import from organisms DisplayPane (export button + modal)
import { Controls } from "./ui/components/organisms/Controls"
import { Layout } from "./ui/components/layouts/Layout"

import "./App.scss"

export function App() {
  const patternTypes = ["Rectangular", "Circular", "Hexagonal", "Random"]

  const [width, setWidth] = useState<number>(1240)
  const [height, setHeight] = useState<number>(620)

  const [patternType, setPatternType] = useState<string>(patternTypes[0])
  const [cellSize, setCellSize] = useState<number>(50)
  const [geometryVariance, setGeometryVariance] = useState<number>(50)
  const [shadingIntensity, setShadingIntensity] = useState<number>(50)

  const onWidthChange = (value: number) => {
    setWidth(value)
  }

  const onHeightChange = (value: number) => {
    setHeight(value)
  }

  const onSetPatternType = (value: string) => {
    setPatternType(value)
  }

  const onCellSizeChange = (value: number) => {
    setCellSize(value)
  }

  const onSetGeometryVariance = (value: number) => {
    setGeometryVariance(value)
  }

  const onSetShadingIntensity = (value: number) => {
    setShadingIntensity(value)
  }

  const colorPalettes = new ColorPalettes({ length: 9 })
  const brewerPalettes = Object.entries(colorPalettes.getBrewerPalettes())

  return (
    <Layout
      aside={
        <>
          <Controls
            width={width}
            setWidth={onWidthChange}
            height={height}
            setHeight={onHeightChange}
            patternTypes={patternTypes}
            patternType={patternType}
            setPatternType={onSetPatternType}
            cellSize={cellSize}
            setCellSize={onCellSizeChange}
            geometryVariance={geometryVariance}
            setGeometryVariance={onSetGeometryVariance}
            shadingIntensity={shadingIntensity}
            setShadingIntensity={onSetShadingIntensity}
          />
          {brewerPalettes.map((palette) => (
            <ColorPalette colors={palette[1]} name={palette[0]} />
          ))}
        </>
      }
      main={<Canvas />}
    />
  )
}
