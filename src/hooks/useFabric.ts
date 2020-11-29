// https://stackoverflow.com/a/58894059/12807101

import { useRef, useCallback } from "react"
import { fabric } from "fabric"

export const useFabric = (onChange: any) => {
  const fabricRef: React.MutableRefObject<fabric.Canvas | undefined> = useRef()
  const disposeRef = useRef()

  return useCallback((node) => {
    if (node) {
      fabricRef.current = new fabric.Canvas(node)
      if (onChange) {
        disposeRef.current = onChange(fabricRef.current)
      }
    } else if (fabricRef.current) {
      fabricRef.current.dispose()

      if (disposeRef.current) {
        //@ts-ignore
        disposeRef.current()
        disposeRef.current = undefined
      }
    }
  }, [])
}
