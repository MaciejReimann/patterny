import { fabric } from "fabric"
import { FabricCanvas, makeTriangularPath } from "../../lib/fabric-wrappers"
import { CartesianGrid, GridCell } from "../common/cartesian-grid"
import { PatternConfig, PatternType } from "../common/pattern"
import { TrianglePatternConfig } from "./triangle-pattern-config"

export type { TrianglePatternConfig }
export class TrianglePattern {
  config: TrianglePatternConfig = new TrianglePatternConfig()
  grid: CartesianGrid = new CartesianGrid(
    this.config.cellSize,
    this.config.gridWidth,
    this.config.gridHeight
  )
  triangles: [fabric.Path, fabric.Path][] = this.getTrianglesForGridCells()

  constructor(public fabricCanvas: FabricCanvas) {}

  setConfig(config: PatternConfig): void {
    this.config.set(config, this.fabricCanvas)
  }

  draw() {
    this.fabricCanvas.setZoom(this.config.zoom)

    console.log("distanceFromGridNodes", this.config.distanceFromGridNodes)

    this.fabricCanvas.clear()

    this.drawTriangles()

    // fabricCanvas.renderAll()
  }

  private drawTriangles() {
    this.triangles = this.getTrianglesForGridCells()

    this.triangles.forEach((triangle) => {
      triangle && this.fabricCanvas.add(...triangle)
    })
  }

  private getTrianglesForGridCells(): [fabric.Path, fabric.Path][] {
    const gridCells = this.grid.getCells()

    const randomisedCells = getCellsWithRandomisedGridNodes(
      gridCells,
      this.config.distanceFromGridNodes
    )
    return randomisedCells
      .map((cell) => makeTriangularPathsToClosestNodes(cell))
      .filter((cell) => cell !== null) as [fabric.Path, fabric.Path][]
  }
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
