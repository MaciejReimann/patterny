import React from "react"
import styles from "./Slider.module.scss"

interface SliderProps {
  value: number
  onChange: (value: number) => void
  minValue?: number
  maxValue?: number
  label?: string
}

export const Slider = (props: SliderProps) => {
  const { value, onChange, minValue = 0, maxValue = 100, label } = props

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(Number(e.currentTarget.value))
  }

  return (
    <div className={styles.wrapper}>
      <div className="field">
        {label && <label className="label">{label}</label>}
        <div className="control">
          <input
            id="sliderWithValue"
            className="slider has-output-tooltip is-fullwidth"
            step="1"
            min={minValue}
            max={maxValue}
            value={value}
            type="range"
            onChange={handleChange}
          ></input>
          {/* <output className={styles.output} htmlFor="sliderWithValue">{value}</output> */}
        </div>
      </div>
    </div>
  )
}
