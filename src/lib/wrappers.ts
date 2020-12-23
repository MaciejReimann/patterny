import { fabric } from "fabric"

export function makeRect() {
  return new fabric.Rect({
    width: 10,
    height: 20,
    left: 100,
    top: 100,
    fill: "yellow",
    angle: 30,
  })
}

export function makeLine(coords: number[]) {
  return new fabric.Line(coords, {
    fill: "red",
    stroke: "red",
    strokeWidth: 1,
    selectable: false,
    evented: false,
  })
}

export function dot(x: number, y: number) {
  return new fabric.Circle({
    left: x,
    top: y,
    radius: 2,
    fill: "#039BE5",
  })
}
