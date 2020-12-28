import { fabric } from "fabric"

import { FabricCanvas } from "../../lib/fabric-wrappers"
export interface PatternType {
  draw: (patternConfig: PatternConfig, fabricCanvas: FabricCanvas) => void
}

export type PatternConfig = {
  density: number
  deviation: number
  shouldClearOnRender: boolean
}

export class Pattern {
  config: PatternConfig
  pattern: PatternType

  constructor(pattern: PatternType, config: PatternConfig) {
    this.config = config
    this.pattern = pattern
  }

  setDensity = (density: number) => {
    this.config = { ...this.config, density }
  }

  setType = (pattern: PatternType) => {
    this.pattern = pattern
  }

  draw = (fabricCanvas: FabricCanvas) => {
    if (this.config.shouldClearOnRender) this.clearCanvas(fabricCanvas)
    this.pattern.draw(this.config, fabricCanvas)
  }

  private clearCanvas = (fabricCanvas: FabricCanvas) => {
    fabricCanvas.clear()
  }
}
