import React, { useState } from "react"

import { Canvas } from "./ui/components/atoms/Canvas" // this will be in import from organisms DisplayPane (export button + modal)
import { Controls } from "./ui/components/organisms/Controls"
import { Layout } from "./ui/components/layouts/Layout"

import "./App.scss"

export function App() {
  const [sliderValue, setSliderValue] = useState<number>(50)
  const [width, setWidth] = useState<number>(1240)
  const [height, setHeight] = useState<number>(620)

  const onSliderChange = (value: any) => {
    setSliderValue(value)
  }

  const onWidthChange = (value: any) => {
    //
  }

  const onHeightChange = (value: any) => {
    //
  }

  return (
    <Layout
      aside={
        <Controls
          sliderValue={sliderValue}
          onSliderChange={onSliderChange}
          width={width}
          onWidthChange={onWidthChange}
          height={height}
          onHeightChange={onHeightChange}
        />
      }
      main={<Canvas />}
    />
  )
}
