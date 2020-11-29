import p5 from "p5"

import { Polygon } from "./Polygon"

import { dot } from "../../lib/wrappers"

export class Arabesque {
  draw(fabricCanvas: any) {
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

  fillCanvas = (res: number = 100) => (fabricCanvas: any) => {
    const xCount = Math.ceil(fabricCanvas.width / res)
    const yCount = Math.ceil(fabricCanvas.height / res)

    console.log("xCount", xCount)
    console.log("yCount", yCount)

    for (let x = 0; x < fabricCanvas.width; x += res) {
      for (let y = 0; y < fabricCanvas.height; y += res) {
        const polygon = new Polygon(fabricCanvas)
        polygon.addVertex(x - 1, y - 1)
        polygon.addVertex(x + res - 1, y - 1)
        polygon.addVertex(x + res - 1, y + res - 1)
        polygon.addVertex(x - 1, y - 1 + res)
        polygon.close()
        // polygon.show()
        polygon.showHankins(10, 70)
      }
    }
  }
}
