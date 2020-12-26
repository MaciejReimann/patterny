export interface PatternType {
  draw: (patternConfig: PatternConfig, fabricCanvas: any) => void
}

export type PatternConfig = {
  density: number
  deviation: number
}

export class Pattern {
  config: PatternConfig
  pattern: PatternType

  constructor(pattern: PatternType, config: PatternConfig) {
    this.config = config
    this.pattern = pattern
    console.log("dupa")
  }

  setDensity = (density: number) => {
    this.config = { ...this.config, density }
  }

  setType = (pattern: PatternType) => {
    this.pattern = pattern
  }

  draw = (fabricCanvas: any) => {
    console.log("Pattern.draw()")
    this.pattern.draw(this.config, fabricCanvas)
  }
}
