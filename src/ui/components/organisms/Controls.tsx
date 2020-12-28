import React, { useState } from "react"

import { Slider } from "../atoms/Slider"
import { Input, InputSize } from "../atoms/Input"
import { Button, ButtonSizes } from "../atoms/Button"

import styles from "./Controls.module.scss"

type NumberSetter = (value: number) => void
type StringSetter = (value: string) => void

export type PatternTypeDisplayValue = string // tepm - use an enum

interface PatternParameters {
  width: number
  height: number
  patternTypes: PatternTypeDisplayValue[]
  patternType: PatternTypeDisplayValue
  cellSize: number
  geometryVariance: number
  shadingIntensity: number
  colors?: string[]
}

interface ControlsProps extends PatternParameters {
  setWidth: NumberSetter
  setHeight: NumberSetter
  setPatternType: StringSetter
  setCellSize: NumberSetter
  setGeometryVariance: NumberSetter
  setShadingIntensity: NumberSetter
  setColors?: (value: string[]) => void
}

export const Controls = (props: ControlsProps) => {
  const {
    width,
    height,
    patternTypes,
    patternType,
    cellSize,
    geometryVariance,
    shadingIntensity,
    colors,
    setWidth,
    setHeight,
    setPatternType,
    setCellSize,
    setGeometryVariance,
    setShadingIntensity,
    setColors,
  } = props

  const selectedPattern = patternType

  return (
    <div className={styles.wrapper}>
      <div className={styles["canvas-size"]}>
        <Input
          label="Width"
          value={width}
          onChange={setWidth}
          size={InputSize.Small}
        />
        <Input
          label="Height"
          value={height}
          onChange={setHeight}
          size={InputSize.Small}
        />
      </div>

      <div className={styles["pattern-types"]}>
        <label className="label">Pattern Types</label>
        <div className={styles["buttons"]}>
          {patternTypes.map((patternType) => (
            <Button
              isClicked={selectedPattern === patternType}
              label={patternType}
              onClick={() => setPatternType(patternType)}
              size={ButtonSizes.Small}
            />
          ))}
        </div>
      </div>

      <div className={styles["slider"]}>
        <Slider label="Cell size" value={cellSize} onChange={setCellSize} />
      </div>
      <div className={styles["slider"]}>
        <Slider
          label="Geometry variance"
          value={geometryVariance}
          onChange={setGeometryVariance}
        />
      </div>
      <div className={styles["slider"]}>
        <Slider
          label="Shading intensity"
          value={shadingIntensity}
          onChange={setShadingIntensity}
        />
      </div>
    </div>
  )
}
