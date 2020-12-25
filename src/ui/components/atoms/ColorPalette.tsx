import React from "react"

import styles from "./ColorPalette.module.scss"

enum ColorCellSize {
  Medium = "medium",
}

interface ColorPaletteProps {
  colors: string[]
  name?: string
  colorCellSize?: ColorCellSize
  isSquare?: boolean
}

export const ColorPalette = (props: ColorPaletteProps) => {
  const {
    colors,
    name,
    colorCellSize = ColorCellSize.Medium,
    isSquare = true,
  } = props
  return (
    <div className={styles.wrapper}>
      {colors.map((color) => {
        return (
          <div
            className={styles["color-cell"]}
            style={{ backgroundColor: `${color}` }}
            key={color}
          ></div>
        )
      })}
      <span>{name}</span>
    </div>
  )
}
