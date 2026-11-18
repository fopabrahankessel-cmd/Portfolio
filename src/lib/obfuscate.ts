/**
 * Contact details are shipped reversed and base64-encoded so that bots which
 * grep pages and bundles for e-mail addresses and phone numbers find nothing.
 * Encode a new value with:
 *   node -e "console.log(Buffer.from([...process.argv[1]].reverse().join('')).toString('base64'))" "value"
 */
export function reveal(encoded: string): string {
  return [...atob(encoded)].reverse().join('')
}

export function conceal(value: string): string {
  return btoa([...value].reverse().join(''))
}
