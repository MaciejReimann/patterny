import React from "react"

import { useFabric } from "../../hooks/useFabric"
import styles from "./Canvas.module.scss"

interface CanvasConfig {
  width: number
  height: number
}

interface CanvasProps extends CanvasConfig {
  callback: any
}

export const Canvas = (props: CanvasProps) => {
  const { width, height, callback } = props

  const ref = useFabric((fabricCanvas: any) => {
    callback(fabricCanvas)
  })
  return (
    <div className={styles.wrapper}>
      <canvas
        ref={ref}
        width={width}
        height={height}
        className={styles.canvas}
      />
    </div>
  )
}
