import { PatternConfig } from "../common/pattern"
import { FabricCanvas } from "../../lib/fabric-wrappers"

const MAX_GRID_WIDTH = 60
const MAX_GRID_HEIGHT = 60
const MIN_CELL_SIZE = 80

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

  set(patternConfig: PatternConfig, fabricCanvas: FabricCanvas) {
    this.cellSize = getCellSize(patternConfig)
    this.distanceFromGridNodes = getDistanceFromGridNodes(patternConfig)
    this.zoom = getZoom(patternConfig)

    this.gridWidth = fabricCanvas.getWidth() / this.cellSize
    this.gridHeight = fabricCanvas.getHeight() / this.cellSize
  }
}

function getDistanceFromGridNodes(patternConfig: PatternConfig) {
  return patternConfig.deviation / 2 // TODO: it should not be linear + rename into geometry variance
}

function getCellSize(patternConfig: PatternConfig) {
  return patternConfig.density
}

// dens = 0 -> zoom === minZoom
// dens = 100 -> zoom === maxZoom
function getZoom(patternConfig: PatternConfig) {
  const MIN_ZOOM = 0.2
  const MAX_ZOOM = (MAX_GRID_WIDTH / MIN_CELL_SIZE) * 5
  const MAX_DENSITY = 100

  const zoomRange = MAX_ZOOM - MIN_ZOOM
  return patternConfig.density * (zoomRange / MAX_DENSITY) + MIN_ZOOM
}
