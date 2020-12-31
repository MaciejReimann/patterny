import { FabricCanvas } from "../../lib/fabric-wrappers"
import { TrianglePattern } from "../triangle/triangle-pattern"
export interface PatternType {
  draw: (patternConfig: PatternConfig, fabricCanvas: FabricCanvas) => void
}

export enum PatternName {
  Trangle = "triangle",
}

export type PatternConfig = {
  density: number
  deviation: number
  shouldClearOnRender: boolean
}

export class Pattern {
  config: PatternConfig
  pattern: PatternType

  constructor(patternName: PatternName, config: PatternConfig) {
    this.config = config
    this.pattern = PatternFactory(patternName)
    console.log("Pattern initialised!")
  }

  setConfig = (config: PatternConfig) => {
    this.config = config
  }

  // TODO: this needs to be implemented differently
  // setType = (pattern: PatternType) => {
  //   this.pattern = pattern
  // }

  draw = (fabricCanvas: FabricCanvas) => {
    if (this.config.shouldClearOnRender) this.clearCanvas(fabricCanvas)
    this.pattern.draw(this.config, fabricCanvas)
  }

  private clearCanvas = (fabricCanvas: FabricCanvas) => {
    fabricCanvas.clear()
  }
}

function PatternFactory(patternName: PatternName): PatternType {
  switch (patternName) {
    case PatternName.Trangle:
      return new TrianglePattern()
    default:
      throw new Error(`No pattern name defined for ${patternName}`)
  }
}
