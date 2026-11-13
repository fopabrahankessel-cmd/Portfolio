import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Id placed on the title so the section can reference it. */
  id: string
  eyebrow: string
  title: string
  /** Section number shown beside the eyebrow, e.g. "02". */
  index?: string
}

export function SectionHeading({ id, eyebrow, title, index }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-3xl lg:mb-16">
      <p className="text-saffron mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.22em] uppercase">
        <span aria-hidden="true" className="bg-ember inline-block size-2 rotate-45" />
        {index ? <span className="text-faint">{index}</span> : null}
        <span>{eyebrow}</span>
        <span
          aria-hidden="true"
          className="border-line h-px w-16 border-t border-dashed sm:w-24"
        />
      </p>
      <h2
        id={id}
        className="font-display text-cloth text-3xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
    </Reveal>
  )
}
