import React from "react"
import styles from "./Input.module.scss"

interface InputProps {
  value: number | string
  onChange: (value: number | string) => void
}

export const Input = (props: InputProps) => {
  const { value, onChange } = props

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            onChange={handleChange}
            value={value}
          />
        </div>
      </div>
    </div>
  )
}
