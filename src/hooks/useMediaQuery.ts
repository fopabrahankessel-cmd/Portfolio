import { useCallback, useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query and re-renders when it changes. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** True when the visitor asked their device for reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** True for a mouse or trackpad, false for touch screens. */
export function usePointerFine(): boolean {
  return useMediaQuery('(pointer: fine)')
}

/** Pointer-driven effects run only with a fine pointer and motion allowed. */
export function usePointerEffects(): boolean {
  const fine = usePointerFine()
  const reduced = usePrefersReducedMotion()
  return fine && !reduced
}
