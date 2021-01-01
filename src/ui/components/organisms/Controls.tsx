import React, { useState } from "react"

import { ColorPalette } from "../../utils/color-palettes/color-palettes"
import { Slider } from "../atoms/Slider"
import { Input, InputSize } from "../atoms/Input"
import { Button, ButtonSizes } from "../atoms/Button"
import { ColorPaletteSelect } from "../atoms/ColorPaletteSelect"
import styles from "./Controls.module.scss"

type NumberSetter = (value: number) => void
type StringSetter = (value: string) => void

export type PatternTypeDisplayValue = string // tepm - use an enum

interface PatternParameters {
  width: number
  height: number
  patternTypes?: PatternTypeDisplayValue[]
  patternType?: PatternTypeDisplayValue
  cellSize: number
  geometryVariance: number
  shadingIntensity: number
  colorPalettes: ColorPalette[]
  colorPalette: ColorPalette
}

interface ControlsProps extends PatternParameters {
  setWidth: NumberSetter
  setHeight: NumberSetter
  setPatternType?: StringSetter
  setCellSize: NumberSetter
  setGeometryVariance: NumberSetter
  setShadingIntensity: NumberSetter
  setColorPalette: (value: ColorPalette) => void
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
    colorPalettes,
    colorPalette,
    setWidth,
    setHeight,
    setPatternType,
    setCellSize,
    setGeometryVariance,
    setShadingIntensity,
    setColorPalette,
  } = props

  const selectedPattern = patternType

  console.log("colorPalette", colorPalette)

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
        <label className="label label content is-small">Pattern Types</label>
        <div className={styles["buttons"]}>
          {patternTypes &&
            patternTypes.map((patternType) => (
              <div key={patternType}>
                <Button
                  isClicked={selectedPattern === patternType}
                  label={patternType}
                  onClick={() => setPatternType && setPatternType(patternType)}
                  size={ButtonSizes.Small}
                />
              </div>
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
      <div className={styles["slider"]}>
        <label className="label content is-small">Color palette</label>

        {colorPalettes.map((palette) => (
          <div className={styles["palette"]} key={palette.name}>
            <ColorPaletteSelect
              colors={palette.colors}
              name={palette.name}
              onClick={() => setColorPalette(palette)}
              isSelected={colorPalette.name === palette.name}
              isSquare={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
