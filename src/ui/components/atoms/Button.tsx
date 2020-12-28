import React from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
  label: string
  isClicked: boolean
  onClick: () => void
  size?: ButtonSizes
}

export enum ButtonSizes {
  Small = "small",
}

export const Button = (props: ButtonProps) => {
  const { label, isClicked, onClick, size } = props

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    onClick()
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={`button is-${size} is-outlined is-info ${
          isClicked && "is-active"
        } ${isClicked && "is-focused"}`}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  )
}
