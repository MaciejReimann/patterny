import p5 from "p5"
import { fabric } from "fabric"
import { makeLine } from "../../lib/wrappers"
import { RectangularGrid, GridCell } from "../common/Grid"

export class Triangle {
  fillCanvas = (cellSize: number = 100) => (fabricCanvas: any) => {
    const gridWidth = fabricCanvas.width / cellSize
    const gridHeight = fabricCanvas.height / cellSize

    let lines: any = []

    const grid = new RectangularGrid(
      (x: number, y: number) => new fabric.Point(x, y),
      gridWidth,
      gridHeight
    )
    const cells = grid.getCells()

    cells.forEach((cell) => {
      // console.log(cell)
      lines = [...lines, ...createLinesToNeighbours(cell, cellSize)]
    })

    lines.forEach((line: any) => {
      fabricCanvas.add(line)
    })

    // console.log("lines", lines)
  }
}

function createLinesToNeighbours<GenericCellElement>(
  cell: GridCell<GenericCellElement>,
  cellSize: number
) {
  return [
    createLineToRight(cell, cellSize),
    createLineToBottom(cell, cellSize),
    createLineToBottomRight(cell, cellSize),
  ].filter((line) => line !== null)
}

function createLineToRight<GenericCellElement>(
  cell: GridCell<GenericCellElement>,
  cellSize: number
) {
  const cellToRight = cell.getRight()

  if (cellToRight === null) return null

  return makeLine(
    [cell.x, cell.y, cellToRight.x, cellToRight.y].map((v) => v * cellSize)
  )
}

function createLineToBottom<GenericCellElement>(
  cell: GridCell<GenericCellElement>,
  cellSize: number
) {
  const cellToBottom = cell.getBottom()

  if (cellToBottom === null) return null
  console.log(cellToBottom, cellToBottom)

  return makeLine(
    [cell.x, cell.y, cellToBottom.x, cellToBottom.y].map((v) => v * cellSize)
  )
}

function createLineToBottomRight<GenericCellElement>(
  cell: GridCell<GenericCellElement>,
  cellSize: number
) {
  const cellToBottom = cell.getBottom()

  if (cellToBottom === null) return null

  const cellToBottomRight = cellToBottom.getRight()
  if (cellToBottomRight === null) return null

  return makeLine(
    [cell.x, cell.y, cellToBottomRight.x, cellToBottomRight.y].map(
      (v) => v * cellSize
    )
  )
}
