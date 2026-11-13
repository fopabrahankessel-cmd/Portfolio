import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'schoollink',
    featured: true,
    isPrivate: false,
    repoUrl: 'https://github.com/fopabrahankessel-cmd/schoollink',
    techIds: [
      'java',
      'springBoot',
      'springSecurity',
      'postgresql',
      'flyway',
      'firebase',
      'react',
      'typescript',
      'flutter',
      'sqlite',
      'docker',
      'junit',
      'testcontainers',
    ],
    // The flagship's decisions are told by the flow diagram (see flow.ts).
    decisionCount: 0,
    facts: [],
  },
  {
    id: 'scolarys',
    featured: false,
    isPrivate: true,
    techIds: ['java', 'springBoot', 'nextjs', 'mssql', 'reactNative'],
    decisionCount: 4,
    facts: ['constraint', 'status'],
  },
  {
    id: 'aics',
    featured: false,
    isPrivate: false,
    repoUrl: 'https://github.com/fopabrahankessel-cmd/IAI-Defense-report-management-',
    techIds: ['python', 'django', 'postgresql', 'sqlite'],
    decisionCount: 3,
    facts: [],
  },
]
