import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { motion } from 'motion/react'
import { describe, expect, it } from 'vitest'

import { mockMatchMedia, POINTER_FINE, REDUCED_MOTION } from '@/test/matchMedia'

import { useTilt } from './useTilt'

function TiltCard() {
  const { ref, style } = useTilt<HTMLDivElement>()
  return <motion.div ref={ref} style={style} data-testid="card" />
}

function renderCard() {
  render(<TiltCard />)
  const card = screen.getByTestId('card')
  card.getBoundingClientRect = () =>
    ({ left: 0, top: 0, width: 200, height: 200, right: 200, bottom: 200 }) as DOMRect
  return card
}

describe('useTilt', () => {
  it('tilts towards the pointer on a fine pointer', async () => {
    mockMatchMedia([POINTER_FINE])
    const card = renderCard()

    fireEvent.pointerMove(card, { clientX: 190, clientY: 20 })

    await waitFor(() => expect(card.style.transform).toContain('rotate'))
  })

  it('stays flat when the visitor prefers reduced motion', async () => {
    mockMatchMedia([POINTER_FINE, REDUCED_MOTION])
    const card = renderCard()

    fireEvent.pointerMove(card, { clientX: 190, clientY: 20 })
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(card.style.transform).not.toContain('rotate')
  })

  it('stays flat on touch devices', async () => {
    mockMatchMedia([])
    const card = renderCard()

    fireEvent.pointerMove(card, { clientX: 190, clientY: 20 })
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(card.style.transform).not.toContain('rotate')
  })
})
