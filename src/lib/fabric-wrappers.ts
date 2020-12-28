import { fabric } from "fabric"

export type FabricCanvas = fabric.Canvas

export function makeTriangularPath(
  apices: [fabric.Point, fabric.Point, fabric.Point],
  options: Partial<fabric.Path>
): fabric.Path {
  const path = new fabric.Path(
    `M ${apices[0].x} ${apices[0].y} L ${apices[1].x} ${apices[1].y} L ${apices[2].x} ${apices[2].y} z`
  )

  const fill = typeof options.fill === "string" ? options.fill : undefined

  const defaultOptions = {
    selectable: false,
    stroke: fill,
  }

  path.set({ ...defaultOptions, ...options })

  return path
}

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

export function makeGradient(fabricCanvas: FabricCanvas) {
  // adapted from: https://stackoverflow.com/questions/22029565/background-gradient-in-fabric-js
  // couldn't find a way to will path with gradient
  const grad = new fabric.Gradient({
    type: "linear",
    coords: {
      x1: 0,
      y1: 0,
      x2: fabricCanvas.width,
      y2: fabricCanvas.height,
    },
    colorStops: [
      {
        color: "rgb(166,111,213)",
        offset: "0",
      },
      {
        color: "rgba(106, 72, 215, 0.5)",
        offset: "0.5",
      },
      {
        color: "#200772",
        offset: "1",
      },
    ], // refactor this once implementing gradients in the app
  })
  //@ts-ignore; TODO: investigate what the problem is
  fabricCanvas.backgroundColor = grad.toLive(fabricCanvas.contextContainer)
  fabricCanvas.renderAll()
}
