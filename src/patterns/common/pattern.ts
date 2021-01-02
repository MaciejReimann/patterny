import { FabricCanvas } from "../../lib/fabric-wrappers"
import {
  TrianglePattern,
  TrianglePatternConfig,
} from "../triangle/triangle-pattern"
import { ColorPalette } from "../../ui/utils/color-palettes/color-palettes"
export interface PatternType {
  config: TrianglePatternConfig
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
  colorPalette: ColorPalette
}

export class PatternFacade {
  type: PatternType
  /**
   * We may need acces to fabricCanvas to methods shared by all patterns
   * like serialization (for exporting into file) or other provided by Fabric canvas API
   */
  fabricCanvas: FabricCanvas

  constructor(fabricCanvas: FabricCanvas, patternName: PatternName) {
    this.type = PatternFactory(patternName, fabricCanvas)
    this.fabricCanvas = fabricCanvas
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
