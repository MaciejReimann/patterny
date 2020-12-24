import React from "react"
import styles from "./Slider.module.scss"

interface SliderProps {
  value: number
  onChange: (value: number) => void
  minValue?: number
  maxValue?: number
}

export const Slider = (props: SliderProps) => {
  const { value, onChange, minValue = 0, maxValue = 100 } = props

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(Number(e.currentTarget.value))
  }

  return (
    <div className={styles.wrapper}>
      <input
        className="slider is-fullwidth"
        step="1"
        min={minValue}
        max={maxValue}
        value={value}
        type="range"
        onChange={handleChange}
      ></input>
      <output htmlFor="sliderWithValue">{value}</output>
    </div>
  )
}
