export type TechId =
  | 'java'
  | 'springBoot'
  | 'springSecurity'
  | 'python'
  | 'django'
  | 'postgresql'
  | 'mssql'
  | 'flyway'
  | 'sqlite'
  | 'flutter'
  | 'reactNative'
  | 'react'
  | 'nextjs'
  | 'typescript'
  | 'git'
  | 'github'
  | 'gitlab'
  | 'docker'
  | 'junit'
  | 'testcontainers'
  | 'firebase'

export type ProjectId = 'schoollink' | 'scolarys' | 'aics'

export interface Project {
  id: ProjectId
  /** The flagship project, shown full width with the flow diagram. */
  featured: boolean
  /** Private code: no repository link, a "Private code" badge instead. */
  isPrivate: boolean
  repoUrl?: string
  techIds: TechId[]
  /** Number of `projects.<id>.decisions.<n>` entries in the locale files. */
  decisionCount: number
  /** Optional extra facts available under `projects.<id>.<key>`. */
  facts: ('constraint' | 'status')[]
}

export type FlowNodeId = 'phone' | 'api' | 'db' | 'outbox' | 'dispatcher' | 'guardian'

/** One step of the SchoolLink request flow. Array order is flow order. */
export interface FlowNode {
  id: FlowNodeId
  techId?: TechId
}

export type StackGroupId = 'backend' | 'data' | 'mobile' | 'web' | 'tooling'

export interface StackGroup {
  id: StackGroupId
  items: { techId: TechId; core?: boolean }[]
}

export interface TimelineEntry {
  id: 'internship' | 'degree'
  photo?: 'graduation'
}
