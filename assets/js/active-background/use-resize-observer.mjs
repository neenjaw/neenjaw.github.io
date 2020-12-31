// import * as React from 'react'
export const useResizeObserver = ({ target, callback }) => {
  const observer = React.useMemo(
    () =>
      new ResizeObserver((resizeObserverEntries, resizeObserver) => {
        callback?.(resizeObserverEntries, resizeObserver)
      }),
    [callback]
  )
  React.useEffect(() => {
    if (observer && target) {
      observer.observe(target)
      return () => {
        observer.disconnect()
      }
    }
  }, [observer, target])
}
