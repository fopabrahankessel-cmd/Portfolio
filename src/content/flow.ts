import type { FlowNode } from './types'

/** SchoolLink: how an absence travels from a phone in class to a guardian. */
export const flowNodes: FlowNode[] = [
  { id: 'phone', techId: 'flutter' },
  { id: 'api', techId: 'springBoot' },
  { id: 'db', techId: 'postgresql' },
  { id: 'outbox', techId: 'java' },
  { id: 'dispatcher', techId: 'firebase' },
  { id: 'guardian' },
]
