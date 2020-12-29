import React from "react"

import styles from "./ColorPaletteSelect.module.scss"

enum ColorCellSize {
  Medium = "medium",
}

interface ColorPaletteProps {
  colors: string[]
  name?: string
  isSelected?: boolean
  onClick?: () => void
  colorCellSize?: ColorCellSize
  isSquare?: boolean
}

export const ColorPaletteSelect = (props: ColorPaletteProps) => {
  const {
    colors,
    name,
    isSelected,
    onClick,
    colorCellSize = ColorCellSize.Medium,
    isSquare = true,
  } = props

  const handleClick = () => {
    onClick && onClick()
  }
  return (
    <div
      className={isSelected ? styles["wrapper--selected"] : styles["wrapper"]}
      onClick={handleClick}
      key={name}
    >
      {colors.map((color) => {
        return (
          <div
            className={
              styles[isSquare ? "color-cell--square" : "color-cell--flexible"]
            }
            style={{ backgroundColor: `${color}` }}
            key={color}
          ></div>
        )
      })}
      {/* <span>{name}</span> */}
    </div>
  )
}
