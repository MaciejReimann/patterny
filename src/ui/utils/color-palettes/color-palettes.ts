import chroma from "chroma-js"

export interface ColorPalettesConfig {
  length: number
}

export interface ColorPalette {
  name: string
  colors: string[]
}

export class ColorPalettes {
  brewer = removeBrewerDuplicates(chroma.brewer)
  length: number

  constructor(readonly config: ColorPalettesConfig) {
    this.length = config.length
  }

  getBrewerPalettes(count?: number): ColorPalette[] {
    return Object.entries(this.brewer).map((entry) => ({
      name: entry[0],
      colors: entry[1],
    }))
  }
}

function removeBrewerDuplicates(brewer: {
  [k: string]: string[]
}): { [k: string]: string[] } {
  const brewerEntries = Object.entries(brewer)
  return Object.fromEntries(brewerEntries.slice(0, brewerEntries.length / 2))
}
