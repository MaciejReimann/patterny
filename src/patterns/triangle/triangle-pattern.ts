import { FabricCanvas } from "../../lib/fabric-wrappers"
import { CartesianGrid } from "../common/cartesian-grid"
import { PatternConfig, PatternType } from "../common/pattern"
import { TrianglePatternConfig } from "./triangle-pattern.config"
import {
  PolygonTuple,
  getCellsWithRandomisedGridNodes,
  makeTriangularPathsToClosestNodes,
} from "./triangle-pattern.helpers"

export type { TrianglePatternConfig }

export class TrianglePattern implements PatternType {
  prevConfigs: PatternConfig[] = []
  config: TrianglePatternConfig = new TrianglePatternConfig()
  grid: CartesianGrid = new CartesianGrid(
    this.config.cellSize,
    this.config.gridWidth,
    this.config.gridHeight
  )
  triangles: PolygonTuple[] = this.getTrianglesForGridCells() // doesnt need to be here
  shouldDrawTriangles: boolean = true // rename into shouldGenerateGeometry

  constructor(public fabricCanvas: FabricCanvas) {}

  setConfig(config: PatternConfig): void {
    this.prevConfigs.push(config)
    this.setShouldDrawTriangles(config)
    this.config.set(config, this.fabricCanvas)
  }

  draw() {
    this.fabricCanvas.setZoom(this.config.zoom) // is it really necessary?

    this.drawTriangles()
  }

  private setShouldDrawTriangles(config: PatternConfig) {
    const prevConfig = this.prevConfigs[this.prevConfigs.length - 2]
    if (!prevConfig) return

    this.shouldDrawTriangles = prevConfig.deviation !== config.deviation
  }

  private drawTriangles() {
    if (this.shouldDrawTriangles) {
      this.fabricCanvas.clear()
      this.triangles = this.getTrianglesForGridCells()
    }

    this.fabricCanvas.add(...this.triangles.flat())
    this.fabricCanvas.renderAll()
  }

  private getTrianglesForGridCells(): PolygonTuple[] {
    return getCellsWithRandomisedGridNodes(
      this.grid.getCells(),
      this.config.distanceFromGridNodes
    )
      .map(makeTriangularPathsToClosestNodes)
      .filter(notEmpty)
  }
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}
