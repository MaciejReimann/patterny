import { fabric } from "fabric"
import { FabricCanvas, makeTriangularPath } from "../../lib/fabric-wrappers"
import { CartesianGrid, GridCell } from "../common/cartesian-grid"
import { PatternConfig, PatternType } from "../common/pattern"

type TrianglePatternConfig = {
  gridWidth: number
  gridHeight: number
  cellSize: number
  deviation: number // where 0 is no deviation (regular frid, and 100 is cellSize)
}

export class TrianglePattern implements PatternType {
  config: PatternConfig

  constructor(config: PatternConfig) {
    this.config = config
  }

  setConfig(config: PatternConfig): void {
    this.config = config
  }

  draw(fabricCanvas: FabricCanvas) {
    const {
      cellSize,
      deviation,
      gridWidth,
      gridHeight,
    } = adaptTrianglePatternConfig(this.config, fabricCanvas)

    const cartesianGrid = new CartesianGrid(cellSize, gridWidth, gridHeight)
    const gridCells = cartesianGrid.getCells()
    const randomisedCells = getCellsWithRandomisedGridNodes(
      gridCells,
      deviation
    )

    randomisedCells.forEach((cell) => {
      const triangles = makeTriangularPathsToClosestNodes(cell)
      triangles && fabricCanvas.add(...triangles)
    })
  }
}

function getDeviation(patternConfig: PatternConfig) {
  const { deviation, density } = patternConfig
  if (deviation <= 0) return 0
  if (deviation >= density) return density
  return deviation
}

function adaptTrianglePatternConfig(
  patternConfig: PatternConfig,
  fabricCanvas: any
): TrianglePatternConfig {
  const cellSize = patternConfig.density // temp
  const deviation = getDeviation(patternConfig)
  const gridWidth = fabricCanvas.width / cellSize
  const gridHeight = fabricCanvas.height / cellSize

  return { cellSize, gridWidth, gridHeight, deviation }
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
