import p5 from "p5"

import { Edge } from "./Edge"
import { Polygon } from "./Polygon"

import { dot } from "../../lib/wrappers"

export class Arabesque {
  draw(fabricCanvas: any) {
    const draw = add(fabricCanvas)
    console.log(fabricCanvas)

    // draw.edge({ x: 250, y: 125 }, { x: 250, y: 175 })

    const polygon = new Polygon(fabricCanvas)
    polygon.addVertex(100, 100)
    polygon.addVertex(200, 100)
    polygon.addVertex(200, 200)
    polygon.addVertex(100, 200)
    polygon.close()
    polygon.show()
    polygon.showHankins(10)

    polygon.edges.forEach((edge) => {
      const point = edge.hankin1?.end
      point && console.log(point)
      point && fabricCanvas.add(dot(point.x, point.y))
    })
  }
}

function add(canvas: any) {
  const edge = (startPoint: p5.Vector, endPoint: p5.Vector) =>
    new Edge(startPoint, endPoint, canvas).show()

  const polygon = () => new Polygon(canvas)

  return {
    edge,
    polygon,
  }
}

function myApp(fabricCanvas: any) {}
