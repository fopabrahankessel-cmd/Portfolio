import { useEffect, useState } from 'react'

/**
 * Returns the id of the section crossing the middle of the viewport.
 *
 * Sections are looked up by id on every measurement rather than observed once,
 * because lazily loaded sections replace their placeholder elements.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const middle = window.innerHeight / 2
      let current = ids[0] ?? ''
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= middle) current = id
      }
      setActive(current)
    }

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}
