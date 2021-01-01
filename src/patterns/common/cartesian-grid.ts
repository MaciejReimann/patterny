import { fabric } from "fabric"

export class CartesianGrid {
  cells: GridCell[][]

  constructor(
    readonly cellSize: number,
    readonly width: number,
    readonly height: number
  ) {
    const grid = make2DArray(width + 1, height + 1)
    this.cells = grid.map((row) =>
      row.map((cell) => new GridCell(this, cellSize, cell[0], cell[1]))
    )
  }

  getCells(): GridCell[] {
    return this.cells.flat()
  }

  getCell(x: number, y: number): GridCell | null {
    const cellX = this.cells[x]
    const cell = cellX ? cellX[y] : null
    return cell ? cell : null
  }
}

type GridCoords = number[][][]

export class GridCell {
  x: number
  y: number
  cellSize: number
  node: fabric.Point

  constructor(
    private grid: CartesianGrid,
    cellSize: number,
    x: number,
    y: number
  ) {
    this.x = x
    this.y = y
    this.cellSize = cellSize
    this.node = this.getNode()
  }

  getNode(): fabric.Point {
    return new fabric.Point(this.x, this.y).multiply(this.cellSize)
  }

  getRight() {
    const cell = this.grid.getCell(this.x + 1, this.y)
    return cell
  }

  getLeft() {
    const cell = this.grid.getCell(this.x - 1, this.y)
    return cell
  }

  getTop() {
    const cell = this.grid.getCell(this.x, this.y - 1)
    return cell
  }

  getBottom() {
    const cell = this.grid.getCell(this.x, this.y + 1)
    return cell
  }
}

function make2DArray(xCount: number, yCount: number): GridCoords {
  let grid: number[][][] = []
  for (let x = 0; x < xCount; x++) {
    let row = []
    for (let y = 0; y < yCount; y++) {
      row.push([x, y])
    }
    grid.push(row)
  }
  return grid
}
