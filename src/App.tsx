import React from "react"
// import logo from './logo.svg';
// import './App.css';
import { ColorPalette } from "./ui/components/atoms/ColorPalette"
import { ColorPalettes } from "./ui/utils/color-palettes/color-palettes"

export function App() {
  const colorPalettes = new ColorPalettes({ length: 9 })
  const brewerPalettes = Object.entries(colorPalettes.getBrewerPalettes())
  // const colors =  [0,1,2,3,4].map(c => brewerPalettes(c)).map(c => c.rgb))

  return (
    <div className="App">
      ""
      {brewerPalettes.map((palette) => (
        <ColorPalette colors={palette[1]} name={palette[0]} />
      ))}
      ""
    </div>
  )
}
