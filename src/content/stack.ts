import type { StackGroup } from './types'

export const stackGroups: StackGroup[] = [
  {
    id: 'backend',
    items: [
      { techId: 'java', core: true },
      { techId: 'springBoot', core: true },
      { techId: 'springSecurity' },
      { techId: 'python' },
      { techId: 'django' },
    ],
  },
  {
    id: 'data',
    items: [
      { techId: 'postgresql' },
      { techId: 'mssql' },
      { techId: 'flyway' },
      { techId: 'sqlite' },
    ],
  },
  { id: 'mobile', items: [{ techId: 'flutter' }, { techId: 'reactNative' }] },
  { id: 'web', items: [{ techId: 'react' }, { techId: 'nextjs' }, { techId: 'typescript' }] },
  {
    id: 'tooling',
    items: [
      { techId: 'git' },
      { techId: 'github' },
      { techId: 'gitlab' },
      { techId: 'docker' },
      { techId: 'junit' },
      { techId: 'testcontainers' },
      { techId: 'firebase' },
    ],
  },
]
