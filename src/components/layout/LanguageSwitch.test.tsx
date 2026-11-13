import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import i18n from '@/i18n'

import { LanguageSwitch } from './LanguageSwitch'

describe('LanguageSwitch', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('switches the site to French', async () => {
    render(<LanguageSwitch />)

    await userEvent.click(screen.getByRole('button', { name: 'FR' }))

    expect(i18n.language).toBe('fr')
    expect(document.documentElement.lang).toBe('fr')
    expect(screen.getByRole('button', { name: 'FR' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'false')
  })
})
