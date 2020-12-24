import React from "react"
import styles from "./Canvas.module.scss"

interface CanvasProps {
  width?: number
  height?: number
}

export const Canvas = (props: CanvasProps) => {
  const { width = 500, height = 500 } = props

  return <canvas className={styles.canvas} width={width} height={height} />
}
