import { FabricCanvas } from "../../lib/fabric-wrappers"
import { TrianglePattern } from "../triangle/triangle-pattern"
export interface PatternType {
  config: PatternConfig
  setConfig: (patternConfig: PatternConfig) => void
  draw: (fabricCanvas: FabricCanvas) => void
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
  type: PatternType

  constructor(patternName: PatternName) {
    this.type = PatternFactory(patternName, defaultPatternConfig)
    console.log("Pattern initialised")
  }

  setConfig(config: PatternConfig) {
    this.type.setConfig(config)
  }

  // TODO: this needs to be implemented differently
  // setType = (pattern: PatternType) => {
  //   this.pattern = pattern
  // }

  draw(fabricCanvas: FabricCanvas) {
    if (this.type.config.shouldClearOnRender) this.clearCanvas(fabricCanvas)
    this.type.draw(fabricCanvas)
  }

  private clearCanvas = (fabricCanvas: FabricCanvas) => {
    fabricCanvas.clear()
  }
}

function PatternFactory(
  patternName: PatternName,
  config: PatternConfig
): PatternType {
  switch (patternName) {
    case PatternName.Trangle:
      return new TrianglePattern(config)
    default:
      throw new Error(`No pattern name defined for ${patternName}`)
  }
}

const defaultPatternConfig = {
  density: 50,
  deviation: 50,
  shouldClearOnRender: true,
}
