import { fabric } from "fabric"

import { makeTriangularPolygon } from "../../lib/fabric-wrappers"
import { GridCell, CartesianGrid } from "../common/cartesian-grid"

export type PolygonTuple = [fabric.Polygon, fabric.Polygon]

export function applyGeometryVariance(grid: CartesianGrid): CartesianGrid {
  const copiedGrid = clone(grid)
  // implementation goes here
  return copiedGrid
}

export function distributeOnGrid(grid: CartesianGrid): CartesianGrid {
  const copiedGrid = clone(grid)
  // implementation goes here
  return copiedGrid
}

export function getCellsWithRandomisedGridNodes(
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

export function makeTriangularPathsToClosestNodes(
  cell: GridCell
): PolygonTuple | null {
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

/**
 * @function
 * @description Deep clone a class instance.
 * @param {object} instance The class instance you want to clone.
 * @returns {object} A new cloned instance.
 */
function clone(instance: Object) {
  return Object.assign(
    Object.create(
      // Set the prototype of the new object to the prototype of the instance.
      // Used to allow new object behave like class instance.
      Object.getPrototypeOf(instance)
    ),
    // Prevent shallow copies of nested structures like arrays, etc
    JSON.parse(JSON.stringify(instance))
  )
}
