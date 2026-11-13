/** Page sections in scroll order. Ids double as anchor targets and nav keys. */
export const sectionIds = ['hero', 'about', 'work', 'stack', 'path', 'contact'] as const

export type SectionId = (typeof sectionIds)[number]

/** Sections that get a link in the navigation bar. */
export const navSections = ['about', 'work', 'stack', 'path', 'contact'] as const satisfies
  readonly SectionId[]
