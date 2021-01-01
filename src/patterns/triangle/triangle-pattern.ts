import { fabric } from "fabric"
import { FabricCanvas, makeTriangularPolygon } from "../../lib/fabric-wrappers"
import { CartesianGrid, GridCell } from "../common/cartesian-grid"
import { PatternConfig, PatternType } from "../common/pattern"
import { TrianglePatternConfig } from "./triangle-pattern-config"

export type { TrianglePatternConfig }
export class TrianglePattern {
  prevConfigs: PatternConfig[] = []
  config: TrianglePatternConfig = new TrianglePatternConfig()
  grid: CartesianGrid = new CartesianGrid(
    this.config.cellSize,
    this.config.gridWidth,
    this.config.gridHeight
  )
  triangles: [fabric.Path, fabric.Path][] = this.getTrianglesForGridCells()
  shouldDrawTriangles: boolean = true

  constructor(public fabricCanvas: FabricCanvas) {}

  setConfig(config: PatternConfig): void {
    this.prevConfigs.push(config)
    this.setShouldDrawTriangles(config)
    this.config.set(config, this.fabricCanvas)
  }

  draw() {
    this.fabricCanvas.setZoom(this.config.zoom)

    this.drawTriangles()
  }

  private setShouldDrawTriangles(config: PatternConfig) {
    const prevConfig = this.prevConfigs[this.prevConfigs.length - 2]
    if (!prevConfig) return

    this.shouldDrawTriangles =
      prevConfig && prevConfig.deviation !== config.deviation
  }

  private drawTriangles() {
    if (this.shouldDrawTriangles) {
      this.fabricCanvas.clear()
      this.triangles = this.getTrianglesForGridCells()
    }

    this.triangles.forEach((triangle) => {
      triangle && this.fabricCanvas.add(...triangle)
    })
    this.fabricCanvas.renderAll()
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
    const randomNumber = () => getRandomNumber({ noHigherThan: randomness })

    const isOnHorizontalEdge = !cell.getRight() || !cell.getLeft()
    const isOnVerticalEdge = !cell.getTop() || !cell.getBottom()
    const isCornerCell = isOnHorizontalEdge && isOnVerticalEdge

    const moveNodeOnX = () => {
      cell.node = cell.getNode().add(new fabric.Point(0, randomNumber()))
    }
    const moveNodeOnY = () => {
      cell.node = cell.getNode().add(new fabric.Point(randomNumber(), 0))
    }
    const moveNodeOnXY = () => {
      cell.node = cell
        .getNode()
        .add(new fabric.Point(randomNumber(), randomNumber()))
    }

    if (isCornerCell) return cell
    else if (isOnHorizontalEdge) moveNodeOnX()
    else if (isOnVerticalEdge) moveNodeOnY()
    else moveNodeOnXY()

    return cell
  })
}

function makeTriangularPathsToClosestNodes(
  cell: GridCell
): [fabric.Polygon, fabric.Polygon] | null {
  const cellToRight = cell.getRight()
  const cellToBottom = cell.getBottom()

  if (cellToBottom === null || cellToRight === null) return null

  const cellToBottomRight = cellToBottom.getRight()
  if (cellToBottomRight === null) return null

  const apexA = cell.node
  const apexB = cellToRight.node
  const apexC = cellToBottomRight.node
  const apexD = cellToBottom.node

  const topRightPath = makeTriangularPolygon([apexA, apexB, apexC], {
    fill: "red",
  })
  const bottomLeftPath = makeTriangularPolygon([apexA, apexC, apexD], {
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
