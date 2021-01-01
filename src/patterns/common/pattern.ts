import { FabricCanvas } from "../../lib/fabric-wrappers"
import {
  TrianglePattern,
  TrianglePatternConfig,
} from "../triangle/triangle-pattern"
export interface PatternType {
  // config: TrianglePatternConfig
  setConfig: (patternConfig: PatternConfig) => void
  draw: () => void
}

export enum PatternName {
  Trangle = "triangle",
}

export type PatternConfig = {
  density: number
  deviation: number
  shouldClearOnRender: boolean
}

export class PatternFacade {
  type: PatternType
  fabricCanvas: FabricCanvas

  constructor(fabricCanvas: FabricCanvas, patternName: PatternName) {
    this.type = PatternFactory(patternName, fabricCanvas)
    this.fabricCanvas = fabricCanvas
    console.log("PatternFacade initialised")
  }

  draw(config: PatternConfig) {
    this.type.setConfig(config)
    this.type.draw()
  }
}

function PatternFactory(
  patternName: PatternName,
  // config: PatternConfig,
  fabricCanvas: FabricCanvas
): PatternType {
  switch (patternName) {
    case PatternName.Trangle:
      return new TrianglePattern(fabricCanvas)
    default:
      throw new Error(`No pattern name defined for ${patternName}`)
  }
}
