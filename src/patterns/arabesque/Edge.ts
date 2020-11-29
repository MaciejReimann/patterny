import p5 from "p5"
import { makeLine } from "../../lib/wrappers"

import { Hankin } from "./Hankin"

export class Edge {
  line: fabric.Line
  hankin1!: null | Hankin
  hankin2!: null | Hankin

  constructor(
    readonly startPoint: p5.Vector,
    readonly endPoint: p5.Vector,
    readonly canvas: any
  ) {
    this.canvas = canvas
    this.startPoint = new p5.Vector().set(this.startPoint.x, this.startPoint.y)
    this.endPoint = new p5.Vector().set(this.endPoint.x, this.endPoint.y)
    this.line = this.makeLine()
  }

  show() {
    this.canvas.add(this.line)
  }

  createHankins(angle?: number) {
    const rotation = angle || 60
    const middlePoint = p5.Vector.add(this.startPoint, this.endPoint)
    middlePoint.mult(0.5)

    const v1 = p5.Vector.sub(this.startPoint, middlePoint)
    const v2 = p5.Vector.sub(this.endPoint, middlePoint)
    v1.rotate(radians(-rotation))
    v2.rotate(radians(rotation))

    this.hankin1 = new Hankin(middlePoint, v1, this.canvas)
    this.hankin2 = new Hankin(middlePoint, v2, this.canvas)
  }

  findEnds(edge: Edge) {
    this.hankin1 && edge.hankin1 && this.hankin1.findEnd(edge.hankin1)
    this.hankin1 && edge.hankin2 && this.hankin1.findEnd(edge.hankin2)
    this.hankin2 && edge.hankin1 && this.hankin2.findEnd(edge.hankin1)
    this.hankin2 && edge.hankin2 && this.hankin2.findEnd(edge.hankin2)
  }

  showHankins() {
    this.hankin1?.show()
    this.hankin2?.show()
  }

  private makeLine() {
    return makeLine([
      this.startPoint.x,
      this.startPoint.y,
      this.endPoint.x,
      this.endPoint.y,
    ])
  }
}
const radians = (angle: number) => (angle * Math.PI) / 180
