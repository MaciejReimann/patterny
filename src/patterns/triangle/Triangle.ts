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
      const paths = createLinesToNeighbours(cell, cellSize)

      if (paths !== null) {
        console.log("paths", paths)
        lines.push(...paths)
      }
    })

    lines.forEach((line: any) => {
      // console.log("line", line)
      fabricCanvas.add(line)
    })

    // console.log("lines", lines)
  }
}

function createLinesToNeighbours<GenericCellElement>(
  cell: GridCell<GenericCellElement>,
  cellSize: number
) {
  const cellToRight = cell.getRight()
  const cellToBottom = cell.getBottom()

  if (cellToBottom === null || cellToRight === null) return null
  const cellToBottomRight = cellToBottom.getRight()

  if (cellToBottomRight === null) return null

  console.log(cell.element)

  const apexA = new fabric.Point(cell.x, cell.y).multiply(cellSize)
  const apexB = new fabric.Point(cellToRight.x, cellToRight.y).multiply(
    cellSize
  )
  const apexC = new fabric.Point(
    cellToBottomRight.x,
    cellToBottomRight.y
  ).multiply(cellSize)

  const topRightPath = new fabric.Path(
    `M ${apexA.x} ${apexA.y} L ${apexB.x} ${apexB.y} L ${apexC.x} ${apexC.y} z`
  )
  topRightPath.set({
    fill: "red",
    stroke: "green",
    opacity: 0.5,
    selectable: false,
  })

  return [topRightPath]
}
