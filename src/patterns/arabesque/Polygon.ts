import p5 from "p5"
import { makeLine } from "../../lib/fabric-wrappers"

import { Edge } from "./Edge"

export class Polygon {
  vertices: p5.Vector[] = []
  edges: Edge[] = []

  constructor(readonly canvas: any) {
    this.canvas = canvas
  }

  addVertex(x: number, y: number): Polygon {
    const vertex = new p5.Vector().set(x, y)
    const verticesCount = this.vertices.length
    if (verticesCount > 0) {
      const prev = this.vertices[verticesCount - 1]
      const edge = new Edge(prev, vertex, this.canvas)
      this.edges.push(edge)
    }
    this.vertices.push(vertex)

    return this
  }

  private createHankins(delta: number, angle?: number) {
    this.edges.forEach((edge, i) => {
      edge.createHankins(delta, angle)
    })

    const edgesCount = this.edges.length
    for (let i = 0; i < edgesCount; i++) {
      for (let j = 0; j < edgesCount; j++) {
        if (i !== j) {
          this.edges[i].findEnds(this.edges[j])
        }
      }
    }
  }

  showHankins(delta: number, angle?: number) {
    this.createHankins(delta, angle)

    this.edges.forEach((edge, i) => {
      edge.showHankins()
    })

    return this
  }

  show() {
    this.edges.forEach((edge) => {
      edge.show()
    })
    return this
  }

  close(): Polygon {
    const verticesCount = this.vertices.length
    const lastVertex = this.vertices[verticesCount - 1]
    const firstVertex = this.vertices[0]
    const edge = new Edge(lastVertex, firstVertex, this.canvas)
    this.edges.push(edge)
    return this
  }
}
