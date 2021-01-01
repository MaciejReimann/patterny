import { PatternConfig } from "../common/pattern"
import { FabricCanvas } from "../../lib/fabric-wrappers"

const MAX_GRID_WIDTH = 60
const MAX_GRID_HEIGHT = 60
const MIN_CELL_SIZE = 50

export class TrianglePatternConfig {
  //number of square cells the canvas is divided horizontally into
  gridWidth: number = MAX_GRID_WIDTH
  // number of square cells the canvas is divided vertically into
  gridHeight: number = MAX_GRID_HEIGHT
  // length of the square cell in pixels
  cellSize: number = MIN_CELL_SIZE
  // distance of visible pattern nodes to grid nodes
  // where 0 is no deviation (regular frid), and 100 is distance equal to cellSize
  distanceFromGridNodes: number = 0
  zoom: number = 1

  set(patternConfig: PatternConfig, fabricCanvas: any) {
    this.cellSize = getMinimumDensity(patternConfig.density) // temp
    this.distanceFromGridNodes = getDeviation(patternConfig) / 2
    this.gridWidth = fabricCanvas.width / this.cellSize
    this.gridHeight = fabricCanvas.height / this.cellSize
    this.zoom = getZoom(patternConfig.density)
  }
}

function getDeviation(patternConfig: PatternConfig) {
  const { deviation, density } = patternConfig
  if (deviation <= 0) return 0
  if (deviation >= density) return density
  return deviation
}

const getMinimumDensity = (density: number) => density * 1

// dens = 0 -> zoom === minZoom
// dens = 100 -> zoom === maxZoom
function getZoom(density: number) {
  const MIN_ZOOM = 0.2
  const MAX_ZOOM = (MAX_GRID_WIDTH / MIN_CELL_SIZE) * 5
  const MAX_DENSITY = 100

  const zoomRange = MAX_ZOOM - MIN_ZOOM
  return density * (zoomRange / MAX_DENSITY) + MIN_ZOOM
}
