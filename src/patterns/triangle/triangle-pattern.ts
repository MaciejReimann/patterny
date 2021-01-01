import { fabric } from "fabric"
import { FabricCanvas, makeTriangularPath } from "../../lib/fabric-wrappers"
import { CartesianGrid, GridCell } from "../common/cartesian-grid"
import { PatternConfig, PatternType } from "../common/pattern"

export type TrianglePatternConfig = {
  //number of square cells the canvas is divided horizontally into
  gridWidth: number
  // number of square cells the canvas is divided vertically into
  gridHeight: number
  // length of the square cell in pixels
  cellSize: number
  // distance of visible pattern nodes to grid nodes
  // where 0 is no deviation (regular frid), and 100 is distance equal to cellSize
  distanceFromGridNodes: number
  zoom: number
}

export class TrianglePattern {
  fabricCanvas: FabricCanvas
  config: TrianglePatternConfig
  triangles: ([fabric.Path, fabric.Path] | null)[]

  constructor(fabricCanvas: FabricCanvas) {
    this.fabricCanvas = fabricCanvas
    this.config = getDefaultTrianglePatternConfig()
    this.triangles = this.getTriangles().filter((cell) => cell !== null)

    this.triangles.forEach((triangle) => {
      // console.log(triangle)
      triangle && fabricCanvas.add(...triangle)
    })
  }

  // setConfig(config: PatternConfig): void {
  //   this.config = adaptTrianglePatternConfig(config, this.fabricCanvas)
  //   console.log("TrianglePattern.setConfig()", this.config)
  // }

  draw(fabricCanvas: FabricCanvas, config: PatternConfig) {
    this.config = adaptTrianglePatternConfig(config, this.fabricCanvas)
    const zoom = this.config.zoom
    fabricCanvas.setZoom(zoom)
  }

  private getTriangles() {
    const {
      cellSize,
      distanceFromGridNodes,
      gridWidth,
      gridHeight,
    } = this.config

    const cartesianGrid = new CartesianGrid(cellSize, gridWidth, gridHeight)
    const gridCells = cartesianGrid.getCells()

    const randomisedCells = getCellsWithRandomisedGridNodes(
      gridCells,
      distanceFromGridNodes
    )
    return randomisedCells.map((cell) =>
      makeTriangularPathsToClosestNodes(cell)
    )
  }
}

function getDeviation(patternConfig: PatternConfig) {
  const { deviation, density } = patternConfig
  if (deviation <= 0) return 0
  if (deviation >= density) return density
  return deviation
}

const MAX_CANVAS_WIDTH = 60
const MAX_CANVAS_HEIGHT = 60

const MIN_CELL_SIZE = 50

function getDefaultTrianglePatternConfig(): TrianglePatternConfig {
  const cellSize = MIN_CELL_SIZE
  const gridWidth = MAX_CANVAS_WIDTH
  const gridHeight = MAX_CANVAS_HEIGHT
  const distanceFromGridNodes = 0
  const zoom = 1

  return { cellSize, gridWidth, gridHeight, distanceFromGridNodes, zoom }
}

const getMinimumDensity = (density: number) => density * 1

function adaptTrianglePatternConfig(
  patternConfig: PatternConfig,
  fabricCanvas: any
): TrianglePatternConfig {
  const cellSize = getMinimumDensity(patternConfig.density) // temp
  const distanceFromGridNodes = getDeviation(patternConfig)
  const gridWidth = fabricCanvas.width / cellSize
  const gridHeight = fabricCanvas.height / cellSize
  const zoom = getZoom(patternConfig.density)

  return { cellSize, gridWidth, gridHeight, distanceFromGridNodes, zoom }
}

const MAX_DENSITY = 100

const MIN_ZOOM = 0.2
const MAX_ZOOM = (MAX_CANVAS_WIDTH / MIN_CELL_SIZE) * 5

// dens = 0 -> zoom === minZoom
// dens = 100 -> zoom === maxZoom
function getZoom(density: number) {
  console.log("getZoom density", density)
  const zoomRange = MAX_ZOOM - MIN_ZOOM
  return density * (zoomRange / MAX_DENSITY) + MIN_ZOOM
}

function getCellsWithRandomisedGridNodes(
  gridCells: GridCell[],
  randomness: number
): GridCell[] {
  return gridCells.map((cell) => {
    const randomNumberX = getRandomNumber({ noHigherThan: randomness })
    const randomNumberY = getRandomNumber({ noHigherThan: randomness })

    const isOnHorizontalEdge = !cell.getRight() || !cell.getLeft()
    const isOnVerticalEdge = !cell.getTop() || !cell.getBottom()
    const isCornerCell = isOnHorizontalEdge && isOnVerticalEdge

    if (isCornerCell) return cell
    if (isOnHorizontalEdge) {
      cell.node = cell.node.add(new fabric.Point(0, randomNumberY))
    } else if (isOnVerticalEdge) {
      cell.node = cell.node.add(new fabric.Point(randomNumberX, 0))
    } else {
      cell.node = cell.node.add(new fabric.Point(randomNumberX, randomNumberY))
    }
    return cell
  })
}

function makeTriangularPathsToClosestNodes(
  cell: GridCell
): [fabric.Path, fabric.Path] | null {
  const cellToRight = cell.getRight()
  const cellToBottom = cell.getBottom()

  if (cellToBottom === null || cellToRight === null) return null

  const cellToBottomRight = cellToBottom.getRight()
  if (cellToBottomRight === null) return null

  const apexA = cell.node
  const apexB = cellToRight.node
  const apexC = cellToBottomRight.node
  const apexD = cellToBottom.node

  const topRightPath = makeTriangularPath([apexA, apexB, apexC], {
    fill: "red",
  })
  const bottomLeftPath = makeTriangularPath([apexA, apexC, apexD], {
    fill: "green",
  })

  return [topRightPath, bottomLeftPath]
}

type RandomNumberConfig = {
  noHigherThan: number
}

function getRandomNumber({ noHigherThan }: RandomNumberConfig) {
  return Math.floor(Math.random() * noHigherThan)
}
