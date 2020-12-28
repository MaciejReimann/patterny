import p5 from "p5"
import { makeLine } from "../../lib/fabric-wrappers"

export class Hankin {
  b: p5.Vector
  end: p5.Vector | null = null
  private prev_dist = 0

  constructor(
    readonly a: p5.Vector,
    readonly v: p5.Vector,
    readonly canvas: any
  ) {
    this.a = a
    this.v = v
    this.b = p5.Vector.add(a, v)
    this.canvas = canvas
  }

  show() {
    try {
      const line =
        this.end && makeLine([this.a.x, this.a.y, this.end.x, this.end.y])
      this.canvas.add(line)
    } catch (e) {
      throw new Error(
        "Hankin cannot be shown before its end is assigned a value"
      )
    }
  }

  findEnd(hankin: Hankin) {
    const denominator = hankin.v.y * this.v.x - hankin.v.x * this.v.y

    const numerator_a =
      hankin.v.x * (this.a.y - hankin.a.y) -
      hankin.v.y * (this.a.x - hankin.a.x)
    const numerator_b =
      this.v.x * (this.a.y - hankin.a.y) - this.v.y * (this.a.x - hankin.a.x)

    const u_a = numerator_a / denominator
    const u_b = numerator_b / denominator

    const intersectionPoint_x = this.a.x + u_a * this.v.x
    const intersectionPoint_y = this.a.y + u_a * this.v.y

    if (u_a > 0 && u_b > 0) {
      const candidate = new p5.Vector().set(
        intersectionPoint_x,
        intersectionPoint_y
      )
      const dist_1 = p5.Vector.dist(candidate, this.a)
      const dist_2 = p5.Vector.dist(candidate, hankin.a)
      const dist = dist_1 + dist_2

      if (!this.end) {
        this.end = candidate
        this.prev_dist = dist
      } else if (dist < this.prev_dist) {
        this.prev_dist = dist
        this.end = candidate
      }
    }
  }
}
