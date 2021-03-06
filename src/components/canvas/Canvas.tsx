import React, { useEffect, useRef } from "react"
import { fabric } from "fabric"

import styles from "./Canvas.module.scss"

interface CanvasConfig {
  width: number
  height: number
}

interface CanvasProps extends CanvasConfig {
  setCanvas: (canvas: fabric.Canvas) => void
}

// adapted example from
// https://binarapps.com/integrate-fabric-js-canvas-drawing-library-with-react-app-via-uncontrolled-component/
export const Canvas = (props: CanvasProps) => {
  const { width, height, setCanvas } = props
  const canvasRef = useRef(null)

  useEffect(() => {
    setCanvas(
      new fabric.Canvas(canvasRef.current, {
        renderOnAddRemove: false,
      })
    )
  }, [setCanvas])

  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.canvas}
      />
    </div>
  )
}
