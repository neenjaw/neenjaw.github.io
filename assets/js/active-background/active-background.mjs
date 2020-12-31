import { useResizeObserver } from './use-resize-observer.mjs'
import { Confetti } from './confetti.mjs'
import { ZoomCircle } from './zoom-circle.mjs'

export const ActiveBackground = ({ type = 'confetti', className } = {}) => {
  const [canvasRef, setRef] = React.useState(null)
  const onRefSet = React.useCallback((ref) => setRef(ref), [setRef])
  const [update, setUpdate] = React.useState({})
  const updateCanvasSizeAndPosition = React.useCallback(() => {
    if (!canvasRef) {
      return
    }

    canvasRef.style.height = `${canvasRef.parentElement?.parentElement?.offsetHeight}px`
    canvasRef.style.width = `${canvasRef.parentElement?.parentElement?.offsetWidth}px`
    canvasRef.style.top = `${canvasRef.parentElement?.parentElement?.offsetTop}px`
    canvasRef.style.left = `${canvasRef.parentElement?.parentElement?.offsetLeft}px`
    canvasRef.height =
      canvasRef.parentElement?.parentElement?.offsetHeight ??
      0 * window.devicePixelRatio
    canvasRef.width =
      canvasRef.parentElement?.parentElement?.offsetWidth ??
      0 * window.devicePixelRatio
    setUpdate({})
  }, [canvasRef, setUpdate]) // Set canvas to size and position of parent element

  React.useEffect(updateCanvasSizeAndPosition, [updateCanvasSizeAndPosition])
  useResizeObserver({
    target: canvasRef?.parentElement?.parentElement,
    callback: updateCanvasSizeAndPosition,
  })
  React.useEffect(() => {
    if (!canvasRef) {
      return
    }

    let background = null

    switch (type) {
      case 'confetti':
        background = new Confetti(canvasRef, {
          confettiPaperCount: 100,
          scaleConfettiCount: true,
        })
        break

      case 'zoom-circle':
        background = new ZoomCircle(canvasRef)
        break

      default:
        throw new Error(`unknown active background ${type}`)
    }

    if (background) {
      background.start()
    }

    return () => {
      if (background) {
        background.stop()
      }
    }
  }, [canvasRef, type, update])
  const selfClassName = 'active-background-canvas'
  className = className ? `${className} ${selfClassName}` : selfClassName
  return /*#__PURE__*/ React.createElement('canvas', {
    className: className,
    ref: onRefSet,
  })
}
