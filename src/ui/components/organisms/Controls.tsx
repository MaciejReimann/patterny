import React from "react"

import { Slider } from "../atoms/Slider"
import { Input } from "../atoms/Input"

import styles from "./Controls.module.scss"

interface ControlsProps {
  sliderValue: number
  onSliderChange: (value: number) => void
  width: number
  onWidthChange: (value: number | string) => void
  height: number
  onHeightChange: (value: number | string) => void
}

export const Controls = (props: ControlsProps) => {
  const {
    sliderValue,
    onSliderChange,
    width,
    onWidthChange,
    height,
    onHeightChange,
  } = props

  return (
    <div className={styles.wrapper}>
      <Input value={width} onChange={onWidthChange} />

      <Input value={height} onChange={onHeightChange} />

      <Slider value={sliderValue} onChange={onSliderChange} />
    </div>
  )
}
