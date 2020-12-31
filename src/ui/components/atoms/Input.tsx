import React, { useState } from "react"
import styles from "./Input.module.scss"

export enum InputSize {
  Small = "small",
}

interface InputProps {
  value: number | string
  onChange: (value: number) => void
  label?: string
  size?: InputSize
}

export const Input = (props: InputProps) => {
  const { value, onChange, label, size } = props

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(Number(e.currentTarget.value))
  }

  const [isHovered, setIsHovered] = useState<boolean>(false)

  // TODO: make it change style on hover
  const handleHover = (e: React.FormEvent<HTMLInputElement>) => {
    setIsHovered(!isHovered)
  }

  const inputSize = size ? `is-${size}` : ""

  return (
    <div className={styles.wrapper}>
      <div className="field">
        {label && <label className="label content is-small">{label}</label>}
        <div className="control">
          <input
            className={`input ${inputSize} is-info ${
              isHovered ? "is-hovered" : ""
            }`}
            type="text"
            placeholder="Text input"
            onChange={handleChange}
            value={value}
            onMouseOver={handleHover}
            onMouseOut={handleHover}
          />
        </div>
      </div>
    </div>
  )
}
