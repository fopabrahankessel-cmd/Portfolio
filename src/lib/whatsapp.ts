/** Builds a wa.me link that opens a chat with a pre-written message. */
export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
