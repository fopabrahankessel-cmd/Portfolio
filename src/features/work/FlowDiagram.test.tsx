import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import i18n from '@/i18n'
import en from '@/locales/en/translation.json'

import { FlowDiagram } from './FlowDiagram'

describe('FlowDiagram', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('lists the steps as buttons in flow order', () => {
    render(<FlowDiagram />)

    const labels = screen.getAllByRole('button').map((button) => button.textContent)

    const expected = ['phone', 'api', 'db', 'outbox', 'dispatcher', 'guardian'] as const
    expect(labels).toHaveLength(expected.length)
    expected.forEach((id, index) => expect(labels[index]).toContain(en.flow[id].label))
  })

  it('shows the first step and its decision by default', () => {
    render(<FlowDiagram />)

    expect(screen.getByRole('button', { name: /Teacher's phone/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText(en.flow.phone.decision)).toBeInTheDocument()
  })

  it('reveals a step chosen from the keyboard', async () => {
    const user = userEvent.setup()
    render(<FlowDiagram />)

    const outbox = screen.getByRole('button', { name: /^Outbox/ })
    outbox.focus()
    await user.keyboard('{Enter}')

    expect(await screen.findByText(en.flow.outbox.decision)).toBeInTheDocument()
    const pressed = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-pressed') === 'true')
    expect(pressed).toHaveLength(1)
    expect(within(pressed[0]).getByText(en.flow.outbox.label)).toBeInTheDocument()
  })
})
