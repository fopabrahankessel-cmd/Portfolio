import { TechIcon } from '@/components/icons/TechIcon'
import { techIcons } from '@/components/icons/techIcons'
import type { TechId } from '@/content/types'

/** A technology shown as its brand icon and name. */
export function Chip({ techId }: { techId: TechId }) {
  return (
    <span className="border-line bg-surface-2/70 text-muted hover:border-saffron/50 hover:text-cloth inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors">
      <TechIcon id={techId} size={14} />
      {techIcons[techId].label}
    </span>
  )
}
