import type { IconBaseProps } from 'react-icons'

/**
 * Testcontainers mark (the isometric container cube). The icon library has no
 * Testcontainers glyph, so this one is drawn by hand in the same API shape.
 */
export function TestcontainersIcon({ size = '1em', color, title, ...rest }: IconBaseProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color ?? 'currentColor'}
      strokeWidth="1.7"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 2 21 7v10l-9 5-9-5V7Z" />
      <path d="M3 7l9 5 9-5M12 12v10" />
      <path d="M7.5 4.5l9 5M7.5 14.2v3.2" opacity=".65" />
    </svg>
  )
}
