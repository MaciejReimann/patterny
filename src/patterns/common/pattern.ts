import { FabricCanvas } from "../../lib/fabric-wrappers"
import {
  TrianglePattern,
  TrianglePatternConfig,
} from "../triangle/triangle-pattern"
export interface PatternType {
  // config: TrianglePatternConfig
  // setConfig: (patternConfig: PatternConfig) => void
  draw: (fabricCanvas: FabricCanvas, config: PatternConfig) => void
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
    // this.config = defaultPatternConfig
    this.type = PatternFactory(patternName, fabricCanvas)
    this.fabricCanvas = fabricCanvas
    console.log("Pattern initialised")
  }

  // setConfig(config: PatternConfig) {
  //   this.config = config
  //   this.type.setConfig(config)
  // }

  draw(config: PatternConfig) {
    // if (config.shouldClearOnRender) this.clearCanvas(this.fabricCanvas)
    this.type.draw(this.fabricCanvas, config)
  }

  private clearCanvas = (fabricCanvas: FabricCanvas) => {
    fabricCanvas.clear()
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

// const defaultPatternConfig = {
//   density: 50,
//   deviation: 50,
//   shouldClearOnRender: true,
// }
