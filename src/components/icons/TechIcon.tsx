import type { TechId } from '@/content/types'

import { techIcons } from './techIcons'

interface TechIconProps {
  id: TechId
  size?: number
  className?: string
  /** Paint the icon in its brand colour instead of the current text colour. */
  branded?: boolean
}

export function TechIcon({ id, size = 18, className, branded = true }: TechIconProps) {
  const { Icon, color } = techIcons[id]
  return (
    <Icon
      size={size}
      className={className}
      color={branded ? color : undefined}
      aria-hidden="true"
    />
  )
}
