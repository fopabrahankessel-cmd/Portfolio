/** A stitched line with three embroidered diamonds, placed between sections. */
export function StitchDivider() {
  return (
    <div aria-hidden="true" className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
      <span className="border-line h-px flex-1 border-t border-dashed" />
      <span className="flex items-center gap-2">
        <span className="bg-ember size-1.5 rotate-45" />
        <span className="border-cloth/70 size-2.5 rotate-45 border" />
        <span className="bg-saffron size-1.5 rotate-45" />
      </span>
      <span className="border-line h-px flex-1 border-t border-dashed" />
    </div>
  )
}
