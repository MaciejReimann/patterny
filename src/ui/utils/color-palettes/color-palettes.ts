import chroma from "chroma-js"

export interface ColorPalettesConfig {
  length: number
}

export class ColorPalettes {
  brewer = removeBrewerDuplicates(chroma.brewer)
  length: number

  constructor(readonly config: ColorPalettesConfig) {
    this.length = config.length
  }

  getBrewerPalettes(count?: number) {
    console.log(Object.keys(this.brewer).length)
    return this.brewer
  }
}

function removeBrewerDuplicates(brewer: {
  [k: string]: string[]
}): { [k: string]: string[] } {
  const brewerEntries = Object.entries(brewer)
  return Object.fromEntries(brewerEntries.slice(0, brewerEntries.length / 2))
}
