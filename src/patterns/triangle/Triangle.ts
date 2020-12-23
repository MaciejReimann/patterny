import p5 from "p5"
import { fabric } from "fabric"
import { makeLine } from "../../lib/wrappers"
import { RectangularGrid, GridCell } from "../common/Grid"

export class Triangle {
  fillCanvas = (cellSize: number = 100) => (fabricCanvas: any) => {
    const gridWidth = fabricCanvas.width / cellSize
    const gridHeight = fabricCanvas.height / cellSize

    let lines: any = []
    let apices: any = []

    const grid = new RectangularGrid<fabric.Point>(
      (x: number, y: number) => new fabric.Point(x, y).multiply(cellSize),
      gridWidth,
      gridHeight
    )
    const cells = grid.getCells()
    // const randomisedCells = cells.map((cell) =>
    //   cell.element.add(new fabric.Point(30, 40))
    // )
    cells.forEach((cell) => {
      const randomNumberX = Math.floor(Math.random() * 30)
      const randomNumberY = Math.floor(Math.random() * 30)

      const isOnHorizontalEdge = !cell.getRight() || !cell.getLeft()
      const isOnVerticalEdge = !cell.getTop() || !cell.getBottom()
      const isCornerCell = isOnHorizontalEdge && isOnVerticalEdge

      if (isCornerCell) return
      if (isOnHorizontalEdge) {
        cell.element = cell.element.add(new fabric.Point(0, randomNumberY))
      } else if (isOnVerticalEdge) {
        cell.element = cell.element.add(new fabric.Point(randomNumberX, 0))
      } else {
        cell.element = cell.element.add(
          new fabric.Point(randomNumberX, randomNumberY)
        )
      }
    })

    cells.forEach((cell) => {
      const paths = createLinesToNeighbours(cell, cellSize)
      // const apices = createApices(cell, cellSize)

      console.log("cell", cell)

      if (paths !== null) {
        console.log("paths", paths)
        lines.push(...paths)
      }

      if (apices !== null) {
        // console.log("paths", apices)
        // lines.push(...apices)
      }
    })

    // const scaledGrid = new ScaledGrid(grid, cellSize)
    // console.log("scaledGrid", scaledGrid)

    lines.forEach((line: any) => {
      // console.log("line", line)
      fabricCanvas.add(line)
    })

    console.log("fabricCanvas", fabricCanvas)
  }
}

// function createApices<GenericCellElement>(
//   cell: GridCell<GenericCellElement>,
//   cellSize: number
// ) {
//   const cellToRight = cell.getRight()
//   const cellToBottom = cell.getBottom()

//   if (cellToBottom === null || cellToRight === null) return null
//   const cellToBottomRight = cellToBottom.getRight()

//   if (cellToBottomRight === null) return null

//   const apexA = new fabric.Point(cell.x, cell.y).multiply(cellSize)
//   const apexB = new fabric.Point(cellToRight.x, cellToRight.y).multiply(
//     cellSize
//   )
//   const apexC = new fabric.Point(
//     cellToBottomRight.x,
//     cellToBottomRight.y
//   ).multiply(cellSize)

//   const apexD = new fabric.Point(cellToBottom.x, cellToBottom.y).multiply(
//     cellSize
//   )

//   return [apexA, apexB, apexC, apexD]
// }

function createLinesToNeighbours(
  cell: GridCell<fabric.Point>,
  cellSize: number
) {
  const cellToRight = cell.getRight()
  const cellToBottom = cell.getBottom()

  if (cellToBottom === null || cellToRight === null) return null
  const cellToBottomRight = cellToBottom.getRight()

  if (cellToBottomRight === null) return null

  // console.log(cell.element)

  const apexA = cell.element
  const apexB = cellToRight.element
  const apexC = cellToBottomRight.element
  const apexD = cellToBottom.element

  const topRightPath = new fabric.Path(
    `M ${apexA.x} ${apexA.y} L ${apexB.x} ${apexB.y} L ${apexC.x} ${apexC.y} z`
  )
  const bottomLeftPath = new fabric.Path(
    `M ${apexA.x} ${apexA.y} L ${apexC.x} ${apexC.y} L ${apexD.x} ${apexD.y} z`
  )

  topRightPath.set({
    fill: "red",
    stroke: "green",
    opacity: 0.5,
    selectable: false,
  })

  bottomLeftPath.set({
    fill: "green",
    stroke: "green",
    opacity: 0.5,
    selectable: false,
  })

  return [topRightPath, bottomLeftPath]
}
