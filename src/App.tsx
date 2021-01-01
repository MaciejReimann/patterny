import React, { useEffect, useState, useMemo } from "react"

import { FabricCanvas } from "./lib/fabric-wrappers"
import {
  PatternFacade,
  PatternName,
  PatternConfig,
} from "./patterns/common/pattern"
import { Arabesque } from "./patterns/arabesque/Arabesque"
import {
  ColorPalettes,
  ColorPalette,
} from "./ui/utils/color-palettes/color-palettes"

import { Header } from "./ui/components/molecules/Header"
import { Canvas } from "./components/canvas/Canvas"
// import { Canvas } from "./ui/components/atoms/Canvas" // this will be in import from organisms DisplayPane (export button + modal)
import { Controls } from "./ui/components/organisms/Controls"
import { Layout } from "./ui/components/layouts/Layout"

import "./App.scss"

export function App() {
  // const patternTypes = ["Rectangular", "Circular", "Hexagonal", "Random"]
  // const [patternType, setPatternType] = useState<string>(patternTypes[0])
  const [pattern, setPattern] = useState<PatternFacade | null>(null)
  const colorPalettes = new ColorPalettes({ length: 9 })
  const brewerPalettes = colorPalettes.getBrewerPalettes()

  const [width, setWidth] = useState<number>(1240)
  const [height, setHeight] = useState<number>(620)
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null)

  const [cellSize, setCellSize] = useState<number>(50)
  const [geometryVariance, setGeometryVariance] = useState<number>(50)
  const [shadingIntensity, setShadingIntensity] = useState<number>(50)
  const [colorPalette, setColorPalette] = useState<ColorPalette>(
    brewerPalettes[0]
  )

  useEffect(() => {
    if (fabricCanvas) {
      const pattern = new PatternFacade(fabricCanvas, PatternName.Trangle)
      setPattern(pattern)
    }
  }, [fabricCanvas])

  const patternConfig = useMemo(() => {
    const patternConfig: PatternConfig = {
      density: cellSize,
      deviation: geometryVariance,
      shouldClearOnRender: true,
    }
    return patternConfig
  }, [cellSize, geometryVariance])

  useEffect(() => {
    if (fabricCanvas && pattern) {
      pattern.draw(patternConfig)
    }
  }, [fabricCanvas, pattern, patternConfig])

  const onWidthChange = (value: number) => {
    setWidth(value)
  }

  const onHeightChange = (value: number) => {
    setHeight(value)
  }

  // const onSetPatternType = (value: string) => {
  //   setPatternType(value)
  // }

  const onCellSizeChange = (value: number) => {
    setCellSize(value)
  }

  const onSetGeometryVariance = (value: number) => {
    setGeometryVariance(value)
  }

  const onSetShadingIntensity = (value: number) => {
    setShadingIntensity(value)
  }

  const onSetColorPalette = (value: ColorPalette) => {
    setColorPalette(value)
  }

  return (
    <Layout
      header={<Header />}
      aside={
        <>
          <Controls
            width={width}
            setWidth={onWidthChange}
            height={height}
            setHeight={onHeightChange}
            // patternTypes={patternTypes}
            // patternType={patternType}
            // setPatternType={onSetPatternType}
            cellSize={cellSize}
            setCellSize={onCellSizeChange}
            geometryVariance={geometryVariance}
            setGeometryVariance={onSetGeometryVariance}
            shadingIntensity={shadingIntensity}
            setShadingIntensity={onSetShadingIntensity}
            colorPalettes={brewerPalettes}
            colorPalette={colorPalette}
            setColorPalette={onSetColorPalette}
          />
        </>
      }
      main={<Canvas width={600} height={600} setCanvas={setFabricCanvas} />}
    />
  )
}
