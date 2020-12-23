import p5 from "p5"
import { fabric } from "fabric"
import { makeLine } from "../../lib/wrappers"
import { RectangularGrid, GridCell } from "../common/Grid"

export class Triangle {
  fillCanvas = (cellSize: number = 100) => (fabricCanvas: any) => {
    const gridWidth = fabricCanvas.width / cellSize
    const gridHeight = fabricCanvas.height / cellSize

    const horizontalLines: any = []

    const grid = new RectangularGrid(
      (x: number, y: number) => new fabric.Point(x, y),
      gridWidth,
      gridHeight
    )
    const cells = grid.getCells()

    cells.forEach((cell) => {
      const horizontalLine = createLineToRight(cell, cellSize)

      if (horizontalLine) {
        horizontalLines.push(horizontalLine)
      }
    })

    horizontalLines.forEach((line: any) => {
      fabricCanvas.add(line)
    })

    // console.log("horizontalLines", horizontalLines)
  }
}

const createLineToRight = <GenericCellElement>(
  cell: GridCell<GenericCellElement>,
  cellSize: number
) => {
  const cellOnRight = cell.getRight()

  if (cellOnRight === null) return null

  return makeLine(
    [cell.x, cell.y, cellOnRight.x, cellOnRight.y].map((v) => v * cellSize)
  )
}
