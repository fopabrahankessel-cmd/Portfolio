import { describe, expect, it } from 'vitest'

import en from '@/locales/en/translation.json'

import { projects } from './projects'

describe('projects', () => {
  it('features only SchoolLink', () => {
    expect(projects.filter((p) => p.featured).map((p) => p.id)).toEqual(['schoollink'])
  })

  it('keeps Scolarys private with no repository link', () => {
    const scolarys = projects.find((p) => p.id === 'scolarys')
    expect(scolarys?.isPrivate).toBe(true)
    expect(scolarys?.repoUrl).toBeUndefined()
  })

  it('declares as many decisions as the copy provides', () => {
    for (const project of projects) {
      const copy = en.projects[project.id] as { decisions?: Record<string, unknown> }
      expect(Object.keys(copy.decisions ?? {})).toHaveLength(project.decisionCount)
    }
  })
})
