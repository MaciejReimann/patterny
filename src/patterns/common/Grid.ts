type ElementConstructor<GenericCellElement> = (
  x: number,
  y: number
) => GenericCellElement

export class RectangularGrid<GenericCellElement> {
  cells: GridCell<GenericCellElement>[][]

  constructor(
    readonly elementConstructor: ElementConstructor<GenericCellElement>,
    readonly x: number,
    readonly y: number
  ) {
    const grid = make2DArray(x, y)
    this.cells = grid.map((row) =>
      row.map(
        (cell) =>
          new GridCell<GenericCellElement>(
            this,
            elementConstructor,
            cell[0],
            cell[1]
          )
      )
    )
  }

  getCells(): GridCell<GenericCellElement>[] {
    return this.cells.flat()
  }

  getCell(x: number, y: number): GridCell<GenericCellElement> | null {
    try {
      return this.cells[x][y]
    } catch (e) {
      return null
    }
  }
}

type GridCoords = number[][][]

export class GridCell<GenericCellElement> {
  x: number
  y: number
  element: GenericCellElement | null = null

  constructor(
    private grid: RectangularGrid<GenericCellElement>,
    elementConstructor: ElementConstructor<GenericCellElement>,
    x: number,
    y: number
  ) {
    this.x = x
    this.y = y
    this.element = elementConstructor(this.x, this.y)
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
  for (let x = 0; x < xCount + 1; x++) {
    let row = []
    for (let y = 0; y < yCount + 1; y++) {
      row.push([x, y])
    }
    grid.push(row)
  }
  return grid
}
